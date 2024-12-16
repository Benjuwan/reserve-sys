## Reserve-Sys

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

## 備考
- `link`で別ファイルを読み込む方法<br>
[Next.jsでheadタグの中にlinkでスタイルシート指定をする方法](https://naopoyo.com/docs/how-to-specify-a-stylesheet-with-a-link-tag-in-the-head-tag-in-next-js)# reserve-sys

- `useState`や`useEffect`を抑えて不要な再レンダリングを防ぐ
[優先度順：Reactの再レンダリング最適化ガイド](https://zenn.dev/any_dev/articles/react-performance-rendering-guide)