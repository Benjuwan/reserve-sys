import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";

function ViewCurrentTimeTableDay({ today, isLastWeek }: { today: number, isLastWeek: boolean }) {
    const pathName: string = usePathname();

    const thisMonth: number = useMemo(() => new Date().getMonth() + 1, []);

    return (
        <>
            {pathName.length === 1 &&
                <p suppressHydrationWarning={true}>- <b>{isLastWeek && today <= 7 ? thisMonth + 1 : thisMonth}/{today}</b> の予約内容（※7日後まで確認可能）</p>
            }
        </>
    );
}

export default memo(ViewCurrentTimeTableDay);