@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js
) else (
  start "" "%~dp0DarTool_HR_App.html"
)
