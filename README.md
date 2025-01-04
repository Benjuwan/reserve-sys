## Reserve-Sys
[reserve-sys-sqlite](https://github.com/Benjuwan/reserve-sys-sqlite)リポジトリの派生ver（`prisma`×`postgreSQL(vercel)`）<br><br>
任意の部屋数を用意するとともに、各部屋ごとの予約を視覚的に把握及び管理・編集できる「会議室予約システムUI」です。<br>`prisma`×`postgreSQL(vercel)`で予約内容を管理しています。<br>

- `src/app/types/rooms-atom.ts`<br>
部屋数と予約可能時間の設定ファイル。変更・修正するたびにビルドすること（※残っている予約データに注意）

## Vercel Postgres 関連情報
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Postgres Pricing](https://vercel.com/docs/storage/vercel-postgres/usage-and-pricing)

### Vercel / prisma
1. `Vercel`に当該`GitHub`リポジトリをリンク（デプロイ）
2. `Vercel`ダッシュボード内の[`Storage`]でデータベースを作成
3. `prisma`の設定を行う
 - Prismaのインストール（※インストールしていない場合）
 ```
 npm install prisma @prisma/client
 npm install @prisma/client
 ```
 - Prismaの初期化
 ```
 npx prisma init
 ```
 - マイグレーションフォルダの生成
 ```
 npx prisma migrate dev --name init
 ```
 - クライアントの生成
 ```
 npx prisma generate
 ```
4. `.env`, `.env.local`の設定（詳細は[備考](#備考)）をはじめ、`Vercel`での環境変数の設定も行う

## 技術構成
- @prisma/client@6.1.0
- @types/node@20.16.11
- @types/react-dom@19.0.2 overridden
- @types/react@19.0.1 overridden
- @types/uuid@10.0.0
- eslint-config-next@15.1.1
- eslint@8.57.1
- jotai@2.10.0
- next@15.1.1
- prisma@6.1.0
- react-dom@19.0.0
- react@19.0.0
- typescript@5.6.2
- uuid@10.0.0

## 備考
- `src\app\components\schedule\calendar\Calendar.tsx`
当日以前の過去予約分は上記コンポーネント内の`deleteReservation`メソッドで削除

- `.env`
`.env`は`npx prisma studio`の起動に必要なので用意すること<br>`DATABASE_URL`は[`vercel`ダッシュボード]-[当該プロジェクト名]-[Storage]ページの`Quickstart`欄で確認する
```
DATABASE_URL=postgres://...
```

- `.env.local`
必要な各種環境変数の管理
```
# NEXT_PUBLIC を前置した環境変数は露出するので注意（今回は Route Handler の APIエンドポイントのドメインとして使用）
NEXT_PUBLIC_API_URL="http://localhost:3000/"

# データベース（postgresql）に関わる各種環境変数は[ vercel ダッシュボード]-[当該プロジェクト名]-[Storage]ページの Quickstart 欄で確認
```

- `prisma\schema.prisma`の設定
```
generator client {
  provider = "prisma-client-js" // Prismaクライアントを生成するためのライブラリを指定
}

datasource db {
  provider = "postgresql"           // 使用するDBの種類を指定（vercel postgresql）
  url      = env("DATABASE_URL")    // データベースの参照先URL（.env の DATABASE_URL の値）
}

// データベースの（ Reservation ）テーブル内容とリンクさせるための設定
model Reservation {
  id          String   @id @default(uuid()) // 主キーの指定（UUID）
  todoID      String                        // 日付 (yyyy/mm/d)
  todoContent String                        // 予約内容
  edit        Boolean  @default(false)
  pw          String                        // 編集可否パスワード
  rooms       String                        // 予約会議室名
  startTime   String                        // 開始時間 (hh:mm)
  finishTime  String                        // 終了時間 (hh:mm)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```