import { ChangeEvent, memo, SyntheticEvent, useState } from "react";
import todoStyle from "./styles/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import TodoForm from "./TodoForm";
import { useDeleteTodoItem } from "./hooks/useDeleteTodoItem";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useScrollTop } from "@/app/hooks/useScrollTop";

function TodoItems({ todoItem }: { todoItem: todoItemType }) {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const [editAble, setEditAble] = useState<boolean>(true);

    const [checkPassword, setCheckPassword] = useState<string>('');
    const handleCheckPassword: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
        const checkPasswordStr: string = e.currentTarget.value;
        setCheckPassword(checkPasswordStr);

        if (checkPasswordStr === todoItem.pw) {
            alert('パスワードが解除されました');
            setEditAble(false);
            setCheckPassword('');
        }
    }

    const { deleteTodoItem } = useDeleteTodoItem();
    const { closeModalWindow } = useCloseModalWindow();
    const { scrollTop } = useScrollTop();
    const handleCloseModalWindowBtnClicked = (btnEl: SyntheticEvent<HTMLButtonElement>) => {
        btnEl.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
        closeModalWindow();
        scrollTop();
    }

    const changeMode: (todoItem: todoItemType) => void = (todoItem: todoItemType) => {
        let editState: boolean | null = null;
        if (todoItem.edit === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
            ...todoItem,
            edit: editState
        }

        if (todoItem.startTime || todoItem.finishTime) {
            updateTodoList.startTime = todoItem.startTime;
            updateTodoList.finishTime = todoItem.finishTime;
        }

        const exceptUpdateTodoMemos: todoItemType[] = [...todoMemo].filter(todoMemoItem => todoMemoItem.uuid !== todoItem.uuid);

        setTodoMemo((_prevTodoList) => [...exceptUpdateTodoMemos, updateTodoList]);
    }

    return (
        <div className={todoStyle.modalWindow}>
            <div className={todoStyle.modalWindowChild}>
                {todoItem.edit === true ?
                    <>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 編集前 ---</p>
                            <p>予約内容：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                            {todoItem.pw && <p>登録パスワード：{todoItem.pw}</p>}
                        </div>
                        <TodoForm props={{
                            todoItem: todoItem
                        }} />
                        <div className={todoStyle.editerIntoCtrlBtns}>
                            <button id={todoStyle["deleteBtn"]} className={todoStyle.formBtns} type="button" onClick={(deleteBtn: SyntheticEvent<HTMLButtonElement>) => {
                                handleCloseModalWindowBtnClicked(deleteBtn);
                                deleteTodoItem(todoItem.uuid);
                            }}>削除</button>
                            <button className={`${todoStyle.formBtns} ${todoStyle.editBtn}`} type="button" onClick={() => {
                                changeMode(todoItem);
                            }}>戻る</button>
                        </div>
                    </> :
                    <div className={todoStyle.editFalseMode}>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 現在の予約内容 ---</p>
                            <p>予約内容：{todoItem.todoContent}</p>
                            {todoItem.rooms && <p>場所：{todoItem.rooms}</p>}
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        {editAble &&
                            <label className={todoStyle.pwLabel}><span>パスワード</span><input type="text" value={checkPassword} onInput={handleCheckPassword} />
                            </label>
                        }
                        <button
                            type="button"
                            className={`${todoStyle.formBtns} ${todoStyle.editBtn}`}
                            disabled={editAble}
                            onClick={() => {
                                changeMode(todoItem);
                            }}
                        >編集</button>
                    </div>
                }
            </div>
            <button id={todoStyle["closeBtn"]} type="button" className={todoStyle.formBtns} onClick={(closeBtnEl: SyntheticEvent<HTMLButtonElement>) => handleCloseModalWindowBtnClicked(closeBtnEl)}>詳細画面を閉じる</button>
        </div>
    );
}

export default memo(TodoItems);