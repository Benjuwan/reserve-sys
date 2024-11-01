import { memo, useEffect } from "react";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";
import TodoForm from "./TodoForm";

function Todo({ todoID }: { todoID: string }) {
    const [, setTodoMemo] = useAtom(todoMemoAtom);

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