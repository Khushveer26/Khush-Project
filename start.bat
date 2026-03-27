@echo off
color 0A
echo ==================================================
echo   🚀 Starting Khushveer's Portfolio Presentation
echo ==================================================
echo.
echo Please ensure XAMPP MySQL is running in the background!
echo.
echo 1. Starting Backend Tunnel (Connecting MySQL to GitHub)...
start "Portfolio Backend Tunnel" cmd /k "cd backend && node expose.js"

echo 2. Opening your site and API validation in 4 seconds...
timeout /t 4 /nobreak > nul

:: Open the tunnel warning page so the user can authorize it
start https://khush-portfolio-api-777.loca.lt/

:: Open the GitHub live page
start https://khushveer26.github.io/Khush-Project/

echo.
echo ✅ ALL SET! 
echo IMPORTANT: When the "loca.lt" page opens, you MUST click the "Click to Continue" button to allow traffic through!
echo After that, your GitHub form will work perfectly!
echo Note: Do not close the black Tunnel window.
echo.
pause
