import { memo, useEffect, useState } from "react";
import roomStyle from "../styles/roomstyle.module.css";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const timeBlockBegin: number = 9;
export const timeBlockEnd: number = 20;

type timeCtrlerType = {
    roomId: string | null,
    startTimeHour: number,
    startTimeMin: number,
    finishTimeHour: number,
    finishTimeMin: number
};

type timeCtrlerAryType = timeCtrlerType[];

function TimeBlocks({ room }: { room: string }) {
    const [todoMemo] = useAtom(todoMemoAtom);

    const [timeCtrler, setTimeCtrler] = useState<timeCtrlerAryType>([]);

    const timeBlocks: number[] = [];
    for (let i = timeBlockBegin; i <= timeBlockEnd; i++) timeBlocks.push(i);

    const minBlocks: number[] = [];
    for (let i = 1; i <= 59; i++) minBlocks.push(i);

    useEffect(() => {
        for (const memo of todoMemo) {
            const startTime: string | null = memo.startTime ?? null;
            const finishTime: string | null = memo.finishTime ?? null;

            if (
                typeof memo.rooms !== 'undefined' &&
                startTime !== null &&
                finishTime !== null
            ) {
                const newTimeCtrlerAry: timeCtrlerType = {
                    roomId: memo.rooms,
                    startTimeHour: parseInt(startTime.split(':')[0]),
                    startTimeMin: parseInt(startTime.split(':')[1]),
                    finishTimeHour: parseInt(finishTime.split(':')[0]),
                    finishTimeMin: parseInt(finishTime.split(':')[1])
                }
                setTimeCtrler([...timeCtrler, newTimeCtrlerAry]);
            }
        }
    }, [todoMemo]);

    const reservedFlag: (timeBlock: number) => boolean = (timeBlock: number) => {
        let reservedFlag: boolean = false;
        for (const timeCtrl of timeCtrler) {
            reservedFlag = timeCtrl.roomId === room &&
                (
                    timeBlock >= timeCtrl.startTimeHour &&
                    timeBlock <= timeCtrl.finishTimeHour
                )
            console.log(reservedFlag, timeCtrler)
        }
        return reservedFlag;
    }

    // console.log(room, timeCtrler);

    return (
        <ul>
            {timeBlocks.map(timeBlock => (
                <li key={timeBlock}>
                    <span>{timeBlock}</span>
                    <div className={roomStyle.minBlocks}>
                        {minBlocks.map(minBlock => (
                            <div
                                key={minBlock}
                                data-minblock={minBlock}
                                data-reserved={reservedFlag(timeBlock)}
                            >&nbsp;</div>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default memo(TimeBlocks);