# TypeScript + React + Express + PostgreSQL CRUD アプリケーション

TypeScriptを中心に、フロントエンド（React）、バックエンド（Express）、データベース（PostgreSQL）で構築されたフルスタックWebアプリケーションです。
Docker環境で動作するため、ホストOS（Windows等）の環境を汚さずに開発・実行が可能です。

## 🛠 技術スタック

* **フロントエンド**: React 18, TypeScript, Vite
* **バックエンド**: Node.js, Express, TypeScript, Express-CORS
* **データベース**: PostgreSQL 15
* **インフラ / 実行環境**: Docker, Docker Compose

## 📁 プロジェクト構成

```text
fullstack-ts-lab/
├── backend/                  # バックエンド (Node.js / Express / TS)
│   ├── src/
│   │   └── index.ts          # エントリーポイント
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── db/                       # データベース設定
│   └── init.sql              # 初期化用SQLスクリプト
├── frontend/                 # フロントエンド (React / TypeScript / Vite)
│   ├── src/
│   │   ├── App.tsx           # ルートコンポーネント
│   │   └── main.tsx          # Reactのレンダリング・エントリーポイント
│   ├── Dockerfile
│   ├── index.html            # アプリケーションのベースHTMLファイル
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts        # Viteの設定ファイル（ビルド・開発サーバー設定など）
├── .env                      # 環境変数ファイル
├── .gitignore
├── docker-compose.yml        # マルチコンテナ設定
└── Readme.md                 # 本ドキュメント
```

## 起動手順

### 前提条件

- Docker Desktop がインストールされていること
- Docker Desktop が起動されていること

#### 1. コンテナの起動

プロジェクトルートで以下のコマンドを実行し、すべてのサービスをビルド・起動します。

```bash
docker-compose up --build

# バックグラウンド起動の場合
docker-compose up -d --build
```

#### 2. アクセス確認

各サービスが起動したら、ブラウザから以下のURLにアクセスします。

**ポート番号は設定したものに変更してください。**

- Frontend (React): http://localhost:8080
- Backend API (Express): http://localhost:8081 (※ Cannot GET / が表示されるが問題なし)

### コンテナ停止

```bash
docker-compose stop
```

### コンテナ削除

```bash
docker-compose down

# DBのボリュームも含めて完全に削除
docker-compose down -v
```

## 開発時のメモ

- DB初期化: db/init.sql に定義されたスクリプトは、初回コンテナ立ち上げ時（データボリュームが存在しない場合）に自動で実行されます。