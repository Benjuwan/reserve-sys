import { atom } from "jotai";
import { todoItemType } from "../components/schedule/todoItems/ts/todoItemType";

const TEST: todoItemType = {
    uuid: 'test',
    todoID: '2024/12/1',
    todoContent: 'test',
    edit: false,
    pw: 'test',
    rooms: '2F',
    startTime: '10:00',
    finishTime: '11:00'
};

export const todoMemoAtom = atom<todoItemType[]>([TEST]);
export const isDesktopViewAtom = atom<boolean>(false);