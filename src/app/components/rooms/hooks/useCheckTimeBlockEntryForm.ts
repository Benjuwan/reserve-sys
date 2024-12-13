import { ChangeEvent, useState } from "react";
import { timeBlockBegin, timeBlockEnd } from "../components/TimeTable";
import { todoItemType } from "../../schedule/todoItems/ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const useCheckTimeBlockEntryForm = () => {
    const [todoMemo] = useAtom(todoMemoAtom);

    const [isBtnDisabledCheckTimeSchedule, setBtnDisabledCheckTimeSchedule] = useState<boolean>(false);

    const checkTimeSchedule: (targetTime: ChangeEvent<HTMLInputElement>, todoItems: todoItemType) => void = (targetTime: ChangeEvent<HTMLInputElement>, todoItems: todoItemType) => {
        if (todoItems.rooms !== undefined) {
            const theTime: number = parseInt(targetTime.target.value.replace(':', ''));

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

            if (isCheckTimeSchedule) {
                alert('他の方が既に予約済みです');
                setBtnDisabledCheckTimeSchedule(true);
            } else {
                setBtnDisabledCheckTimeSchedule(false);
            }

            return;
        }
    }

    const checkTimeBlockEntryForm: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
        const valueStr: string = e.target.value;
        if (parseInt(valueStr) < timeBlockBegin || parseInt(valueStr) > timeBlockEnd) {
            alert(`「${timeBlockBegin}時〜${timeBlockEnd}」の時間帯で指定してください`);
            setBtnDisabledCheckTimeSchedule(true);
        } else {
            setBtnDisabledCheckTimeSchedule(false);
        }

        return;
    }

    return { checkTimeBlockEntryForm, checkTimeSchedule, isBtnDisabledCheckTimeSchedule }
}