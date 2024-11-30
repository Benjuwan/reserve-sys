import { atom } from "jotai";
import { roomType } from "../components/rooms/ts/roomsType";

const rooms: roomType[] = [
    { room: '2F' },
    { room: '3F' },
    { room: '4F' }
];
export const roomsAtom = atom<roomType[]>(rooms);