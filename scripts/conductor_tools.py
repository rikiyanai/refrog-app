#!/usr/bin/env python3
"""Conductor bootstrap and update helpers for Codex workflows."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Dict, List, Tuple
from urllib import error, request

MANAGED_START = "<!-- codex-conductor:start -->"
MANAGED_END = "<!-- codex-conductor:end -->"

GUARDRAIL_BLOCK = f"""{MANAGED_START}
## Conductor Guardrail
Always run `conductor:status` first.

- Command alias: `conductor_status`
- Direct command: `python3 scripts/conductor_tools.py status --auto-setup`
- Behavior: if Conductor is missing, status runs setup and creates the baseline.
{MANAGED_END}
"""


def _conductor_templates() -> Dict[str, str]:
    return {
        ".conductor/README.md": """# Conductor Workspace

This folder stores structured project context for Codex.

Workflow:
1. Run `conductor:status` (or `conductor_status`) at the start of every session.
2. Define/refresh context in `context/PROJECT_CONTEXT.md`.
3. Write specs in `specs/` before code changes.
4. Write implementation plans in `plans/`.
5. Implement and verify.
""",
        ".conductor/context/PROJECT_CONTEXT.md": """# Project Context

## Project
- Name:
- Goal:
- Users:

## Constraints
- Technical:
- Product:
- Operational:

## Stack
- Languages:
- Frameworks:
- Runtime/infra:

## Definition Of Done
- 
""",
        ".conductor/specs/README.md": """# Specs

Create one spec file per change before implementation.

Suggested naming:
- `YYYY-MM-DD-<feature>-spec.md`
""",
        ".conductor/plans/README.md": """# Plans

Create one implementation plan per approved spec.

