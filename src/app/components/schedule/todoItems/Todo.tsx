import { memo, useEffect } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import TodoForm from "./TodoForm";

function Todo({ todoID, present }: { todoID: string, present: number }) {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    useEffect(() => {
        const exceptPastTodoMemos: todoItemType[] = [...todoMemo].filter(memo => {
            const memoDate: number = parseInt(memo.todoID.replaceAll('/', ''));
            if (memoDate >= present) {
                return memo;
            }
        });
        /**
         * 過去登録分を消すために（一旦 DB を空にして）exceptPastTodoMemos を DB に登録し直す
        */
        setTodoMemo(exceptPastTodoMemos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TodoForm props={{
            todoId: todoID
        }} />
    );
}

export default memo(Todo);