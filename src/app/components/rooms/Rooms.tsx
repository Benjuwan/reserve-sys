"use client"

import { memo } from "react";
import roomStyle from "./styles/roomstyle.module.css";
import { useAtom } from "jotai";
import { roomsAtom } from "@/app/types/rooms-atom";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import TimeBlocks from "./components/TimeBlocks";

function Rooms() {
    const [rooms] = useAtom(roomsAtom);
    const [todoMemo] = useAtom(todoMemoAtom);

    console.log(todoMemo)

    return (
        <section>
            <h2>Rooms</h2>
            {rooms.map((room, i) => (
                <div key={i} className={roomStyle.roomContainer}>
                    <p>{room.room}</p>
                    <div className={roomStyle.timeScheduleWrapper}>
                        <TimeBlocks />
                    </div>
                </div>
            ))}
        </section>
    );
}

export default memo(Rooms);