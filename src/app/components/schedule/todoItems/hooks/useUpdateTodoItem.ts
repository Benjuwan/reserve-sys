import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "@/app/types/calendar-atom";

export const useUpdateTodoItem = () => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    /* ToDo の更新 */
    const updateTodoItem: (todoItems: todoItemType) => void = (todoItems: todoItemType) => {
        const updateTodoList: todoItemType = { ...todoItems };

        const exceptRemoveTodoItems: todoItemType[] = [...todoMemo].filter(todoItem => todoItem.uuid !== updateTodoList.uuid); // 今回更新（削除）対象の todoItem 以外を返す

        /* ----------------------- 以下（変数：shallowCopy を用いた方法）は map 処理時の index を用いた方法（※React では原則 key={i} は NG（key に index を渡すのは非推奨）なので上記の uuid を用いた方法を採用）----------------------- */
        // const shallowCopy: todoItemType[] = [...todoMemo];
        // shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。

        if (updateTodoList.todoContent.length > 0) {
            // setTodoMemo((_prevTodoMemo) => shallowCopy);
            setTodoMemo((_prevTodoMemo) => [...exceptRemoveTodoItems, updateTodoList]);
        }
    }

    return { updateTodoItem }
}