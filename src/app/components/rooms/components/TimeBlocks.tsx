import { memo, useEffect } from "react";
import roomStyle from "../styles/roomstyle.module.css";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const timeBlockBegin: number = 9;
export const timeBlockEnd: number = 20;

function TimeBlocks() {
    const [todoMemo] = useAtom(todoMemoAtom);

    const timeBlocks: number[] = [];
    for (let i = timeBlockBegin; i <= timeBlockEnd; i++) timeBlocks.push(i);

    const minBlocks: number[] = [];
    for (let i = 1; i <= 59; i++) minBlocks.push(i);

    useEffect(() => {
        for (const memo of todoMemo) {
            const room: string | null = memo.rooms ?? null;
            const startTime: string | null = memo.startTime ?? null;
            const startTimeHour = startTime?.split(':')[0];
            const startTimeMin = startTime?.split(':')[1];
            const finishTime: string | null = memo.finishTime ?? null;
            const finishTimeHour = finishTime?.split(':')[0];
            const finishTimeMin = finishTime?.split(':')[1];

            console.log(room, startTime, finishTime);
        }
    }, [todoMemo]);

    return (
        <ul>
            {timeBlocks.map(timeBlock => (
                <li key={timeBlock}>
                    <span>{timeBlock}</span>
                    <div className={roomStyle.minBlocks}>
                        {minBlocks.map(minBlock => (
                            <div key={minBlock} data-minblock={minBlock}>&nbsp;</div>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default memo(TimeBlocks);