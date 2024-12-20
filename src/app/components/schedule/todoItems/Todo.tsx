import { memo, useEffect } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { fetchTodoMemoAtom, todoMemoAtom } from "@/app/types/calendar-atom";
import TodoForm from "./TodoForm";

function Todo({ todoID, present }: { todoID: string, present: number }) {
    const [fetchTodoMemo] = useAtom(fetchTodoMemoAtom);
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    /* データベース（SQLite）から当該予約を削除 */
    const deleteAction = async (id: string) => {
        console.log(todoMemo, id);
        const isNotExistTargetContent_PastSchedule: boolean = [...todoMemo].some(todo => todo.id !== id);

        if (isNotExistTargetContent_PastSchedule) {
            return;
        }

        await fetch(`/api/reservations/${id}`, {
            // delete なので DELETE、データの扱いに関する記述（headers, body, etc...）は不要
            method: "DELETE"
        });
    }

    useEffect(() => {
        if (fetchTodoMemo.length > 0) {
            const pastTodoMemos: todoItemType[] = [];

            /* 当日以前の過去分は省く */
            const exceptPastTodoMemos: todoItemType[] = [...fetchTodoMemo].filter(memo => {
                const memoDate: number = parseInt(memo.todoID.replaceAll('/', ''));
                if (memoDate >= present) {
                    return memo;
                } else {
                    pastTodoMemos.push(memo);
                }
            });

            for (const pastTodoMemo of pastTodoMemos) {
                // 過去登録分を消すために（一旦 DB を空にして）exceptPastTodoMemos を DB に登録し直す
                deleteAction(pastTodoMemo.id);
            }

            setTodoMemo(exceptPastTodoMemos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TodoForm props={{
            todoId: todoID
        }} />
    );
}

export default memo(Todo);