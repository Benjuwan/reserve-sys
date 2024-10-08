import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useHandleFormEntries } from "../../../hooks/useHandleFormEntries";
import { useScrollTop } from "@/app/hooks/useScrollTop";

type TodoFormType = {
    todoItem?: todoItemType;
    todoId?: string;
}

export const TodoForm = ({ props }: { props: TodoFormType }) => {
    const { todoItem, todoId } = props;

    const initTodoItems: todoItemType = {
        uuid: todoItem ? todoItem.uuid : '001',
        todoID: todoId ? todoId : todoItem ? todoItem.todoID : '001',
        todoContent: '',
        startTime: '',
        finishTime: '',
        edit: todoItem ? todoItem.edit : false
    }
    const [todoItems, setTodoItems] = useState<todoItemType>(initTodoItems);

    const { updateTodoItem } = useUpdateTodoItem();
    const { regiTodoItem } = useRegiTodoItem();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const { scrollTop } = useScrollTop();
    const { closeModalWindow } = useCloseModalWindow();
    const { handleFormEntries } = useHandleFormEntries();

    const handleOpenClosedBtnClicked: (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => void = (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => {
        viewTodoCtrl(ctrlHandlerElm);
        scrollTop();
    }

    const resetStates: () => void = () => {
        setTodoItems((_prevTodoItems) => initTodoItems);
        setTimeout(() => scrollTop()); // buttonのクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    const isBtnDisabled: boolean = todoItems.todoContent.length === 0 || (todoItems.startTime !== undefined && todoItems.startTime.length === 0) || (todoItems.finishTime !== undefined && todoItems.finishTime.length === 0);

    return (
        <form className={todoStyle.todoForm} onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            {
                !todoItems.edit ?
                    (
                        regiTodoItem(todoItems),
                        handleOpenClosedBtnClicked(formElm)
                    ) :
                    updateTodoItem(todoItems)
            }
            resetStates();
        }}>
            <label><span>予定内容</span><input type="text" value={todoItems.todoContent} id="todoContent" onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} />
            </label>
            <div className={todoStyle.timeSchedule}>
                <label className={todoStyle.timeLabel}><span>開始時刻</span><input id="startTime" type="time" value={todoItems.startTime} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} /></label>
                <label className={todoStyle.timeLabel}><span>終了時刻</span><input id="finishTime" type="time" value={todoItems.finishTime} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} /></label>
            </div>
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
        </form>
    );
}