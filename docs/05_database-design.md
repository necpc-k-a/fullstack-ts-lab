# データベース設計書（Database Design）

本ドキュメントは、本システムで利用するデータベースの構造、テーブル定義、およびORM（Prisma）の設定について定義します。

---

## 1. データベース概要

* **DBMS**: PostgreSQL 15 (Alpine Linux環境)
* **ORM**: Prisma (Prisma Client JS)
* **文字コード**: UTF-8

---

## 2. テーブル一覧

| テーブル物理名 | テーブル論理名 | 概要 |
| :--- | :--- | :--- |
| `users` | ユーザーテーブル | アプリケーションのユーザー情報を保持するテーブル |

---

## 3. テーブル詳細定義

### 3.1 `users` テーブル

* **マッピングモデル**: `User`
* **説明**: アプリケーション内に登録されるユーザー基本情報を管理します。

#### カラム定義

| カラム物理名 | 型 (Prisma) | 型 (PostgreSQL) | PK | FK | Null | 属性 / 制約 / デフォルト値 | 説明 |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `id` | `Int` | `SERIAL` | ◯ | - | No | `@id`, `@default(autoincrement())` | ユーザーID（一意識別子） |
| `name` | `String` | `VARCHAR` / `TEXT` | - | - | No | - | ユーザー氏名 |
| `email` | `String` | `VARCHAR` / `TEXT` | - | - | No | `@unique` | メールアドレス（ユニーク制約） |

#### インデックス・制約定義

| 制約種別 | 制約名 / 対象カラム | 設定内容 / 補足 |
| :--- | :--- | :--- |
| **主キー (PK)** | `PRIMARY KEY (id)` | `id` カラムによる一意識別 |
| **一意性制約 (UNIQUE)** | `UNIQUE (email)` | 重複したメールアドレスの登録を禁止 |

---

## 4. Prisma スキーマ定義 (`schema.prisma`)

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique

  @@map("users")
}

```

---

## 5. 初期データ・マイグレーション仕様

* **初期化スクリプト**: `./db/init.sql`
* データベースコンテナの初回ビルド時（`pgdata` ボリューム非存在時）に `/docker-entrypoint-initdb.d/init.sql` として自動実行されます。
