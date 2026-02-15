param(
    [string]$RepoRoot = (Get-Location).Path,
    [string]$AgentsFile = "",
    [switch]$ForceAgents,
    [switch]$NoStatus
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Python = Get-Command python -ErrorAction SilentlyContinue
if (-not $Python) {
    $Python = Get-Command python3 -ErrorAction Stop
}

$argsList = @("$ScriptDir/conductor_tools.py", "codex-init", "--repo-root", $RepoRoot)
if ($AgentsFile) {
    $argsList += @("--agents-file", $AgentsFile)
}
if ($ForceAgents) {
    $argsList += "--force-agents"
}
if ($NoStatus) {
    $argsList += "--no-status"
}

& $Python.Source @argsList
exit $LASTEXITCODE
