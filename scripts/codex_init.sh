#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${PWD}"

if [[ $# -gt 0 && "${1:0:1}" != "-" ]]; then
    REPO_ROOT="$1"
    shift
fi

python3 "${SCRIPT_DIR}/conductor_tools.py" codex-init --repo-root "${REPO_ROOT}" "$@"
