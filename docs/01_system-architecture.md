# システム構成書（System Architecture）

本ドキュメントは、本アプリケーションのシステムアーキテクチャ、コンテナ構成、開発環境の設計仕様について定義します。

---

## 1. システム概要

本システムは、TypeScriptを中心にフロントエンド・バックエンド・データベースを一貫して構築したフルスタックWebアプリケーションです。
Dockerコンテナ上でマルチコンテナ環境として動作し、ホスト環境に依存しない再現可能な開発・実行環境を提供します。

---

## 2. アーキテクチャ構成

### 2.1 コンテナ構成図

```text
+-----------------------------------------------------------------------+
| [Host Machine]                                                        |
|                                                                       |
|  Browser (http://localhost:${FRONTEND_PORT})                          |
|    |                                                                  |
|    v                                                                  |
|  +---------------------+        +---------------------+               |
|  | ts-crud-frontend    |        | ts-crud-backend     |               |
|  | (React + Vite)      |        | (Express + Prisma)  |               |
|  | Container           |------->| Container           |               |
|  | Port: 5173          |        | Port: 3000          |               |
|  +---------------------+        +---------------------+               |
|                                            |                          |
|                                            v                          |
|                                 +---------------------+               |
|                                 | ts-crud-db          |               |
|                                 | (PostgreSQL 15)     |               |
|                                 | Container           |               |
|                                 | Port: 5432          |               |
|                                 +---------------------+               |
|                                            |                          |
|                                            v                          |
|                                    [ Named Volume ]                   |
|                                        (pgdata)                       |
+-----------------------------------------------------------------------+
```

### 2.2 サービス詳細

| サービス名 | コンテナ名 | イメージ / ベース環境 | ホスト転送ポート | 役割・概要 |
| --- | --- | --- | --- | --- |
| **db** | `ts-crud-db` | `postgres:15-alpine` | `${POSTGRES_PORT}:5432` | データ永続化を担うリレーショナルデータベース。初回起動時に `init.sql` を実行。 |
| **backend** | `ts-crud-backend` | `./backend` (Dockerfile) | `${BACKEND_PORT}:3000` | REST APIの提供、Prisma Clientを通じたDBアクセスおよびビジネスロジックの実行。 |
| **frontend** | `ts-crud-frontend` | `./frontend` (Dockerfile) | `${FRONTEND_PORT}:5173` | UIの表示およびユーザー操作のハンドリング。Vite開発サーバーにより提供。 |

---

## 3. ディレクトリ・モジュール構造

本プロジェクトでは、フロントエンドとバックエンド間で型定義を共有するため、共有ディレクトリ（`shared`）をマウント・参照する構造を採用しています。

```text
fullstack-ts-lab/
├── backend/                  # バックエンドサービス（Node.js / Express）
│   ├── prisma/               # ORM・DBスキーマ設定
│   └── src/                  # APIロジック実装ソースコード
├── frontend/                 # フロントエンドサービス（React / Vite / Tailwind）
│   └── src/                  # 画面コンポーネント・フック・CSS
├── shared/                   # 共通型定義（TypeScript interfaces/types）
├── db/                       # データベース初期化用スクリプトディレクトリ
├── docs/                     # 設計書・仕様書集約ディレクトリ
└── docker-compose.yml        # コンテナオーケストレーション設定

```

### 3.1 共通型定義（`shared`）の運用方針

* `shared/types.ts` を定義し、フロントエンドおよびバックエンド双方のコンテナへマウントして参照します。
* DTO（Data Transfer Object）やエンティティの型を一元管理することで、API仕様変更時の型不一致を極小化します。

---

## 4. ネットワークおよび環境変数

### 4.1 通信仕様

* コンテナ間の通信は Docker Compose 内の同一ネットワーク上で行われます。
* バックエンドからデータベースへの接続は、サービス名 `db`（ホスト名として解決）を用いて行われます。
* フロントエンドからバックエンドへのAPI通信は、環境変数 `VITE_API_BASE_URL` で指定されたURLをバインドします。

### 4.2 主要環境変数

* `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB`: PostgreSQL接続認証情報
* `DATABASE_URL`: Prismaがデータベースへ接続するための接続文字列 (`postgresql://...`)
* `VITE_API_BASE_URL`: クライアント（ブラウザ）からバックエンドAPIへアクセスするための基底URL