import { useEffect } from "react";
import { useAtom } from "jotai";
import { TodoForm } from "./TodoForm";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const Todo = ({ todoID }: { todoID: string }) => {
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