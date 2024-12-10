import roomStyle from "../styles/roomstyle.module.css";
import { memo } from "react";
import TimeBlock from "./TimeBlock";

export const timeBlockBegin: number = 9;
export const timeBlockEnd: number = 20;

function TimeTable({ room }: { room: string }) {
    const timeBlocks: number[] = [];
    for (let i = timeBlockBegin; i <= timeBlockEnd; i++) timeBlocks.push(i);

    return (
        <ul>
            {timeBlocks.map(timeBlock => (
                <li key={timeBlock}>
                    <span>{timeBlock}</span>
                    <div className={roomStyle.minBlocks}>
                        <TimeBlock room={room} timeBlock={timeBlock} />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default memo(TimeTable);