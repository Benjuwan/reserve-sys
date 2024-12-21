import Link from "next/link";
import Rooms from "./components/rooms/Rooms";
import Calendar from "./components/schedule/calendar/Calendar";

export default async function Home() {
  return (
    <main>
      <Link href={'/about'}>使い方について</Link>
      <Rooms />
      <Calendar />
    </main>
  );
}
