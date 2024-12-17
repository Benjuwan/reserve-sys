import { v4 as uuidv4 } from 'uuid'; // key へ渡すための固有の識別子を生成する npm ライブラリ

import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from '@/app/types/calendar-atom';

export const useRegiTodoItem = () => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    /* ToDo の登録 */
    const regiTodoItem: (todoItems: todoItemType) => void = (todoItems: todoItemType) => {
        const shallowCopyTodoItems: todoItemType = { ...todoItems }

        const newTodoList: todoItemType = {
            ...shallowCopyTodoItems,
            uuid: uuidv4() // key へ渡すための固有の識別子（uuid：Universally Unique Identifier）を生成
        }

        if (shallowCopyTodoItems.todoContent.length > 0) {
            setTodoMemo([...todoMemo, newTodoList]);
        }
    }

    return { regiTodoItem }
}