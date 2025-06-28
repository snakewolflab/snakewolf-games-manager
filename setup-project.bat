@echo off
setlocal

echo.
echo === 必要なフォルダとファイルの作成中 ===

:: 既存のsrcフォルダがあることを前提とします

:: src/components フォルダ内に Header.js と Footer.js を作成
mkdir src\components >nul 2>&1
type nul > src\components\Header.js
type nul > src\components\Footer.js

:: src/pages フォルダ内に各ページファイルを作成
mkdir src\pages >nul 2>&1
type nul > src\pages\Home.js
type nul > src\pages\Login.js
type nul > src\pages\Register.js
type nul > src\pages\GameDetail.js
type nul > src\pages\Search.js
type nul > src\pages\Settings.js
type nul > src\pages\DeveloperPortal.js
type nul > src\pages\GoogleAnalyticsPortal.js
type nul > src\pages\AdminPortal.js

:: Electron化時に追加するページ用ファイル
type nul > src\pages\Library.js
type nul > src\pages\DownloadStatus.js
type nul > src\pages\Checkout.js
type nul > src\pages\Update.js
type nul > src\pages\ServiceMonitor.js
type nul > src\pages\GameError.js

:: src/styles フォルダ内に GlobalStyles.js を作成
mkdir src\styles >nul 2>&1
type nul > src\styles\GlobalStyles.js

:: src 直下の App.js と index.js はcreate-react-appで既に存在するため、
:: ここでは明示的に作成せず、既存のファイルをそのまま使用します。

echo.
echo ======================================================
echo 必要なフォルダと空のページファイルが作成されました。
echo これらのファイルにコンテンツを追加して開発を進めてください。
echo ======================================================

endlocal
pause