Suggested naming:
- `YYYY-MM-DD-<feature>-plan.md`
""",
    }


def _required_paths() -> List[str]:
    return [
        ".conductor/context",
        ".conductor/specs",
        ".conductor/plans",
        ".conductor/context/PROJECT_CONTEXT.md",
        ".conductor/specs/README.md",
        ".conductor/plans/README.md",
    ]


def _write_text(path: Path, content: str, force: bool = False) -> bool:
    if path.exists() and not force:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return True


def _load_text(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def _contains_guardrail(text: str) -> bool:
    return "conductor:status" in text


def _pick_agents_file(repo_root: Path, explicit: str | None) -> Path:
    if explicit:
        return repo_root / explicit

    upper = repo_root / "AGENTS.md"
    lower = repo_root / "agents.md"

    if lower.exists():
        return lower
    if upper.exists():
        if _contains_guardrail(_load_text(upper)):
            return upper
        # Preserve existing hand-authored AGENTS.md by default.
        return lower
    return upper


def ensure_agents_guardrail(
    repo_root: Path,
    agents_file: str | None = None,
    force: bool = False,
) -> Tuple[str, Path]:
    target = _pick_agents_file(repo_root, agents_file)
    current = _load_text(target)

    if not current:
        created = (
            "# Agent Entry Point\n\n"
            "Follow this repository rule before doing any task.\n\n"
            f"{GUARDRAIL_BLOCK}"
        )
        _write_text(target, created, force=True)
        return ("created", target)

    if MANAGED_START in current and MANAGED_END in current:
        before, tail = current.split(MANAGED_START, 1)
        _, after = tail.split(MANAGED_END, 1)
        merged = f"{before}{GUARDRAIL_BLOCK}{after.lstrip()}"
        if merged != current or force:
            _write_text(target, merged, force=True)
            return ("updated", target)
        return ("unchanged", target)

    if _contains_guardrail(current) and not force:
        return ("unchanged", target)

    sep = "" if current.endswith("\n") else "\n"
    updated = f"{current}{sep}\n{GUARDRAIL_BLOCK}"
    _write_text(target, updated, force=True)
    return ("updated", target)


def setup_conductor(repo_root: Path, force: bool = False) -> List[Path]:
    created: List[Path] = []
    for rel_path, content in _conductor_templates().items():
        target = repo_root / rel_path
        if _write_text(target, content, force=force):
            created.append(target)
    return created


def _guardrail_present(repo_root: Path) -> bool:
    for candidate in (repo_root / "AGENTS.md", repo_root / "agents.md"):
        if candidate.exists() and _contains_guardrail(_load_text(candidate)):
            return True
    return False


def collect_status(repo_root: Path) -> Tuple[List[Path], bool]:
    missing = []
    for rel_path in _required_paths():
        path = repo_root / rel_path
        if not path.exists():
            missing.append(path)
    return missing, _guardrail_present(repo_root)


def _print_status(repo_root: Path, missing: List[Path], guardrail_ok: bool) -> None:
    print(f"Repo: {repo_root}")
    if missing:
        print("Conductor files: missing")
        for path in missing:
            print(f"  - {path}")
    else:
        print("Conductor files: ready")
    print(f"Guardrail present: {'yes' if guardrail_ok else 'no'}")


def cmd_setup(args: argparse.Namespace) -> int:
    repo_root = Path(args.repo_root).expanduser().resolve()
    created = setup_conductor(repo_root, force=args.force)
    print(f"Setup complete for {repo_root}")
    if created:
        print("Created:")
        for path in created:
            print(f"  - {path}")
    else:
        print("No new files were created.")
    if args.ensure_agents:
        status, target = ensure_agents_guardrail(
            repo_root,
            agents_file=args.agents_file,
            force=args.force_agents,
        )
        print(f"Guardrail {status}: {target}")
    return 0


def cmd_status(args: argparse.Namespace) -> int:
    repo_root = Path(args.repo_root).expanduser().resolve()
    missing, guardrail_ok = collect_status(repo_root)

    if not missing and guardrail_ok:
        _print_status(repo_root, missing, guardrail_ok)
        print("Status: READY")
        return 0

    _print_status(repo_root, missing, guardrail_ok)
    if args.auto_setup:
        print("Status: not ready, running setup...")
        setup_conductor(repo_root, force=False)
        if args.ensure_agents:
            ensure_agents_guardrail(
                repo_root,
                agents_file=args.agents_file,
                force=args.force_agents,
            )
        missing, guardrail_ok = collect_status(repo_root)
        _print_status(repo_root, missing, guardrail_ok)
        if not missing and guardrail_ok:
            print("Status: READY (after setup)")
            return 0
        print("Status: STILL NOT READY")
        return 1

    print("Status: NOT READY")
    return 1


def cmd_codex_init(args: argparse.Namespace) -> int:
    repo_root = Path(args.repo_root).expanduser().resolve()
    status, target = ensure_agents_guardrail(
        repo_root,
        agents_file=args.agents_file,
        force=args.force_agents,
    )
    print(f"Guardrail {status}: {target}")
    if args.no_status:
        return 0
    status_args = argparse.Namespace(
        repo_root=str(repo_root),
        auto_setup=True,
        ensure_agents=True,
        agents_file=args.agents_file,
        force_agents=args.force_agents,
    )
    return cmd_status(status_args)


def _github_json(url: str, token: str | None = None) -> dict:
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "codex-conductor"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = request.Request(url, headers=headers)
    with request.urlopen(req, timeout=30) as resp:  # noqa: S310
        return json.loads(resp.read().decode("utf-8"))


def _github_bytes(url: str, token: str | None = None) -> bytes:
    headers = {"User-Agent": "codex-conductor"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = request.Request(url, headers=headers)
    with request.urlopen(req, timeout=30) as resp:  # noqa: S310
        return resp.read()


def _remote_markdown_files(
    repo: str,
    branch: str,
    source_path: str,
    token: str | None,
) -> Dict[str, Dict[str, str]]:
    tree_url = f"https://api.github.com/repos/{repo}/git/trees/{branch}?recursive=1"
    tree = _github_json(tree_url, token)
    entries = tree.get("tree", [])

    prefix = source_path.strip("/")
    prefix = f"{prefix}/" if prefix else ""

    files: Dict[str, Dict[str, str]] = {}
    for entry in entries:
        if entry.get("type") != "blob":
            continue
        remote_path = entry.get("path", "")
        if prefix and not remote_path.startswith(prefix):
            continue
        if not remote_path.lower().endswith(".md"):
            continue
        rel = remote_path[len(prefix) :] if prefix else remote_path
        rel = rel.lstrip("/")
        files[rel] = {"sha": entry.get("sha", ""), "remote_path": remote_path}
    return files


def _load_state(state_path: Path) -> Dict[str, str]:
    if not state_path.exists():
        return {}
    try:
        data = json.loads(state_path.read_text(encoding="utf-8"))
        files = data.get("files", {})
        if isinstance(files, dict):
            return {str(k): str(v) for k, v in files.items()}
    except json.JSONDecodeError:
        return {}
    return {}


def _save_state(
    state_path: Path,
    repo: str,
    branch: str,
    source_path: str,
    files: Dict[str, Dict[str, str]],
) -> None:
    state_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "repo": repo,
        "branch": branch,
        "source_path": source_path,
        "files": {rel: meta["sha"] for rel, meta in sorted(files.items())},
    }
    state_path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")


def cmd_check_updates(args: argparse.Namespace) -> int:
    repo = args.repo.strip()
    branch = args.branch.strip()
    source_path = args.source_path.strip()
    token = args.token or os.environ.get("GITHUB_TOKEN")
    dest_dir = Path(args.dest).expanduser().resolve()
    state_path = (
        Path(args.state_file).expanduser().resolve()
        if args.state_file
        else (dest_dir / ".conductor_sync_state.json")
    )

    try:
        remote_files = _remote_markdown_files(repo, branch, source_path, token)
    except error.HTTPError as exc:
        print(f"GitHub API error: HTTP {exc.code} for {exc.url}", file=sys.stderr)
        return 1
    except error.URLError as exc:
        print(f"Network error: {exc.reason}", file=sys.stderr)
        return 1

    previous = _load_state(state_path)
    changed = []
    for rel_path, meta in remote_files.items():
        local_file = dest_dir / rel_path
        if previous.get(rel_path) != meta["sha"] or not local_file.exists():
            changed.append(rel_path)
    removed = sorted(set(previous) - set(remote_files))

    print(f"Remote markdown files: {len(remote_files)}")
    print(f"Changed/new files: {len(changed)}")
    print(f"Removed files: {len(removed)}")

    if args.dry_run:
        if changed:
            print("Would download:")
            for rel in changed:
                print(f"  - {rel}")
        if removed:
            print("Would delete:")
            for rel in removed:
                print(f"  - {rel}")
        return 0

    dest_dir.mkdir(parents=True, exist_ok=True)
    for rel in changed:
        remote_path = remote_files[rel]["remote_path"]
        raw_url = f"https://raw.githubusercontent.com/{repo}/{branch}/{remote_path}"
        try:
            body = _github_bytes(raw_url, token)
        except error.HTTPError as exc:
            print(f"Download error: HTTP {exc.code} for {remote_path}", file=sys.stderr)
            return 1
        except error.URLError as exc:
            print(f"Network error: {exc.reason}", file=sys.stderr)
            return 1
        local_path = dest_dir / rel
        local_path.parent.mkdir(parents=True, exist_ok=True)
        local_path.write_bytes(body)
        print(f"Updated: {local_path}")

    for rel in removed:
        local_path = dest_dir / rel
        if local_path.exists():
            local_path.unlink()
            print(f"Deleted: {local_path}")

    _save_state(state_path, repo, branch, source_path, remote_files)
    print(f"Sync state: {state_path}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Conductor bootstrap and update helpers for Codex."
    )
    sub = parser.add_subparsers(dest="command", required=True)

    setup = sub.add_parser("setup", help="Create .conductor baseline files.")
    setup.add_argument("--repo-root", default=".")
    setup.add_argument("--force", action="store_true")
    setup.add_argument("--ensure-agents", action="store_true", default=True)
    setup.add_argument("--agents-file")
    setup.add_argument("--force-agents", action="store_true")
    setup.set_defaults(func=cmd_setup)

    status = sub.add_parser("status", help="Check Conductor status and auto-setup if needed.")
    status.add_argument("--repo-root", default=".")
    status.add_argument("--auto-setup", action="store_true", default=True)
    status.add_argument("--no-auto-setup", dest="auto_setup", action="store_false")
    status.add_argument("--ensure-agents", action="store_true", default=True)
    status.add_argument("--agents-file")
    status.add_argument("--force-agents", action="store_true")
    status.set_defaults(func=cmd_status)

    init = sub.add_parser("codex-init", help="Install Conductor guardrail in agents file.")
    init.add_argument("--repo-root", default=".")
    init.add_argument("--agents-file")
    init.add_argument("--force-agents", action="store_true")
    init.add_argument("--no-status", action="store_true")
    init.set_defaults(func=cmd_codex_init)

    sync = sub.add_parser("check-updates", help="Sync remote Conductor markdown to ~/.codex.")
    sync.add_argument("--repo", required=True, help="GitHub repo in owner/name format.")
    sync.add_argument("--branch", default="main")
    sync.add_argument("--source-path", default="skills")
    sync.add_argument("--dest", default="~/.codex/skills/conductor")
    sync.add_argument("--state-file")
    sync.add_argument("--token", default=os.environ.get("GITHUB_TOKEN", ""))
    sync.add_argument("--dry-run", action="store_true")
    sync.set_defaults(func=cmd_check_updates)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
