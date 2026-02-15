# Conductor For Codex Setup

This repo includes a Codex-native Conductor bootstrap that enforces:

1. `conductor:status` first
2. Auto-setup if the repo is not initialized
3. Structured context/spec/plan files

## Install Global Commands

### Bash / zsh

```bash
./scripts/install_codex_init.sh
```

### PowerShell / CMD

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install_codex_init.ps1
```

## Initialize A Repository

From the target repo root:

```bash
codex_init
```

This command:
- Adds/updates the Conductor guardrail in `AGENTS.md` or `agents.md`
- Runs `conductor:status`
- Auto-creates `.conductor/` baseline files when missing

## Day-To-Day Workflow

1. Run `conductor_status` (or `python3 scripts/conductor_tools.py status --auto-setup`)
2. Update `.conductor/context/PROJECT_CONTEXT.md`
3. Write spec in `.conductor/specs/`
4. Write implementation plan in `.conductor/plans/`
5. Implement and verify

## Sync Skill Updates From GitHub

```bash
conductor_check_updates --repo owner/repo --source-path skills
```

Dry run:

```bash
conductor_check_updates --repo owner/repo --source-path skills --dry-run
```

By default, files sync into `~/.codex/skills/conductor`.
