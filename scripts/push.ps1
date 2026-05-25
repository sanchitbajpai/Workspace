param(
    [string]$RemoteURL = 'https://github.com/sanchitbajpai/Workspace.git',
    [string]$Branch = 'main',
    [switch]$Force
)

Set-StrictMode -Version Latest
Push-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Path -Parent) | Out-Null
Pop-Location | Out-Null

Write-Host "Working in: $(Get-Location)"

if (-not (Test-Path .git)) {
    git init
    Write-Host "Initialized empty git repository"
}

# Stage all files
git add .

# Create commit if there are staged changes
$status = git status --porcelain
if ($status) {
    git commit -m "Initial commit"
    Write-Host "Created commit"
} else {
    Write-Host "No changes to commit"
}

# Replace origin remote if present
if (git remote get-url origin 2>$null) {
    git remote remove origin
}
git remote add origin $RemoteURL
Write-Host "Set remote origin to $RemoteURL"

if ($Force) {
    git push -u origin $Branch --force
} else {
    git push -u origin $Branch
}

Write-Host "Done"