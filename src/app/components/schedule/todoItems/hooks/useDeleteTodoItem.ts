import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const useDeleteTodoItem = () => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const deleteTodoItem: (uuid: string) => void = (uuid: string) => {
        const exceptRemoveTodoItems: todoItemType[] = [...todoMemo].filter(todoItem => todoItem.uuid !== uuid);
        setTodoMemo((_prevTodoList) => exceptRemoveTodoItems);
    }

    return { deleteTodoItem }
}