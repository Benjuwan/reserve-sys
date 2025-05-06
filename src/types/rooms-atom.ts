import { atom } from "jotai";
import { roomsType } from "../components/rooms/ts/roomsType";

export const timeBlockBegin: number = 9; // 予約可能-開始時間
export const timeBlockEnd: number = 21;  // 予約可能-終了時間

//「：」より後の文字がスケジュールテーブルに表示されます
const rooms: roomsType = [
    { room: '会議室A(大) ※奥：4F-A' },
    { room: '会議室B(小) ※手前：4F-B' },
    { room: 'フリースペース：7F' }
];
export const roomsAtom = atom<roomsType>(rooms);
