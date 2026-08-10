# TypeScript + React + Express + PostgreSQL CRUD アプリケーション

TypeScriptを中心に、フロントエンド（React）、バックエンド（Express）、データベース（PostgreSQL）で構築されたフルスタックWebアプリケーションです。
ORMに Prisma を採用し、フロント・バックエンド間で共通の型定義（shared）を共有する構成をとっています。
フロントエンドのスタイリングには Tailwind CSS を採用し、UIデザインの効率化を図っています。
Docker環境で動作するため、ホストOS（Windows等）の環境を汚さずに開発・実行が可能です。

## 🛠 技術スタック

* **フロントエンド**: React 18, TypeScript, Vite, Tailwind CSS, PostCSS, Autoprefixer
* **バックエンド**: Node.js, Express, TypeScript, Express-CORS, Prisma (ORM)
* **データベース**: PostgreSQL 15
* **インフラ / 実行環境**: Docker, Docker Compose

## 📁 プロジェクト構成

```text
fullstack-ts-lab/
├── backend/                  # バックエンド (Node.js / Express / TS)
│   ├── prisma/               # ORM (Prisma) 設定
│   │   └── schema.prisma     # データベーススキーマ定義
│   ├── src/
│   │   └── index.ts          # バックエンドのエントリーポイント (API実装)
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── db/                       # データベース設定
│   └── init.sql              # 初期化用SQLスクリプト
├── frontend/                 # フロントエンド (React / TypeScript / Vite)
│   ├── src/
│   │   ├── components/       # UIコンポーネント
│   │   │   ├── Header.tsx    # ヘッダー表示
│   │   │   ├── UserForm.tsx  # ユーザー追加フォーム
│   │   │   └── UserList.tsx  # ユーザー一覧・削除表示
│   │   ├── hooks/            # カスタムフック
│   │   │   └── useUsers.ts   # API通信・状態管理ロジック
│   │   ├── App.tsx           # ルートコンポーネント (全体のレイアウト配置)
│   │   ├── index.css         # Tailwindディレクティブ定義
│   │   ├── main.tsx          # レンダリングエントリーポイント
│   │   └── vite-env.d.ts     # Vite環境変数型定義
│   ├── Dockerfile
│   ├── index.html            # アプリケーションのベースHTMLファイル
│   ├── package.json
│   ├── postcss.config.js     # PostCSSの設定ファイル (Tailwindプラグイン読み込み)
│   ├── tailwind.config.js    # Tailwind CSSの設定ファイル (パージパス指定など)
│   ├── tsconfig.json
│   └── vite.config.ts        # Viteの設定ファイル（ビルド・開発サーバー設定など）
├── shared/                   # フロント/バックエンド共通型定義
│   └── types.ts              # DTOやエンティティの共通型定義
├── .env                      # 環境変数ファイル
├── .env.example              # 環境変数のサンプル設定
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
# データ保持
docker-compose down

# DBのボリュームも含めて完全に削除
docker-compose down -v
```

## 開発時のメモ

- DB初期化: db/init.sql に定義されたスクリプトは、初回コンテナ立ち上げ時（データボリュームが存在しない場合）に自動で実行されます。
- ORM (Prisma): バックエンドのデータ操作は backend/prisma/schema.prisma で定義されたスキーマを基に Prisma Client を介して行われます。
- 共通型定義: shared/types.ts を通じて、APIの入出力データ型をフロントエンド・バックエンド双方で共有しています。
- スタイリング: Tailwind CSS を採用しています。設定の変更は frontend/tailwind.config.js を、カスタムスタイルの定義は frontend/src/index.css を編集します。