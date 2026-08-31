# One-time database bootstrap: create the database, then load the resume content.
# Set DATABASE_URL in backend\.env before running.
Set-Location "$PSScriptRoot\backend"
& ".\.venv\Scripts\python.exe" -m app.create_db
if ($LASTEXITCODE -ne 0) { Write-Host "Fix DATABASE_URL in backend\.env, then re-run." -ForegroundColor Yellow; exit 1 }
& ".\.venv\Scripts\python.exe" -m app.seed
