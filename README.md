# Workspace — Push helper

Small helpers to initialize a git repo and push this workspace to GitHub.

- PowerShell helper: `scripts/push.ps1`
- Bash helper: `scripts/push.sh`

Usage (PowerShell):

```powershell
cd 'c:\Users\SANCHIT\workspace-app'
.\scripts\push.ps1
# specify remote or force: .\scripts\push.ps1 -RemoteURL 'https://github.com/sanchitbajpai/Workspace.git' -Force
```

Usage (bash):

```bash
cd ~/path/to/workspace-app
./scripts/push.sh
# or: ./scripts/push.sh https://github.com/sanchitbajpai/Workspace.git main
```

Notes:
- The scripts will initialize a git repo if none exists, create an initial commit if needed, add/replace the `origin` remote, and push to `main`.
- For HTTPS pushes you may be prompted for credentials or a personal access token.
- If the remote already has commits and you want to overwrite, use the `-Force` switch (PowerShell) or `--force` argument (bash).