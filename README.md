## Reserve-Sys
任意の部屋数を用意するとともに、各部屋ごとの予約を視覚的に把握及び管理・編集できる「会議室予約システムUI」です。

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

## prisma × SQLite
`Prisma`の設定フロー<br>各フローの補足説明は[こちら（4. データの永続化をする | 【図解解説】これ1本でGraphQLをマスターできるチュートリアル【React/TypeScript/Prisma】）](https://qiita.com/Sicut_study/items/13c9f51c1f9683225e2e#4-%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%82%92%E3%81%99%E3%82%8B)が詳しい。

1. `Prisma`のインストール
```
npm install prisma @prisma/client
npm install @prisma/client
```

2. `Prisma`の初期化
```
npx prisma init
```

3. マイグレーションの実行
```
npx prisma migrate dev --name init
```

4. クライアントの生成
```
npx prisma generate
```

### `.env`と`.env.local`の設定
- `.env`
```
DATABASE_URL="file:./dev.db"
```

- `.env.local`
```
# 本番環境ではホスティング先のURLを指定
NEXT_PUBLIC_API_URL="http://localhost:3000/"
```

### スキーマ設定
- `prisma/schema.prisma`
```
datasource db {
  provider = "sqlite"         // 使用するDBの種類を指定（今回はSQLite）
  url      = "file:./dev.db"  // プロジェクト内の dev.db をデータベースの参照URLとして設定
}

generator client {
  provider = "prisma-client-js" // Prismaクライアントを生成するためのライブラリを指定
}

// データベースのテーブル内容とリンクさせるための設定
model Reservation {
  id          String   @id @default(uuid()) // 主キーの指定（UUIDを自動生成）
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

- `prisma/schema.prisma`
  - データベースのスキーマ定義
  - モデルの定義

### `prisma`設定
- `src/lib/prisma.ts`
  - `Prisma`クライアントのシングルトンインスタンスを管理
  - グローバルな状態での`Prisma`クライアントの再利用を確保

```ts
// `src/lib/prisma.ts`

/* クライアントで prisma を通じてデータベースを操作・利用するための機能をインポート */
import { PrismaClient } from '@prisma/client';

/* グローバルスコープに PrismaClient のインスタンスを保持するための型定義 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/* PrismaClient のインスタンスが存在しない場合は新規作成 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

/**
 * 開発環境の場合のみ、グローバルオブジェクトに PrismaClient インスタンスを保持
 * これにより開発時のホットリロードで複数のインスタンスが作成されることを防ぐ
*/
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### `Route Handler`
- `src/app/api/reservations/route.ts`
  - CRUD操作のためのAPIエンドポイント
  - POST, PUT, DELETEメソッドの実装

### prisma studio
`GUI`でテーブル操作できる機能

- `npx prisma studio`で起動
```
npx prisma studio
```

## 参照
### prisma
- [【Next.js】Prismaを使ってみる](https://www.sddgrp.co.jp/blog/technology/use-next-jsprisma/)
- [Quickstart](https://www.prisma.io/docs/getting-started/quickstart-sqlite)
- [SQLite](https://www.prisma.io/docs/orm/overview/databases/sqlite)
- [【図解解説】これ1本でGraphQLをマスターできるチュートリアル【React/TypeScript/Prisma】](https://qiita.com/Sicut_study/items/13c9f51c1f9683225e2e#4-%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%82%92%E3%81%99%E3%82%8B)

### その他
- `link`で別ファイルを読み込む方法<br>
[Next.jsでheadタグの中にlinkでスタイルシート指定をする方法](https://naopoyo.com/docs/how-to-specify-a-stylesheet-with-a-link-tag-in-the-head-tag-in-next-js)# reserve-sys

- `useState`や`useEffect`を抑えて不要な再レンダリングを防ぐ<br>
[優先度順：Reactの再レンダリング最適化ガイド](https://zenn.dev/any_dev/articles/react-performance-rendering-guide)

- `ESLint`エラー：`Expected an assignment or function call and instead saw an expression`への対処<br>
[ESLint A && B, A || C が no-unused-expressions のエラーになる](https://chaika.hatenablog.com/entry/2024/09/28/083000#google_vignette)
