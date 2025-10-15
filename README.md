## Reserve-Sys
[reserve-sys-sqlite](https://github.com/Benjuwan/reserve-sys-sqlite)リポジトリの派生ver（`prisma`×`postgreSQL`）<br><br>
任意の部屋数を用意するとともに、各部屋ごとの予約を視覚的に把握及び管理・編集できる「会議室予約システムUI」です。<br>`prisma`×`postgreSQL(vercel)`で予約内容を管理しています。<br>

- `src/app/types/rooms-atom.ts`<br>
部屋数と予約可能時間の設定ファイル。変更・修正するたびにビルドすること（※残っている予約データに注意）

### 仕様紹介
以下の仕様に関しては[reserve-sys-sqlite](https://github.com/Benjuwan/reserve-sys-sqlite)リポジトリと同様です。<br><br>

- 予約内容の重複禁止<br>他の方が先に予約している場合は受け付けません。
- 予約時間外は受付不可<br>「`timeBlockBegin`時～`timeBlockEnd`時（※）」の時間帯で予約できます。各部屋ごとのタイムテーブルには当日分の予約内容が反映されます。<br>※：`src/app/types/rooms-atom.ts`の`timeBlockBegin`と`timeBlockEnd`から値を取得
- 過去の予約内容は随時削除<br>当日以前の過去予約内容は削除（※）されます。<br>※：`src/components/schedule/calendar/hooks/useRemovePastSchedule.ts`での`deleteReservation`処理にて実行

#### 予約方法
<img width="948" alt="スケジュール欄の日付にあるアイコンをクリック" src="https://github.com/user-attachments/assets/38353bee-9797-4b3d-a228-70ec86d01b84" />

- スケジュール欄の日付にあるアイコンをクリック

---
<img width="916" alt="表示されたフォーム内の所定項目を選択及び入力" src="https://github.com/user-attachments/assets/8401cc6b-8379-4afb-beff-29a13f8857c2" />

- 表示されたフォーム内の所定項目を選択及び入力

---
<img width="817" alt="登録完了" src="https://github.com/user-attachments/assets/50cf9e66-6519-453a-b325-f67e5a7c4e7a" />

- 登録完了

#### 予約内容の変更
<img width="816" alt="スケジュール欄の日付にある編集したいタスクをクリックすると上記画面が表示される" src="https://github.com/user-attachments/assets/fb824b3a-98a1-49f4-bc5c-b3149d2e20b3" />

- スケジュール欄の日付にある**編集したいタスクをクリック**すると上記画面が表示される

---
<img width="802" alt="表示されたフォーム内の所定項目を選択及び入力（編集）" src="https://github.com/user-attachments/assets/b91c0144-22fe-45de-b387-3ab4702c635a" />

- 表示されたフォーム内の所定項目を選択及び入力（編集）

---
<img width="804" alt="06" src="https://github.com/user-attachments/assets/426a007f-560b-4792-a674-fe07986a98c2" />

- 編集完了

---

## 技術構成
- @eslint/eslintrc@3.3.1
- @prisma/client@6.17.1
- @types/node@22.18.10
- @types/react-dom@19.0.2 overridden
- @types/react@19.0.1 overridden
- @types/uuid@10.0.0
- eslint-config-next@15.1.1
- eslint@8.57.1
- jotai@2.15.0
- next@15.5.5
- prisma@6.17.1
- react-dom@19.0.0
- react@19.0.0
- typescript@5.9.3
- uuid@11.1.0

> [!NOTE]
> - `npm audit`で定期的に脆弱性のチェックを行う
> - `npm update`で定期的に（互換性を維持した）更新を行う
>   - `^`（キャレット：「指定されたバージョンからメジャーバージョンを変更しない範囲で最新のバージョンまでを許容」する機能を示す記号）が付いていても油断せず定期的にチェックする<br>例：`"next": "^14.2.12"`の場合、14.2.12以上 15.0.0未満のバージョンが許容される
> - `npm outdated`で表示される`Current`と`Wanted`の内容が等しいのが望ましい
> - 特定ライブラリを最新にするには`npm install ライブラリ名@latest`コマンドを実行する

### Vercel / prisma
1. Vercel に当該`GitHub`リポジトリをリンク（デプロイ）
2. Vercel ダッシュボード内の[`Storage`]でデータベースを作成
3. `prisma`の設定を行う
 - Prismaのインストール（※インストールしていない場合）
 ```bash
 # Prisma のプロジェクトを初めてセットアップするケース
 # CLI ツールとクライアントの両方をインストール
 npm install prisma @prisma/client

 # Prisma クライアントをインストールまたは更新するだけのケース
 # たとえば、本番環境やすでに Prisma CLI をセットアップ済みの場合
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

> [!NOTE]  
> - `prisma`の更新（アップデートコマンド）
> ```bash
> npm i --save-dev prisma@latest
> npm i @prisma/client@latest
> ```

4. `.env`, `.env.local`の設定をはじめ、Vercel での環境変数の設定も行う
- `.env`<br>
`.env`は`npx prisma studio`の実行（`prisma studio`の起動）に必要なので用意する。<br>※`prisma studio`は`GUI`でテーブル操作できる`prisma`の機能の一つ。`GUI`でパパっと手っ取り早くテーブル操作したい場合に便利です。<br><br>

`DATABASE_URL`は[ Vercel ダッシュボード]-[当該プロジェクト名]-[Storage]ページの`Quickstart`欄で確認する
```
DATABASE_URL=postgres://...
```

- `.env.local`<br>
必要な各種環境変数の管理
```
# NEXT_PUBLIC を前置した環境変数は露出するので注意（今回は Route Handlers の APIエンドポイントのドメインとして使用）
NEXT_PUBLIC_API_URL="http://localhost:3000/"

# データベース（postgresql）に関わる各種環境変数は[ Vercel ダッシュボード]-[当該プロジェクト名]-[Storage]ページの Quickstart 欄で確認
```

5. `prisma`クライアントやスキーマの設定
- `prisma`クライアントの設定
  - `src/lib/prisma.ts`
```ts
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

- `prisma\schema.prisma`（スキーマ）の設定
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

### Vercel デプロイ時に`prisma`起因のエラー
- `prisma`起因のエラー<br>
Vercel の「`Node.js`の依存関係をキャッシュ」する働きによって「古い`Prisma Client`が使用されてしまって」デプロイエラーになっていた。（＝`Prisma Client`の自動生成が正しく実行されていなかった）

```
Error [PrismaClientInitializationError]: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process.
```

- 解決策<br>
`build`時に`prisma generate`で`Prisma Client`を新規制作するように変更する

```diff
{
  "scripts": {
    "dev": "next dev",
-   "build": "next build",
+   "build": "prisma generate && next build",
    ...
    ..
    .
  }
}
```

## 異なる開発環境（別PC）で作業する場合
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

        - 環境設定： `~/.zshrc`や`~/.bashrc`など、使用しているシェルの設定ファイル末尾に`export PATH=~/.npm-global/bin:$PATH`を追加。<br>`nano ~/.zshrc`で当該ファイルを開ける
        ```bash
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

     ログイン種別（`GitHub`, `GitLab`, `Bitbucket`, `Email`など）を選択後、ターミナルに表示された指示通りに進めて（データベース連携している）当該プロジェクトを設定すると`.vercel`フォルダが生成される。用が済んだら以下でログアウトしておく。

     ```bash
     vercel logout
     ```

     4. 環境変数の設定<br>
     データベース接続に必要な環境変数を、 Vercel ダッシュボードで確認し、ローカル環境の`.env`, `.env.local`ファイルに設定。
     5. Vercel（を通じて連携しているデータベース`postgresql`）に接続
     6. 以下注釈内容（`npx prisma db push`または`npx prisma migrate dev`）でデータベース（の中身）を反映

> [!NOTE]  
> 開発初期段階またはプロトタイプの場合は`npx prisma db push`で良いが、既に中身のある**本環境で機能しているデータベースの場合**は`npx prisma migrate dev`でなければならない。その理由を以下に記載します。

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

> [!NOTE]  
> - 上記フローを経ても予約登録機能が動かない場合<br>
> 異なる開発環境（別PC）に更新内容を反映させる場合の注意事項です。<br>
> 上記フローを経て、`git pull origin main`で当該リモートリポジトリと整合性を取ったのに**予約登録機能が動かない**場合は以下のコマンドを`ターミナル`で打つ。<br> WindowsPC でコマンドを実行した際に権限上のエラーが発生した場合は`コマンドプロンプト`で再度試してみる。
> ```bash
> # Prismaクライアントを更新して新しいスキーマを反映
> npx prisma generate
> ```

## データベースの仕様（テーブル）更新
登録内容を変更したい場合、以下フローを実行する必要がある。
- `prisma/schema.prisma`<br>`model`オブジェクトの内容を編集（登録内容を追加・削除）
- `prisma/schema.prisma`の`model`オブジェクト編集後、以下のコマンドをターミナルに打つ<br>
```bash
# マイグレーションファイルを作成し、データベースに変更を適用
npx prisma migrate dev --name what_you_changed # --name 以降は任意の命名

# Prismaクライアントを更新して新しいスキーマを反映
npx prisma generate
```

> [!NOTE]  
> - `prisma/dev.db-journal`<br>`dev.db-journal`という設定中のデータベース（今回は`postgresql`）の内部処理用ファイルが自動的に生成・削除されるが無視して構わない。<br>`dev.db-journal`は`postgresql`が自動的に管理する`postgresql`のトランザクションログファイルで、データベース操作の一時的な記録を保持している。

### その他の更新・修正が必要なファイル
※以下の更新・修正は本リポジトリにおいてのみ適用されるもので一般的なものではありません

- `src/app/components/schedule/todoItems/ts/todoItemType.ts`<br>登録内容の型情報を編集
- `src/app/components/schedule/todoItems/TodoForm.tsx`
  - `todoItems`ステートの初期値である`initTodoItems`オブジェクトを編集（オブジェクトに当該登録内容であるプロパティ・キーを追加・削除）
  - （変更した）当該登録内容に関する入力フォームを（`src/app/components/schedule/todoItems/utils`配下に）用意または調整
- `src/app/api/reservations/`配下の`Route Handlers`の登録内容を編集<br>
（※[前述のprismaデータベース更新フロー](#データベースの仕様テーブル更新)が済んでいないと進まないので注意）
  - `POST`, `PUT`に関する`data`オブジェクト内を編集（例：プロパティ・キーの追加など）<br>
  ※`data`オブジェクト編集後に型エラーが表示される場合は一旦`VSCode`を閉じてみる

## Vercel Postgres 関連情報
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Postgres Pricing](https://vercel.com/docs/storage/vercel-postgres/usage-and-pricing)
