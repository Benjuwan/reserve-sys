import Rooms from "../components/rooms/Rooms";
import Calendar from "../components/schedule/calendar/Calendar";

export default async function Home() {
  /* 418 hydration-error 対策：サーバーコンポーネントでデータ取得して子に渡す  */
  // デプロイ先のタイムゾーン設定がUTCの場合に備えてJSTの日付（今日・本日）を取得
  const jst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const theToday = jst.getDate();

  return (
    <main>
      <h1>会議室予約システム</h1>
      <Rooms theToday={theToday} />
      <Calendar />
    </main>
  );
}
