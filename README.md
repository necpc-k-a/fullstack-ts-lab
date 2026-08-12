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
├── docs/                     # 各種設計書・仕様書ドキュメント
│   ├── 01_system-architecture.md  # システム構成書
│   ├── 02_requirements.md         # 要件定義書
│   ├── 03_screen-specification.md # 画面仕様書
│   ├── 04_api-specification.md    # API詳細仕様書
│   └── 05_database-design.md      # データベース設計書
├── frontend/                 # フロントエンド (React / TypeScript / Vite)
│   ├── src/
│   │   ├── components/       # UIコンポーネント
│   │   │   ├── Header.tsx    # ヘッダー表示
│   │   │   ├── Toast.tsx     # 処理結果・エラー通知用トースト表示
│   │   │   ├── UserForm.tsx  # ユーザー追加フォーム
│   │   │   └── UserList.tsx  # ユーザー一覧・編集・削除表示（カード型リスト）
│   │   ├── hooks/            # カスタムフック
│   │   │   └── useUsers.ts   # API通信・CRUD状態管理・トースト通知ロジック
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
├── generate-ai/              # 生成AI連携用ツール・ドキュメント
│   ├── build-context.bat     # プロジェクト全ファイルを1つに結合するバッチ
│   ├── PROJECT_ALL_IN_ONE.md # 自動生成されたAI知識用統合ファイル
│   └── README.md             # AI連携フォルダの概要・運用ガイド
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

## ドキュメント (設計書・仕様書)

詳細な設計情報および仕様については docs/ ディレクトリ内の各ドキュメントを参照してください。

- システム構成書 (docs/01_system-architecture.md): システム構成・コンテナ仕様・動作環境
- 要件定義書 (docs/02_requirements.md): 機能要件・非機能要件
- 画面仕様書 (docs/03_screen-specification.md): UIコンポーネント構成・バリデーション・レスポンシブ仕様
- API詳細仕様書 (docs/04_api-specification.md): RESTful APIエンドポイント・リクエスト/レスポンス仕様
- データベース設計書 (docs/05_database-design.md): テーブル定義・Prismaスキーマ仕様
- AI連携ガイド (generate-ai/README.md): 生成AI（Gemini等）用の文脈統合バッチの利用手順

## 開発時のメモ

- DB初期化: db/init.sql に定義されたスクリプトは、初回コンテナ立ち上げ時（データボリュームが存在しない場合）に自動で実行されます。
- ORM (Prisma): バックエンドのデータ操作は backend/prisma/schema.prisma で定義されたスキーマを基に Prisma Client を介して行われます。
- 共通型定義: shared/types.ts を通じて、APIの入出力データ型をフロントエンド・バックエンド双方で共有しています。
- スタイリング: Tailwind CSS を採用しています。設定の変更は frontend/tailwind.config.js を、カスタムスタイルの定義は frontend/src/index.css を編集します。
- エラーハンドリング & UX: フォーム入力時のリアルタイムバリデーションに加え、追加・更新・削除などの成功時やエラー時には画面固定のトースト通知（成功：暗色/緑、エラー：赤色）を表示し、視認性を向上させています。
- AI連携: generate-ai/build-context.bat を実行することで、プロジェクト内の全設計書・コードを1ファイルに結合し、Gemini等のAIツールに容易に知識登録（Knowledge）できます。