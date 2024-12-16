import { atom } from "jotai";
import { todoItemType } from "../components/schedule/todoItems/ts/todoItemType";

export const todoMemoAtom = atom<todoItemType[]>([]);
export const isDesktopViewAtom = atom<boolean>(false);