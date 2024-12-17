"use client"

import { memo } from "react";
import roomStyle from "./styles/roomstyle.module.css";
import { useAtom } from "jotai";
import { roomsAtom } from "@/app/types/rooms-atom";
import TimeTable from "./components/TimeTable";

function Rooms() {
    const [rooms] = useAtom(roomsAtom);

    return (
        <section>
            <h2>Reservation Rooms</h2>
            {rooms.map((room, i) => (
                <div key={i} className={roomStyle.roomContainer}>
                    <p>{room.room}</p>
                    <div className={roomStyle.timeScheduleWrapper}>
                        <TimeTable room={room.room} />
                    </div>
                </div>
            ))}
        </section>
    );
}

export default memo(Rooms);