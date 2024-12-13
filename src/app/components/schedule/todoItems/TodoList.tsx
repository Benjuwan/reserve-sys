import todoStyle from "./styles/todoStyle.module.css";
import { Fragment, memo, SyntheticEvent, useMemo } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { isDesktopViewAtom, todoMemoAtom } from "@/app/types/calendar-atom";
import TodoItems from "./TodoItems";
import { useScrollTop } from "@/app/hooks/useScrollTop";

function TodoList({ todoID }: { todoID: string }) {
    const [todoMemo] = useAtom(todoMemoAtom);
    const [desktopView] = useAtom(isDesktopViewAtom);

    const { scrollTop } = useScrollTop();

    /* モーダル表示関連（ToDoの詳細表示オン・オフ）*/
    const OnViewModalWindow: (viewerParentElm: HTMLElement) => void = (viewerParentElm: HTMLElement) => {
        const modalWindow: Element | null = viewerParentElm.querySelector(`.${todoStyle.modalWindow}`);
        modalWindow?.classList.add(`${todoStyle.modalWindowOnView}`);
    }

    const sortedTodoMemo: todoItemType[] = useMemo(() => {
        return [...todoMemo].sort((ahead, behind) => {
            if (typeof ahead.startTime !== 'undefined' && typeof behind.startTime !== 'undefined') {
                const aheadStartTime = parseInt(ahead.startTime.split(':')[0]);
                const behindStartTime = parseInt(behind.startTime.split(':')[0]);
                return aheadStartTime - behindStartTime;
            }
            // else の場合は（0を返して）順序変更なし
            return 0;
        });
    }, [todoMemo]);

    return (
        <>
            {todoMemo.length > 0 &&
                <ul className={todoStyle.todoLists}>
                    {sortedTodoMemo.map(todoItem => (
                        <Fragment key={todoItem.uuid}>
                            {/* yyyy/MM/dd が一致した場合 */}
                            {todoItem.todoID === todoID ?
                                <li onClick={(liElm: SyntheticEvent<HTMLLIElement>) => {
                                    OnViewModalWindow(liElm.currentTarget);
                                    scrollTop();
                                }}>
                                    {desktopView ?
                                        <div className={todoStyle.editTargetContent}>
                                            <p className={todoStyle.editTargetStr}>{todoItem.todoContent}</p>
                                            {todoItem.rooms &&
                                                <span>{todoItem.rooms}</span>
                                            }
                                            {todoItem.startTime && <span>開始時刻：{todoItem.startTime}</span>}
                                            {todoItem.finishTime && <span>終了時刻：{todoItem.finishTime}</span>}
                                        </div> :
                                        <p className={todoStyle.isMobileNotice}>
                                            {todoItem.rooms &&
                                                <span>{todoItem.rooms}</span>
                                            }
                                            {todoItem.todoContent.length > 8 ?
                                                <>{todoItem.todoContent.slice(0, 8)}...</> :
                                                <>{todoItem.todoContent}</>
                                            }
                                        </p>
                                    }
                                    <TodoItems todoItem={todoItem} />
                                </li>
                                : null
                            }
                        </Fragment>
                    ))}
                </ul>
            }
        </>
    );
}

export default memo(TodoList);