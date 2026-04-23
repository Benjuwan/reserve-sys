import { SyntheticEvent, Dispatch, Ref, memo, SetStateAction, useEffect } from "react";
import { todoItemType } from "../ts/todoItemType";
import { roomsType } from "@/components/rooms/ts/roomsType";
import { useHandleFormEntries } from "@/hooks/useHandleFormEntries";
import { useCheckTimeValidation } from "../hooks/useCheckTimeValidation";

function TodoFormItemRoom({ rooms, todoItems, setTodoItems, roomRef, setValidationTxt, validationTxt }: {
    rooms: roomsType,
    todoItems: todoItemType,
    setTodoItems: Dispatch<SetStateAction<todoItemType>>,
    roomRef: Ref<HTMLSelectElement> | undefined,
    setValidationTxt: (txt: string) => void,
    validationTxt: string
}) {
    const { handleFormEntries } = useHandleFormEntries();
    const { checkTimeValidation } = useCheckTimeValidation();

    useEffect(() => {
        // Effect 内で State 更新関数を内包した関数を実行しているがLintエラーは発生しない
        // 理由： Lint はコードの文脈から「このStateは不要では？」と判断した上で警告を出すため ＝ 今回の実装内容およびロジックの場合は『確かにState更新関数がEffect内で必要だな』と判断されてスルー（許可）されている
        checkTimeValidation(todoItems, setValidationTxt, validationTxt);
    }, [todoItems, setValidationTxt, validationTxt, checkTimeValidation]);

    return (
        <>
            {rooms.length > 0 &&
                <>
                    <label htmlFor="rooms"><span>場所</span></label>
                    <select name="rooms" id="rooms" ref={roomRef} onChange={(e: SyntheticEvent<HTMLSelectElement>) => handleFormEntries<todoItemType>(e, todoItems, setTodoItems)}>
                        {rooms.map((room, i) => (
                            <option key={i} value={room.room}>{room.room}</option>
                        ))}
                    </select>
                </>
            }
        </>
    )
}

export default memo(TodoFormItemRoom);