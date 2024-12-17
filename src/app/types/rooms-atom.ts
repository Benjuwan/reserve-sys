import { atom } from "jotai";
import { roomsType } from "../components/rooms/ts/roomsType";

export const timeBlockBegin: number = 9; // 予約可能-開始時間
export const timeBlockEnd: number = 20;  // 予約可能-終了時間

const rooms: roomsType = [
    { room: '2F' },
    { room: '3F' },
    { room: '4F' }
];
export const roomsAtom = atom<roomsType>(rooms);