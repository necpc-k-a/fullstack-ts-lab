# API詳細仕様書（API Specification）

本ドキュメントは、本システムにおけるバックエンド（Express）とフロントエンド（React）間のRESTful API通信仕様について定義します。

---

## 1. 共通仕様

### 1.1 基本情報
* **ベースURL**: `http://localhost:8081`（環境変数 `VITE_API_BASE_URL` により設定）
* **APIプレフィックス**: `/api`
* **データフォーマット**: JSON (`application/json`)
* **文字コード**: UTF-8

### 1.2 リクエストヘッダー
データ送信（`POST`, `PUT`）時は以下のヘッダーを必須とします。
```http
Content-Type: application/json
```

---

## 2. エンドポイント一覧

| メソッド | エンドポイント | 機能概要 | リクエストボディ | 成功ステータス | レスポンス |
| --- | --- | --- | --- | --- | --- |
| **GET** | `/api/users` | ユーザー一覧の取得 | 不要 | `200 OK` | `User[]`（昇順） |
| **POST** | `/api/users` | 新規ユーザーの追加 | `CreateUserDto` | `201 Created` | `User` |
| **PUT** | `/api/users/:id` | 指定ユーザー情報の更新 | `UpdateUserDto` | `200 OK` | `User` |
| **DELETE** | `/api/users/:id` | 指定ユーザーの削除 | 不要 | `204 No Content` | なし（Empty Body） |

---

## 3. エンドポイント詳細

### 3.1 ユーザー一覧取得 (`GET /api/users`)

登録されているすべてのユーザー情報を `id` の昇順で取得します。

* **リクエストパラメータ**: なし
* **レスポンス (`200 OK`)**:
```json
[
  {
    "id": 1,
    "name": "山田 太郎",
    "email": "yamada@example.com"
  },
  {
    "id": 2,
    "name": "鈴木 花子",
    "email": "suzuki@example.com"
  }
]
```

---

### 3.2 新規ユーザー登録 (`POST /api/users`)

新しいユーザーをシステムに登録します。

* **リクエストボディ (`CreateUserDto`)**:
```json
{
  "name": "佐藤 健",
  "email": "sato@example.com"
}
```
- `name` (string, 必須): ユーザー名
- `email` (string, 必須): メールアドレス（UNIQUE制約）

* **レスポンス (`201 Created`)**:
```json
{
  "id": 3,
  "name": "佐藤 健",
  "email": "sato@example.com"
}
```

---

### 3.3 ユーザー情報更新 (`PUT /api/users/:id`)

指定されたIDのユーザー情報を更新します。

* **パスパラメータ**:
* `id` (integer, 必須): 対象のユーザーID


* **リクエストボディ (`UpdateUserDto`)**:
```json
{
  "name": "佐藤 健一",
  "email": "sato_new@example.com"
}
```

* **レスポンス (`200 OK`)**:
```json
{
  "id": 3,
  "name": "佐藤 健一",
  "email": "sato_new@example.com"
}
```

---

### 3.4 ユーザー削除 (`DELETE /api/users/:id`)

指定されたIDのユーザーを削除します。

* **パスパラメータ**:
* `id` (integer, 必須): 削除対象のユーザーID

* **レスポンス (`204 No Content`)**:
* ボディなし

---

## 4. エラーレスポンス仕様

データベースエラーや内部例外が発生した場合、一律でステータスコード `500` と以下のJSONオブジェクトを返却します。

* **ステータスコード**: `500 Internal Server Error`
* **レスポンスボディ**:
```json
{
  "error": "DB Error"
}
```