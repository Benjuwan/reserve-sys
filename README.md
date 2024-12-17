## Reserve-Sys
任意の部屋数を用意するとともに、各部屋ごとの予約を視覚的に把握及び管理・編集できる「会議室予約システムUI」です。

## 技術構成
- @types/node@20.16.11
- @types/react-dom@18.3.0
- @types/react@18.3.11
- @types/uuid@10.0.0
- eslint-config-next@14.2.14
- eslint@8.57.1
- jotai@2.10.0
- next@14.2.14
- react-dom@18.3.1
- react@18.3.1
- typescript@5.6.2
- uuid@10.0.0

## ToDoFix
- `src/app/components/schedule/todoItems/Todo.tsx`<br>過去登録分を消すために（一旦 DB を空にして）`exceptPastTodoMemos` を DB に登録し直す

## 内部ファイルのデータフェッチ（を行う場合）
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

## 参照情報
- `link`で別ファイルを読み込む方法<br>
[Next.jsでheadタグの中にlinkでスタイルシート指定をする方法](https://naopoyo.com/docs/how-to-specify-a-stylesheet-with-a-link-tag-in-the-head-tag-in-next-js)# reserve-sys

- `useState`や`useEffect`を抑えて不要な再レンダリングを防ぐ<br>
[優先度順：Reactの再レンダリング最適化ガイド](https://zenn.dev/any_dev/articles/react-performance-rendering-guide)

- `ESLint`エラー：`Expected an assignment or function call and instead saw an expression`への対処<br>
[ESLint A && B, A || C が no-unused-expressions のエラーになる](https://chaika.hatenablog.com/entry/2024/09/28/083000#google_vignette)

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
+        // NG：カスタムフック内でカスタムフックを呼び出してしまっている
-        const { getCalendarItem } = useGetCalndarItem();
    ...
    ..
    .
```