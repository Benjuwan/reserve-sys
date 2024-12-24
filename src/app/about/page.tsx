import baseStyle from "../styles/page.module.css";

export default async function AboutPage() {
    return (
        <div className={baseStyle.theAboutWrapper}>
            <h2>Reservation Rooms 使い方の説明</h2>
            <ol>
                <li>スケジュール欄の日付にあるアイコンをクリック</li>
                <li>表示されたフォーム内の所定項目を選択及び入力</li>
                <li>登録後、スケジュールと上部のタイムテーブルに反映されているかを確認</li>
                <li>必要に応じて登録時のパスワードを使って予約内容を更新</li>
            </ol>
            <div className={baseStyle.about_subInfo}>
                <h3>注意事項</h3>
                <dl>
                    <div>
                        <dt>予約内容の重複禁止</dt>
                        <dd>他の方が先に予約している場合は受け付けません。</dd>
                    </div>
                    <div>
                        <dt>予約時間外は受付不可</dt>
                        <dd>上部タイムテーブル内の時間帯でのみ予約できます。また、当月のみ予約を受け付けます。</dd>
                    </div>
                    <div>
                        <dt>過去の予約内容は随時削除</dt>
                        <dd>当日以前の過去予約分は削除されます。</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}