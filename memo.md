# メモ・雑記
## メモ
- `Route Handlers`は**クライアントコンポーネントから呼び出す**

## 雑記
- SQLiteはアプリケーション内に用意でき、ファイルベースとなっているので簡単に利用が可能です。
- マイグレートとは今設定した内容を実際のデータベースに反映させる作業です。
- migratitonsの中にはマイグレートの履歴のようなものが残っています。
- dev.db：DBの情報を保持しているファイル

- Prismaはデータベースとのやり取りを簡単にするツールです。ORMとして使われます。ORMとはデータベースのテーブルをオブジェクトとして操作できる技術で、SQLを書かなくてもJavaScriptのコードだけでデータベース操作ができるようになります。
- SQLiteは軽量で組み込み型のリレーショナルデータベースです。アプリの中でデータベースを持てるので外部にサーバーを立てる必要がありません。小規模なプロジェクトでよく使われます。

## 各部屋データ（内部ファイル）のデータフェッチ（を行う場合）
- `public`dir をプロジェクトファイル直下に用意し、そのファイル内にフェッチ用データを置く
```
- public
  |-  room.json // フェッチ用データ
- src
  |- app
  ...
  ..
  .
- next.config.mjs
- tsconfig.json
- README.md
...
..
.
```

- クライアントコンポーネントでデータフェッチ
```tsx
// `src/app/components/rooms/Rooms.tsx`

const [rooms, setRooms] = useAtom(roomsAtom);

useEffect(() => {
    const fetchRoomsData: () => Promise<void> = async () => {
        try {
            /* public/room.json をフェッチ */
            const res: Response = await fetch("/room.json", { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('fetch error');
        }

        const resObj: roomType[] = await res.json();
        setRooms(resObj);
        } catch (e) {
            console.error(e);
        }
    }
    fetchRoomsData();
}, []);
```

## 備忘録
- カスタムフックの呼び出し場所に注意（しないと`ESLint`でエラーが出る）
```diff
export const usePrevNextDays = () => {
+    // OK：領域外でカスタムフックを呼び出す
+    const { getCalendarItem } = useGetCalndarItem();

    const prevNextDays: (year: number, month: number, dayDateBox: calendarItemType[]) => calendarItemType[] = (
        year: number,
        month: number,
        dayDateBox: calendarItemType[],
    ) => {
-        // NG：カスタムフック内でカスタムフックを呼び出してしまっている
-        const { getCalendarItem } = useGetCalndarItem();
    ...
    ..
    .
```

### `Atom`
- `atomWithDefault`
`atomWithDefault`は非同期の初期値を扱える`jotai`のユーティリティ。

```ts
export const fetchTodoMemoAtom = atomWithDefault(async () => {
    // GET処理： src/app/api/reservations/route.ts の GET によりDBからのデータを取得 
    const response: Response = await fetch('/api/reservations', { cache: 'no-store' });
    const resObj: todoItemType[] = await response.json();
    return resObj;
});
```

引数として渡した非同期関数（この場合はfetchを行う関数）が実行され、その結果が atom の初期値として設定される。

```ts
const [fetchTodoMemo] = useAtom(fetchTodoMemoAtom);
```

コンポーネント内で useAtom(fetchTodoMemoAtom) を使用すると、自動的に：
1. フェッチ処理が実行される
2. データが取得できるまでの間は undefined または Promise の状態になる
3. データ取得完了後、取得したデータで状態が更新される
