import { memo } from "react";

export const timeBlockBegin: number = 9;
export const timeBlockEnd: number = 20;

function TimeBlocks() {
    const timeBlocks: number[] = [];
    for (let i = timeBlockBegin; i <= timeBlockEnd; i++) timeBlocks.push(i);

    return (
        <ul style={{ 'display': 'flex', 'listStyle': 'none' }}>
            {timeBlocks.map(timeBlock => (
                <li key={timeBlock}><span>{timeBlock}</span></li>
            ))}
        </ul>
    );
}

export default memo(TimeBlocks);