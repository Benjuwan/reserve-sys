import { memo } from "react";

type roomType = { room: string };
type roomsType = roomType[];

function Rooms() {
    const roomLists: roomsType = [{ room: '2F' }, { room: '3F' }, { room: '4F' }];

    const begin: number = 9;
    const end: number = 20;
    const timeBlocks: number[] = [];
    for (let i = begin; i <= end; i++) timeBlocks.push(i);

    return (
        <section>
            <h2>Rooms</h2>
            {roomLists.map((room, i) => (
                <div>
                    <p key={i}>{room.room}</p>
                    <ul style={{ 'display': 'flex', 'listStyle': 'none' }}>
                        {timeBlocks.map(timeBlock => (
                            <li key={timeBlock}>,{timeBlock}</li>
                        ))}
                    </ul>
                </div>
            ))}

        </section>
    );
}

export default memo(Rooms);