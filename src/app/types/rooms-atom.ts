import { atom } from "jotai";
import { roomsType } from "../components/rooms/ts/roomsType";

const rooms: roomsType = [
    { room: '2F' },
    { room: '3F' },
    { room: '4F' }
];
export const roomsAtom = atom<roomsType>(rooms);