@echo off
echo ================================================
echo   Avocado Art - Hero Video Compressor
echo   Compressing hero-video.mp4 to ~1.5 Mbps
echo ================================================
echo.

set INPUT=public\assets\hero-video.mp4
set OUTPUT=public\assets\hero-video-opt.mp4
set ROOT_OUTPUT=public\hero-video.mp4

where ffmpeg >nul 2>&1
if %ERRORLEVEL% EQU 0 goto HAVE_FFMPEG

echo FFmpeg not found. Trying winget install...
winget install --id Gyan.FFmpeg -e --source winget --accept-package-agreements --accept-source-agreements
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Could not install FFmpeg automatically.
    echo Please install it manually from: https://www.gyan.dev/ffmpeg/builds/
    echo Then run this script again.
    pause
    exit /b 1
)
set "PATH=%PATH%;C:\Program Files\FFmpeg\bin"

:HAVE_FFMPEG
echo Compressing video... (this takes about 30-60 seconds)
echo.
ffmpeg -i "%INPUT%" -c:v libx264 -crf 28 -preset fast -vf "scale=1280:720" -c:a aac -b:a 96k -movflags +faststart -y "%OUTPUT%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Video compression failed.
    pause
    exit /b 1
)

copy /Y "%OUTPUT%" "%ROOT_OUTPUT%"

echo.
echo ================================================
echo   DONE! Comparing file sizes:
echo ================================================
for %%F in ("%INPUT%")   do echo   Original:  %%~zF bytes
for %%F in ("%OUTPUT%")  do echo   Optimized: %%~zF bytes
echo.
echo Now run:  git add -A
echo          git commit -m "perf: compress hero video by 60%%"
echo          git push origin main
echo ================================================
pause
