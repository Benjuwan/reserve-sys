import { memo, useMemo } from "react";
import { todoItemType } from "../../schedule/todoItems/ts/todoItemType";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import { useAtom } from "jotai";

function TimeBlock({ room, timeBlock }: { room: string, timeBlock: number }) {
    const [todoMemo] = useAtom(todoMemoAtom);

    const minBlocks: number[] = [];
    for (let i = 1; i <= 59; i++) minBlocks.push(i);

    // useMemo を使用した動的な予約情報（各部屋ごとのタイムテーブル配列）の取得 
    const relevantReservations: todoItemType[] = useMemo(() => {
        return [...todoMemo].filter(memo => typeof memo.rooms !== 'undefined' && memo.rooms === room);
    }, [todoMemo, room]);

    // some 処理によって一つでも true なら true が返却される
    const reservedFlag: (timeBlock: number, minBlock: number) => boolean = (timeBlock: number, minBlock: number) => {
        return relevantReservations.some(reservation => {
            const theTime = parseInt(`${timeBlock}${minBlock.toString().padStart(2, '0')}`);
            const start = parseInt(reservation.startTime?.split(':').join('') ?? '0');
            const finish = parseInt(reservation.finishTime?.split(':').join('') ?? '0');
            return theTime >= start && theTime <= finish;
        });
    };

    return (
        <>
            {minBlocks.map(minBlock => (
                <div
                    key={minBlock}
                    data-minblock={minBlock}
                    data-reserved={reservedFlag(timeBlock, minBlock)}
                >&nbsp;</div>
            ))}
        </>
    );
}

export default memo(TimeBlock);