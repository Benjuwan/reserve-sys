import Link from "next/link";

export default async function AboutPage() {
    return (
        <>
            <h2>Reservation Rooms 使い方の説明</h2>
            <ol>
                <li>スケジュール欄の日付にあるアイコンをクリック</li>
                <li>表示されたフォーム内の所定項目を選択及び入力</li>
                <li>登録後、スケジュールと上部のタイムテーブルに反映されているかを確認</li>
                <li>必要に応じて登録時のパスワードを使って予約内容を更新</li>
            </ol>
            <Link href={'/'}>go to TOP</Link>
        </>
    );
}