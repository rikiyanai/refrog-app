#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
BIN_DIR="${1:-${HOME}/.local/bin}"

mkdir -p "${BIN_DIR}"

ln -sf "${REPO_ROOT}/scripts/codex_init.sh" "${BIN_DIR}/codex_init"
ln -sf "${REPO_ROOT}/scripts/conductor_status.sh" "${BIN_DIR}/conductor_status"
ln -sf "${REPO_ROOT}/scripts/conductor_setup.sh" "${BIN_DIR}/conductor_setup"
ln -sf "${REPO_ROOT}/scripts/conductor_check_updates.sh" "${BIN_DIR}/conductor_check_updates"

cat <<EOF
Installed commands in ${BIN_DIR}:
- codex_init
- conductor_status
- conductor_setup
- conductor_check_updates

If needed, add to PATH:
  export PATH="${BIN_DIR}:\$PATH"
EOF
