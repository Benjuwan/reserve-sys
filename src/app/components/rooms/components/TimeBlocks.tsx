import { memo } from "react";

function TimeBlocks() {
    const begin: number = 9;
    const end: number = 20;
    const timeBlocks: number[] = [];
    for (let i = begin; i <= end; i++) timeBlocks.push(i);

    return (
        <ul style={{ 'display': 'flex', 'listStyle': 'none' }}>
            {timeBlocks.map(timeBlock => (
                <li key={timeBlock}><span>{timeBlock}</span></li>
            ))}
        </ul>
    );
}

export default memo(TimeBlocks);