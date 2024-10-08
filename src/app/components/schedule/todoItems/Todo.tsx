import { useEffect } from "react";
import { useAtom } from "jotai";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { isDesktopViewAtom, todoMemoAtom } from "@/app/types/calendar-atom";

export const Todo = ({ todoID }: { todoID: string }) => {
    const [, setTodoMemo] = useAtom(todoMemoAtom);
    const [desktopView] = useAtom(isDesktopViewAtom);

    // useEffect(() => {
    //     if (isExistDataItems !== null) {
    //         setTodoMemo((_prevTodoList) => [...isExistDataItems]);
    //     } else {
    //         setTodoMemo((_prevTodoList) => []); // 前月や次月に移動するたびに ToDo メモを初期化
    //     }
    // }, [todoID]);

    return (
        <>
            {desktopView ?
                <>
                    <TodoForm props={{
                        todoId: todoID
                    }} />
                    <TodoList todoID={todoID} />
                </> :
                <TodoForm props={{
                    todoId: todoID
                }} />
            }
        </>
    );
}