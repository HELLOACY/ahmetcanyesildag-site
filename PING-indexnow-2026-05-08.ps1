# ============================================================
#  INDEXNOW PING - Ahmet Can Yesildag site
#  Generated: 2026-05-08
#
#  WHAT THIS DOES:
#    Sends a single notification to IndexNow telling all
#    participating engines (Bing, Yandex, Seznam, Naver,
#    Microsoft Copilot via Bing) that 12 URLs on your site
#    have new content and should be re-crawled.
#
#  PREREQUISITE:
#    The IndexNow key file must be reachable at
#    https://ahmetcanyesildag.com/acy20260508indexnow8a3f7c9e2b5d6f.txt
#    BEFORE running this script. Verify by opening that URL
#    in a browser - it should display the key text.
#
#  HOW TO RUN:
#    .\PING-indexnow-2026-05-08.ps1
# ============================================================

$keyFileUrl = "https://ahmetcanyesildag.com/acy20260508indexnow8a3f7c9e2b5d6f.txt"

Write-Host ""
Write-Host "==============================================="  -ForegroundColor Cyan
Write-Host "  IndexNow ping - ahmetcanyesildag.com"           -ForegroundColor Cyan
Write-Host "==============================================="  -ForegroundColor Cyan
Write-Host ""

# Pre-flight: confirm the key file is reachable
Write-Host "Pre-flight check: is the IndexNow key file live?" -ForegroundColor DarkGray
try {
    $keyResponse = Invoke-WebRequest -Uri $keyFileUrl -UseBasicParsing -ErrorAction Stop
    if ($keyResponse.Content.Trim() -eq "acy20260508indexnow8a3f7c9e2b5d6f") {
        Write-Host "  OK - key file reachable and content matches." -ForegroundColor Green
    } else {
        Write-Host "  WARNING - key file reachable but content does not match expected key." -ForegroundColor Yellow
        Write-Host "  Got: $($keyResponse.Content.Trim())" -ForegroundColor Yellow
        Write-Host "  Aborting." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  FAIL - key file not reachable yet (likely Netlify still deploying)." -ForegroundColor Red
    Write-Host "  Wait 30-60 seconds and re-run this script." -ForegroundColor Yellow
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor DarkGray
    exit 1
}

Write-Host ""
Write-Host "Sending IndexNow notification..." -ForegroundColor DarkGray

# Build the JSON body
$payload = @{
    host        = "ahmetcanyesildag.com"
    key         = "acy20260508indexnow8a3f7c9e2b5d6f"
    keyLocation = $keyFileUrl
    urlList     = @(
        "https://ahmetcanyesildag.com/",
        "https://ahmetcanyesildag.com/llms.txt",
        "https://ahmetcanyesildag.com/llms-full.txt",
        "https://ahmetcanyesildag.com/manifest.json",
        "https://ahmetcanyesildag.com/sitemap.xml",
        "https://ahmetcanyesildag.com/blog",
        "https://ahmetcanyesildag.com/orophile",
        "https://ahmetcanyesildag.com/books",
        "https://ahmetcanyesildag.com/media",
        "https://ahmetcanyesildag.com/speaking",
        "https://ahmetcanyesildag.com/documents",
        "https://ahmetcanyesildag.com/toolkit"
    )
} | ConvertTo-Json

# Send the POST
try {
    $response = Invoke-WebRequest -Uri "https://api.indexnow.org/indexnow" `
                                  -Method Post `
                                  -Body $payload `
                                  -ContentType "application/json" `
                                  -UseBasicParsing `
                                  -ErrorAction Stop
    Write-Host ""
    Write-Host "  SUCCESS - HTTP $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor Green
    Write-Host "  12 URLs submitted to IndexNow." -ForegroundColor Green
} catch {
    Write-Host ""
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "  FAIL - HTTP $statusCode" -ForegroundColor Red
    }
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "==============================================="  -ForegroundColor Cyan
Write-Host "  Done." -ForegroundColor Green
Write-Host "==============================================="  -ForegroundColor Cyan
Write-Host ""
