import { memo } from "react";
import roomStyle from "../styles/roomstyle.module.css";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const timeBlockBegin: number = 9;
export const timeBlockEnd: number = 20;

function TimeBlocks() {
    const [todoMemo] = useAtom(todoMemoAtom);

    const timeBlocks: number[] = [];
    for (let i = timeBlockBegin; i <= timeBlockEnd; i++) timeBlocks.push(i);

    console.log(todoMemo)

    const minBlocks: number[] = [];
    for (let i = 1; i <= 59; i++) minBlocks.push(i);

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