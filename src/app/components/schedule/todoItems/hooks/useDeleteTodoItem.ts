import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const useDeleteTodoItem = () => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    /* データベース（SQLite）から当該予約を削除 */
    const deleteAction = async (id: string) => {
        await fetch(`/api/reservations/${id}`, {
            // delete なので DELETE、データの扱いに関する記述（headers, body, etc...）は不要
            method: "DELETE"
        });
    }

    const deleteTodoItem: (id: string) => void = (id: string) => {
        deleteAction(id);

        const exceptRemoveTodoItems: todoItemType[] = [...todoMemo].filter(todoItem => todoItem.id !== id);
        setTodoMemo(exceptRemoveTodoItems);
    }

    return { deleteTodoItem }
}