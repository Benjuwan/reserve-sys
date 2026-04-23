import todoStyle from "../styles/todoStyle.module.css";
import { SyntheticEvent, Dispatch, memo, SetStateAction, useEffect } from "react";
import { todoItemType } from "../ts/todoItemType";
import { useCheckTimeValidation } from "../hooks/useCheckTimeValidation";
import { useHandleFormEntries } from "@/hooks/useHandleFormEntries";

function TodoFormItemTimeSchedule({ todoItems, setTodoItems, setValidationTxt, validationTxt }: {
    todoItems: todoItemType,
    setTodoItems: Dispatch<SetStateAction<todoItemType>>,
    setValidationTxt: (txt: string) => void,
    validationTxt: string
}) {
    const { checkTimeValidation } = useCheckTimeValidation();
    const { handleFormEntries } = useHandleFormEntries();

    useEffect(() => {
        // Effect 内で State 更新関数を内包した関数を実行しているがLintエラーは発生しない
        // 理由： Lint はコードの文脈から「このStateは不要では？」と判断した上で警告を出すため ＝ 今回の実装内容およびロジックの場合は『確かにState更新関数がEffect内で必要だな』と判断されてスルー（許可）されている
        checkTimeValidation(todoItems, setValidationTxt, validationTxt);
    }, [todoItems, setValidationTxt, validationTxt, checkTimeValidation]);

    const handleTimeSchedule: (e: SyntheticEvent<HTMLInputElement>) => void = (e: SyntheticEvent<HTMLInputElement>) => {
        checkTimeValidation(todoItems, setValidationTxt, validationTxt);
        handleFormEntries<todoItemType>(e, todoItems, setTodoItems);
    }

    return (
        <div className={todoStyle.timeSchedule}>
            <label className={todoStyle.timeLabel}><span>開始時刻</span><input id="startTime" type="time" value={
                // Safari（Mac OS）での表示及び登録機能の不具合対策
                // 以下記述でないと 12:30 で表示されてしまい、登録機能も動かなくなってしまう（※ドロップダウンリストが表示されないのはブラウザ仕様）
                todoItems.startTime?.length === 0 ?
                    '00:00' : todoItems.startTime
            } onChange={(e: SyntheticEvent<HTMLInputElement>) => { handleTimeSchedule(e) }} /></label>
            <label className={todoStyle.timeLabel}><span>終了時刻</span><input id="finishTime" type="time" value={
                todoItems.finishTime?.length === 0 ?
                    '00:00' : todoItems.finishTime
            } onChange={(e: SyntheticEvent<HTMLInputElement>) => { handleTimeSchedule(e) }} /></label>
        </div>
    )
}

export default memo(TodoFormItemTimeSchedule);