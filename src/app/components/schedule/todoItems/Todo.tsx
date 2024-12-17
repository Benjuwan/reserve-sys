import { memo, useEffect } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import TodoForm from "./TodoForm";

function Todo({ todoID }: { todoID: string }) {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    useEffect(() => {
        const thisMonth: number = new Date().getMonth() + 1;
        const exceptPastTodoMemos: todoItemType[] = [...todoMemo].filter(memo => {
            const memoDateMonth: number = parseInt(memo.todoID.split('/')[1]);
            if (memoDateMonth >= thisMonth) {
                return memo;
            }
        });
        /**
         * 過去登録分を消すために（一旦 DB を空にして）exceptPastTodoMemos を DB に登録し直す
        */
        setTodoMemo(exceptPastTodoMemos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (isExistDataItems !== null) {
    //         setTodoMemo((_prevTodoList) => [...isExistDataItems]);
    //     } else {
    //         setTodoMemo((_prevTodoList) => []); // 前月や次月に移動するたびに ToDo メモを初期化
    //     }
    // }, [todoID]);

    return (
        <TodoForm props={{
            todoId: todoID
        }} />
    );
}

export default memo(Todo);