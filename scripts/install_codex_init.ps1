param(
    [string]$BinDir = "$HOME\bin"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir

New-Item -ItemType Directory -Path $BinDir -Force | Out-Null

$shimMap = @{
    "codex_init.cmd" = "@echo off`r`npowershell -NoProfile -ExecutionPolicy Bypass -File `"$RepoRoot\scripts\codex_init.ps1`" %*`r`n"
    "conductor_status.cmd" = "@echo off`r`npython `"$RepoRoot\scripts\conductor_tools.py`" status --repo-root %CD% %*`r`n"
    "conductor_setup.cmd" = "@echo off`r`npython `"$RepoRoot\scripts\conductor_tools.py`" setup --repo-root %CD% %*`r`n"
    "conductor_check_updates.cmd" = "@echo off`r`npython `"$RepoRoot\scripts\conductor_tools.py`" check-updates %*`r`n"
}

foreach ($name in $shimMap.Keys) {
    $target = Join-Path $BinDir $name
    Set-Content -Path $target -Value $shimMap[$name] -Encoding Ascii
}

Write-Host "Installed command shims in $BinDir:"
Write-Host "- codex_init.cmd"
Write-Host "- conductor_status.cmd"
Write-Host "- conductor_setup.cmd"
Write-Host "- conductor_check_updates.cmd"
Write-Host ""
Write-Host "Add $BinDir to PATH if needed."
