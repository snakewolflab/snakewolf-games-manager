@echo off
setlocal

echo.
echo === �K�v�ȃt�H���_�ƃt�@�C���̍쐬�� ===

:: ������src�t�H���_�����邱�Ƃ�O��Ƃ��܂�

:: src/components �t�H���_���� Header.js �� Footer.js ���쐬
mkdir src\components >nul 2>&1
type nul > src\components\Header.js
type nul > src\components\Footer.js

:: src/pages �t�H���_���Ɋe�y�[�W�t�@�C�����쐬
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

:: Electron�����ɒǉ�����y�[�W�p�t�@�C��
type nul > src\pages\Library.js
type nul > src\pages\DownloadStatus.js
type nul > src\pages\Checkout.js
type nul > src\pages\Update.js
type nul > src\pages\ServiceMonitor.js
type nul > src\pages\GameError.js

:: src/styles �t�H���_���� GlobalStyles.js ���쐬
mkdir src\styles >nul 2>&1
type nul > src\styles\GlobalStyles.js

:: src ������ App.js �� index.js ��create-react-app�Ŋ��ɑ��݂��邽�߁A
:: �����ł͖����I�ɍ쐬�����A�����̃t�@�C�������̂܂܎g�p���܂��B

echo.
echo ======================================================
echo �K�v�ȃt�H���_�Ƌ�̃y�[�W�t�@�C�����쐬����܂����B
echo �����̃t�@�C���ɃR���e���c��ǉ����ĊJ����i�߂Ă��������B
echo ======================================================

endlocal
pause