@echo off
rem 遅延環境変数展開を有効化（ループや分岐内での変数更新に必要）
setlocal enabledelayedexpansion
chcp 65001 > nul

rem --- カレントディレクトリをプロジェクトルート（親ディレクトリ）に変更 ---
cd /d "%~dp0.."

set OUTPUT=generate-ai\PROJECT_ALL_IN_ONE.md

echo # PROJECT ALL IN ONE CONTEXT > %OUTPUT%

rem --- 1. ドキュメント類 (そのまま結合) ---
call :append_file README.md
call :append_file docs\01_system-architecture.md
call :append_file docs\02_requirements.md
call :append_file docs\03_screen-specification.md
call :append_file docs\04_api-specification.md
call :append_file docs\05_database-design.md

rem --- 2. 共通型定義 (コードブロック化) ---
call :append_file shared\types.ts

rem --- 3. バックエンドコード・DB (コードブロック化) ---
call :append_file backend\prisma\schema.prisma
call :append_file backend\src\index.ts

rem --- 4. フロントエンドコード (コードブロック化) ---
call :append_file frontend\src\App.tsx
call :append_file frontend\src\hooks\useUsers.ts
call :append_file frontend\src\components\UserForm.tsx
call :append_file frontend\src\components\UserList.tsx
call :append_file frontend\src\components\Toast.tsx

rem --- 5. インフラ設定 (コードブロック化) ---
call :append_file docker-compose.yml

echo.
echo ====================================================
echo 結合が完了しました: %OUTPUT%
echo Gemの「知識 (Knowledge)」にこのファイルをアップロードしてください。
echo ====================================================
pause
exit /b

:append_file
set "FILE_PATH=%~1"
set "EXT=%~x1"
set "LANG="

if exist "%FILE_PATH%" (
    echo 結合中: %FILE_PATH%
    echo. >> "%OUTPUT%"
    echo # File: %FILE_PATH% >> "%OUTPUT%"
    echo. >> "%OUTPUT%"

    if /I "!EXT!"==".md" (
        rem Markdownファイルはそのまま出力（ネスト崩れ防止）
        type "%FILE_PATH%" >> "%OUTPUT%"
    ) else (
        rem 拡張子から言語を判定
        if /I "!EXT!"==".ts" set "LANG=typescript"
        if /I "!EXT!"==".tsx" set "LANG=tsx"
        if /I "!EXT!"==".prisma" set "LANG=prisma"
        if /I "!EXT!"==".yml" set "LANG=yaml"
        if /I "!EXT!"==".json" set "LANG=json"

        rem コードブロック開始
        echo ```!LANG! >> "%OUTPUT%"
        type "%FILE_PATH%" >> "%OUTPUT%"
        echo. >> "%OUTPUT%"
        rem コードブロック終了
        echo ``` >> "%OUTPUT%"
    )
    echo. >> "%OUTPUT%"
) else (
    echo 警告: %FILE_PATH% が見つかりませんでした。
)
exit /b