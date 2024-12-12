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
                console.log(memo.todoID, todoItems.todoID);
                const isMatchDay: boolean = memo.todoID === todoItems.todoID;

                if (
                    typeof memo.rooms !== 'undefined' &&
                    typeof memo.startTime !== 'undefined' &&
                    typeof memo.finishTime !== 'undefined'
                ) {
                    const isMatchRoom: boolean = typeof todoItems.rooms !== 'undefined' ? memo.rooms === todoItems.rooms : false;

                    console.log(parseInt(memo.startTime?.replace(':', '')), parseInt(memo.finishTime?.replace(':', '')), theTime);

                    const isOverlapSchedule: boolean = (parseInt(memo.startTime?.replace(':', '')) <= theTime && parseInt(memo.finishTime?.replace(':', '')) >= theTime);
                    console.log(isOverlapSchedule);

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
        }
    }

    const checkTimeBlockEntryForm: (e: ChangeEvent<HTMLInputElement>) => boolean = (e: ChangeEvent<HTMLInputElement>) => {
        let isValidateTime: boolean = false;
        const idAttrStr: string = e.target.id;
        const valueStr: string = e.target.value;
        if (idAttrStr === 'startTime') {
            if (parseInt(valueStr) < timeBlockBegin) {
                alert(`「${timeBlockBegin}時」以降の時間帯で指定してください`);
                isValidateTime = true;
            }
        } else {
            if (parseInt(valueStr) > timeBlockEnd) {
                alert(`「${timeBlockEnd}時」以前の時間帯で指定してください`);
                isValidateTime = true;
            }
        }

        return isValidateTime;
    }

    return { checkTimeBlockEntryForm, checkTimeSchedule, isBtnDisabledCheckTimeSchedule }
}