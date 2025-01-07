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
 ```bash
 npm install prisma @prisma/client
 npm install @prisma/client
 ```
 - Prismaの初期化
 ```bash
 npx prisma init
 ```
 - マイグレーションフォルダの生成
 ```bash
 npx prisma migrate dev --name init
 ```
 - クライアントの生成
 ```bash
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
- next@15.1.3
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

### 異なる開発環境（別PC）で作業する場合
前提として`.vercel`フォルダをはじめ、各種環境変数（`.env`, `.env.local`）の設定を行わなければならない。これらの設定を通じて Vercel（を通じて連携しているデータベース`postgresql`）に接続し、開発環境を整えることができる。<br>

1. [`Vercel CLI`](https://vercel.com/docs/cli)をインストール
```bash
npm i -g vercel
```
 - 上記コマンドを権限制限により実行できない（インストール許可がされない）場合は
   - windows<br>
   `vscode`のターミナルではなく`コマンドプロンプト`で実行してみる。それでもできない場合は以下に進む（`vscode`利用）
   - Mac<br>
     1. `vscode`を開いて`com/ctrl + shift + p`で表示される入力項目に`Shell`と打鍵し、`シェルコマンド:PATH内に'code'コマンドをインストールします`を選択。選択後は画面に表示されるフロー通り許可してインストールを進めていく。
     2. 以下のフローを進める
        - グローバルパッケージのインストール先ディレクトリを確認。通常`/usr/local`や`/usr/lib/node_modules`など管理者権限が必要な場所が表示される。
        ```bash
        npm config get prefix
        ```
        - グローバルパッケージのインストール先をユーザーディレクトリに変更。
        ```bash
        mkdir -p ~/.npm-global
        npm config set prefix '~/.npm-global'
        ```
        - 環境設定： `~/.zshrc`や`~/.bashrc`など、使用しているシェルの設定ファイル末尾に`export PATH=~/.npm-global/bin:$PATH`を追加（`nano ~/.zshrc`で当該ファイルを開ける）
        ```
        export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

        ## 以下を追加
        export PATH=~/.npm-global/bin:$PATH
        ```
        - 設定を反映
        ```bash
        source ~/.zshrc  # または ~/.bashrc
        ```
        - 再度インストールを試す
        ```bash
        npm i -g vercel
        ```
     3. Vercel へログイン 
     ```bash
     vercel link
     ```
     ログイン種別を選択後、ターミナルに表示された指示通りに進めてプロジェクトを作成すると`.vercel`フォルダが生成される。用が済んだら以下でログアウトしておく。
     ```bash
     vercel logout
     ```
     4. 環境変数の設定
     データベース接続に必要な環境変数を、 Vercel ダッシュボードで確認し、ローカル環境の`.env`, `.env.local`ファイルに設定。
     5. Vercel（を通じて連携しているデータベース`postgresql`）に接続
     開発初期段階またはプロトタイプの場合は`npx prisma db push`で良いが、既に中身のある**本環境で機能しているデータベースの場合**は`npx prisma migrate dev`でなければならない。その理由が以下。
     - データの整合性と安全性
       - `migrate dev`は、データ損失のリスクを最小限に抑えるように設計されている
       - 変更の影響を事前に確認でき、危険な操作がある場合は警告が表示される
     - 変更の追跡と管理
       - 各変更がSQLファイルとして記録されるため、どのような変更が行われたか常に把握できる
       - 問題が発生した場合、変更履歴を追跡して原因特定が容易
     - チーム開発との整合性
       - 他の開発者も同じマイグレーション履歴に従うことで、環境間の一貫性が保たれる
       - 本番環境とステージング環境で同じ変更を確実に適用できる
     - ロールバックの可能性
       - 問題が発生した場合、以前の状態に戻すことが可能
       - `db push`ではこのような安全性は確保できません
