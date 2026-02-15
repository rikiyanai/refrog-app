---
name: conductor-check-updates
description: Sync updated Conductor markdown skill files from a GitHub repo into
  the global ~/.codex skills directory.
---

# Conductor Check Updates

Pull new/changed markdown files from a remote repository:

```bash
python3 scripts/conductor_tools.py check-updates \
  --repo owner/repo \
  --source-path skills \
  --dest ~/.codex/skills/conductor
```

Dry run:

```bash
python3 scripts/conductor_tools.py check-updates \
  --repo owner/repo \
  --source-path skills \
  --dry-run
```
