@echo off
title Deploy site-v21 to GitHub + Netlify
color 0A
echo.
echo ============================================================
echo   DEPLOY SCRIPT — ahmetcanyesildag.com — site-v21
echo   OTTO Pixel + Affiliate Stack + On-Page SEO Pass
echo ============================================================
echo.

:: ── Step 1: Make sure we're in the right folder ──────────────
cd /d "%~dp0"
echo [1/6] Working directory: %CD%
echo.

:: ── Step 2: Remove stale lock file if present ────────────────
echo [2/6] Clearing git lock...
if exist ".git\index.lock" (
    del /f ".git\index.lock"
    echo        Lock removed.
) else (
    echo        No lock found.
)
echo.

:: ── Step 3: Untrack site-v20_6 subfolder ─────────────────────
echo [3/6] Removing nested site-v20_6 from git tracking...
git rm -r --cached site-v20_6/ 2>nul && echo        Untracked. || echo        Already untracked.
echo.

:: ── Step 4: Pull and rebase onto remote ──────────────────────
echo [4/6] Syncing with remote (pull --rebase)...
git pull origin main --rebase
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: git pull failed. Check your internet connection or resolve conflicts.
    pause
    exit /b 1
)
echo.

:: ── Step 5: Stage all site-v21 changes ───────────────────────
echo [5/6] Staging files...
git add .gitignore
git add index.html 404.html blog.html books.html documents.html media.html orophile.html toolkit.html
git add sitemap.xml netlify.toml robots.txt
git add blog\mountain-as-boardroom.html
git add blog\excellence-governed-at-the-top.html
git add blog\cornell-standards-canadian-classroom.html
git add js\affiliate.js
git add AFFILIATE_SETUP.md
git add css\ images\ documents\ linkedin-feed.json
git add google6fed1fd1d905773e.html
git add favicon*.png favicon.ico apple-touch-icon.png Resume.pdf README.md
echo        Done.
echo.

:: ── Step 6: Commit and push ───────────────────────────────────
echo [6/6] Committing and pushing to GitHub...
git status --short
echo.
git commit -m "v21.2: OTTO pixel + affiliate stack + on-page SEO pass (OG descriptions, schema, internal links, sitemap)"
if %ERRORLEVEL% NEQ 0 (
    echo        Nothing new to commit — already up to date.
) else (
    git push origin main
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Push failed. Try: git push origin main --force-with-lease
        pause
        exit /b 1
    )
)

echo.
echo ============================================================
echo   SUCCESS — site-v21 deployed to GitHub
echo   Netlify will auto-build in ~30 seconds.
echo   Live at: https://ahmetcanyesildag.com
echo ============================================================
echo.
pause
