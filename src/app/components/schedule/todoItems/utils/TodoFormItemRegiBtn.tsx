import todoStyle from "../styles/todoStyle.module.css";
import { memo, SyntheticEvent, useMemo } from "react";
import { todoItemType } from "../ts/todoItemType";
import { useCheckTimeBlockEntryForm } from "@/app/components/rooms/hooks/useCheckTimeBlockEntryForm";
import { useCloseModalWindow } from "../hooks/useCloseModalWindow";
import { useRegiTodoItem } from "../hooks/useRegiTodoItem";
import { useUpdateTodoItem } from "../hooks/useUpdateTodoItem";
import { useHandleFormItems } from "../hooks/useHandleFormItems";

function TodoFormItemRegiBtn({ todoItems, resetStates }: {
    todoItems: todoItemType,
    resetStates: () => void
}) {
    const { checkTimeSchedule } = useCheckTimeBlockEntryForm();

    const { closeModalWindow } = useCloseModalWindow();
    const { regiTodoItem } = useRegiTodoItem();
    const { updateTodoItem } = useUpdateTodoItem();
    const { handleOpenClosedBtnClicked } = useHandleFormItems();

    const isBtnDisabled: boolean = useMemo(() => {
        const isCheckPw: boolean = todoItems.pw.length === 0;
        const isCheckContent: boolean = todoItems.todoContent.length === 0;
        const inCorrectTimeSchedule: boolean = (typeof todoItems.startTime !== 'undefined' && typeof todoItems.finishTime !== 'undefined') ?
            parseInt(todoItems.startTime.replace(':', '')) > parseInt(todoItems.finishTime.replace(':', ''))
            : false;

        if (
            (typeof todoItems.startTime !== 'undefined' &&
                checkTimeSchedule(todoItems.startTime, todoItems)) ||
            (typeof todoItems.finishTime !== 'undefined' &&
                checkTimeSchedule(todoItems.finishTime, todoItems))
        ) {
            alert('他の方が既に予約済みです');
            return true;
        }

        return isCheckPw || isCheckContent || inCorrectTimeSchedule;
    }, [todoItems]);

    return (
        <button className={todoStyle.formBtns} id={todoStyle.regiUpdateBtn} type="button"
            disabled={isBtnDisabled}
            onClick={(btnEl: SyntheticEvent<HTMLButtonElement>) => {
                {
                    !todoItems.edit ?
                        (
                            regiTodoItem(todoItems),
                            handleOpenClosedBtnClicked(btnEl.currentTarget)
                        ) :
                        (
                            btnEl.stopPropagation(), // 親要素のクリックイベント（OnViewModalWindow）発生を防止
                            updateTodoItem(todoItems),
                            closeModalWindow()
                        )
                }
                resetStates();
            }}>{!todoItems.edit ? '登録' : '再登録'}</button>
    )
}

export default memo(TodoFormItemRegiBtn);