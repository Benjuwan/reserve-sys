import { todoItemType } from "../ts/todoItemType";
import { timeBlockBegin, timeBlockEnd } from "@/types/rooms-atom";
import { useCheckTimeBlockEntryForm } from "./useCheckTimeBlockEntryForm";

export const useCheckTimeValidation = () => {
    const { checkTimeBlockEntryForm, checkTimeSchedule } = useCheckTimeBlockEntryForm();

    const checkTimeValidation: (todoItems: todoItemType, setValidationTxt: (txt: string) => void, currentValidationTxt: string) => void = (
        todoItems: todoItemType,
        setValidationTxt: (txt: string) => void,
        currentValidationTxt: string
    ) => {
        if (
            (typeof todoItems.startTime !== 'undefined' && typeof todoItems.finishTime !== 'undefined')
        ) {
            const isCheckTimeSchedule_start: boolean = checkTimeSchedule(todoItems.startTime, todoItems);
            const isCheckTimeSchedule_finish: boolean = checkTimeSchedule(todoItems.finishTime, todoItems);
            if (isCheckTimeSchedule_start || isCheckTimeSchedule_finish) {
                setValidationTxt('他の方が既に予約済みです');
            }

            const isCheckTimeBlockEntryForm_start: boolean = checkTimeBlockEntryForm(todoItems.startTime);
            const isCheckTimeBlockEntryForm_finish: boolean = checkTimeBlockEntryForm(todoItems.finishTime);
            if (isCheckTimeBlockEntryForm_start || isCheckTimeBlockEntryForm_finish) {
                setValidationTxt(`「${timeBlockBegin}時〜${timeBlockEnd}時」の時間帯で指定してください`);
            }

            const isCheckTimeSchedule_FALSE: boolean = !isCheckTimeSchedule_start && !isCheckTimeSchedule_finish;
            const isCheckTimeBlockEntryForm_FALSE: boolean = !isCheckTimeBlockEntryForm_start && !isCheckTimeBlockEntryForm_finish;

            // バリデーションの初期化（ useCheckTimeBlockEntryForm の上記どちらの関数処理チェックも false かつ validationTxt が入力済みの場合）
            if (
                isCheckTimeSchedule_FALSE &&
                isCheckTimeBlockEntryForm_FALSE &&
                currentValidationTxt.length > 0
            ) {
                setValidationTxt('');
            }
        }
    }

    return { checkTimeValidation }
}