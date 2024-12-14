import { ChangeEvent, memo, SyntheticEvent, useMemo, useRef, useState } from "react";
import { timeBlockBegin, timeBlockEnd } from "../../rooms/components/TimeTable";
import todoStyle from "./styles/todoStyle.module.css";
import { useAtom } from "jotai";
import { roomsAtom } from "@/app/types/rooms-atom";
import { todoItemType } from "./ts/todoItemType";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";
import { useCloseModalWindow } from "./hooks/useCloseModalWindow";
import { useHandleFormEntries } from "../../../hooks/useHandleFormEntries";
import { useScrollTop } from "@/app/hooks/useScrollTop";
import { useCheckTimeBlockEntryForm } from "../../rooms/hooks/useCheckTimeBlockEntryForm";

type TodoFormType = {
    todoItem?: todoItemType;
    todoId?: string;
}

function TodoForm({ props }: { props: TodoFormType }) {
    const { todoItem, todoId } = props;

    const [rooms] = useAtom(roomsAtom);
    const roomRef = useRef<null | HTMLSelectElement>(null);

    const initTodoItems: todoItemType = {
        uuid: todoItem ? todoItem.uuid : '001',
        todoID: todoId ? todoId : todoItem ? todoItem.todoID : '001',
        todoContent: '',
        edit: todoItem ? todoItem.edit : false,
        pw: '',
        rooms: roomRef.current !== null ? roomRef.current.value : rooms[0].room,
        startTime: '',
        finishTime: ''
    }
    const [todoItems, setTodoItems] = useState<todoItemType>(initTodoItems);

    const { updateTodoItem } = useUpdateTodoItem();
    const { regiTodoItem } = useRegiTodoItem();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const { scrollTop } = useScrollTop();
    const { closeModalWindow } = useCloseModalWindow();
    const { handleFormEntries } = useHandleFormEntries();
    const { checkTimeBlockEntryForm, checkTimeSchedule, isBtnDisabledCheckTimeSchedule } = useCheckTimeBlockEntryForm();

    const handleOpenClosedBtnClicked: (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => void = (ctrlHandlerElm: HTMLButtonElement | SyntheticEvent<HTMLFormElement>) => {
        viewTodoCtrl(ctrlHandlerElm);
        scrollTop();
    }

    const resetStates: () => void = () => {
        setTodoItems((_prevTodoItems) => initTodoItems);
        setTimeout(() => scrollTop()); // button のクリックイベントでスクロールトップしないので回避策として疑似的な遅延処理
    }

    const handleTimeSchedule: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => {
        const isCheckTimeBlockEntryForm: boolean = checkTimeBlockEntryForm(e);
        if (isCheckTimeBlockEntryForm) {
            alert(`「${timeBlockBegin}時〜${timeBlockEnd}」の時間帯で指定してください`);
            return;
        }

        const isCheckTimeSchedule: boolean = checkTimeSchedule(e, todoItems);
        if (isCheckTimeSchedule) {
            alert('他の方が既に予約済みです');
            return;
        }

        handleFormEntries<todoItemType>(e, todoItems, setTodoItems);
    }

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

        return isBtnDisabledCheckTimeSchedule || (
            isCheckPw || isCheckContent || inCorrectTimeSchedule
        );
    }, [todoItems]);

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
            {/* 予約内容 */}
            <label><span>予定内容</span><input type="text" value={todoItems.todoContent} id="todoContent" onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} />
            </label>

            {/* 予約室 */}
            {rooms.length > 0 &&
                <>
                    <label><span>場所</span></label>
                    <select name="rooms" id="rooms" ref={roomRef} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)}>
                        {rooms.map((room, i) => (
                            <option key={i} value={room.room}>{room.room}</option>
                        ))}
                    </select>
                </>
            }

            {/* タイムテーブル（スケジュール）*/}
            <div className={todoStyle.timeSchedule}>
                <label className={todoStyle.timeLabel}><span>開始時刻</span><input id="startTime" type="time" value={todoItems.startTime} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleTimeSchedule(e) }} /></label>
                <label className={todoStyle.timeLabel}><span>終了時刻</span><input id="finishTime" type="time" value={todoItems.finishTime} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleTimeSchedule(e) }} /></label>
            </div>

            {/* パスワード */}
            <label><span>パスワード</span><input type="text" value={todoItems.pw} id="pw" onInput={(e: ChangeEvent<HTMLInputElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)} />
            </label>

            {/* 登録ボタン */}
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

export default memo(TodoForm);