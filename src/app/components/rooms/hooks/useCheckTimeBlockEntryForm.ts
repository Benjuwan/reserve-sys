import { ChangeEvent } from "react";
import { timeBlockBegin, timeBlockEnd } from "../components/TimeTable";
import { todoItemType } from "../../schedule/todoItems/ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const useCheckTimeBlockEntryForm = () => {
    const [todoMemo] = useAtom(todoMemoAtom);

    const checkTimeSchedule: (targetTime: ChangeEvent<HTMLInputElement> | string, todoItems: todoItemType) => boolean = (targetTime: ChangeEvent<HTMLInputElement> | string, todoItems: todoItemType) => {
        const theTime: number = typeof targetTime !== 'string' ?
            parseInt(targetTime.target.value.replace(':', '')) :
            parseInt(targetTime.replace(':', ''));

        const isCheckTimeSchedule: boolean = todoMemo.some(memo => {
            const isMatchDay: boolean = memo.todoID === todoItems.todoID;

            if (
                typeof memo.rooms !== 'undefined' &&
                typeof memo.startTime !== 'undefined' &&
                typeof memo.finishTime !== 'undefined'
            ) {
                const isMatchRoom: boolean = typeof todoItems.rooms !== 'undefined' ? memo.rooms === todoItems.rooms : false;


                const isOverlapSchedule: boolean = (parseInt(memo.startTime?.replace(':', '')) <= theTime && parseInt(memo.finishTime?.replace(':', '')) >= theTime);

                // 当日限定かつ 予約室が合致かつ 時間が被っている場合 
                return isMatchDay && isMatchRoom && isOverlapSchedule;
            }
        });

        return isCheckTimeSchedule;
    }

    const checkTimeBlockEntryForm: (e: ChangeEvent<HTMLInputElement>) => boolean = (e: ChangeEvent<HTMLInputElement>) => {
        const valueStr: string = e.target.value;
        const isNoReservationTime: boolean = parseInt(valueStr) < timeBlockBegin || parseInt(valueStr) >= timeBlockEnd;

        return isNoReservationTime;
    }

    return { checkTimeBlockEntryForm, checkTimeSchedule }
}