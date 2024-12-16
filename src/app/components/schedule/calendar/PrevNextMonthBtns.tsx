import { memo } from "react";
import { useScrollTop } from "@/app/hooks/useScrollTop";

type btnsPropsType = {
    className: string;
    ctrlMonth: number;
    setCtrlMonth: React.Dispatch<React.SetStateAction<number>>;
    ctrlYear: number;
    setCtrlYear: React.Dispatch<React.SetStateAction<number>>;
}

const btnStyle: object = {
    'padding': '.5em 1em'
}

const btnIconStyle: object = {
    'verticalAlign': 'middle'
}

function PrevNextMonthBtns({ props }: { props: btnsPropsType }) {
    const { className, ctrlMonth, setCtrlMonth, setCtrlYear, ctrlYear } = props;

    const { scrollTop } = useScrollTop();

    const nextCalendarView: () => void = () => {
        if (ctrlMonth === 12) {
            setCtrlYear((_prevCtrlYear) => ctrlYear + 1);
            setCtrlMonth((_prevCtrlMonth) => 1);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth + 1);
        }

        scrollTop();
    }

    const prevCalendarView: () => void = () => {
        if (ctrlMonth === 1) {
            setCtrlYear((_prevCtrlYear) => ctrlYear - 1);
            setCtrlMonth((_prevCtrlMonth) => 12);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth - 1);
        }

        scrollTop();
    }

    return (
        <div className={className}>
            <button type="button" style={btnStyle} onClick={prevCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_before
            </span></button>
            <button type="button" style={btnStyle} onClick={nextCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_next
            </span></button>
        </div>
    );
}

export default memo(PrevNextMonthBtns);