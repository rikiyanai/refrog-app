---
name: conductor-status
description: Verify Conductor baseline context/spec/plan files and auto-bootstrap
  missing structure. Use at the start of every session as the guardrail step
  before implementation.
---

# Conductor Status

Run this first in a repository:

```bash
python3 scripts/conductor_tools.py status --auto-setup
```

Equivalent shell alias if installed globally:

```bash
conductor_status
```
