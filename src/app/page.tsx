import Rooms from "../components/rooms/Rooms";
import Calendar from "../components/schedule/calendar/Calendar";

export default async function Home() {
  /* 418 hydration-error 対策：サーバーコンポーネントでデータ取得して子に渡す  */
  // 各種条件判定に利用するための「今日・本日」の固定値
  const theToday = new Date().getDate();

  return (
    <main>
      <h1>会議室予約システム</h1>
      <Rooms theToday={theToday} />
      <Calendar />
    </main>
  );
}