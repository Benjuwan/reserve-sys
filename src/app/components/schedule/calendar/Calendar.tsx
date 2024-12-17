"use client"

import { memo, useEffect, useState } from "react";
import calendarStyle from "./styles/calendarStyle.module.css";
import todoStyle from "../todoItems/styles/todoStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";
import { useAtom } from "jotai";
import { isDesktopViewAtom } from "@/app/types/calendar-atom";
import PrevNextMonthBtns from "./PrevNextMonthBtns";
import Todo from "../todoItems/Todo";
import TodoList from "../todoItems/TodoList";
import TodoCtrlClosedBtn from "../todoItems/TodoCtrlClosedBtn";
import TodoCtrlOpenBtn from "../todoItems/TodoCtrlOpenBtn";
import { useGetMonthDays } from "./hooks/useGetMonthDays";

type todaySignal = {
    thisYear: number;
    thisMonth: number;
    today: number;
}

function Calendar() {
    const { getMonthDays } = useGetMonthDays();

    const [, setDesktopView] = useAtom(isDesktopViewAtom);

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);
    const [days, setDays] = useState<calendarItemType[]>([]);
    const [ctrlToday, setCtrlToday] = useState<todaySignal | null>(null);

    useEffect(() => {
        const today: todaySignal = {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth() + 1,
            today: new Date().getDate()
        }
        setCtrlToday(today);

        if (window.matchMedia("(min-width: 1025px)").matches) setDesktopView(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const jumpThisMonth: () => void = () => {
        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;
        setCtrlYear(thisYear);
        setCtrlMonth(thisMonth);
        getMonthDays(thisYear, thisMonth, setDays);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getMonthDays(ctrlYear, ctrlMonth, setDays);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlMonth]);

    return (
        <section className={calendarStyle.wrapper}>
            <h2>{ctrlYear}年{ctrlMonth}月</h2>
            <PrevNextMonthBtns props={{
                className: calendarStyle.btns,
                ctrlYear: ctrlYear,
                setCtrlYear: setCtrlYear,
                ctrlMonth: ctrlMonth,
                setCtrlMonth: setCtrlMonth
            }} />
            <button id={calendarStyle["jumpThisMonth"]} type="button" onClick={jumpThisMonth}>今月に移動</button>
            <ul className={calendarStyle.calendar}>
                {days.map(day => (
                    // カスタムデータ属性の指定は low-case でないと React から怒られる
                    <li key={`${day.year}/${day.month}/${day.day}`} data-daydate={day.dayDateNum} className={
                        (ctrlToday?.thisYear === day.year && ctrlToday.thisMonth === day.month && ctrlToday.today === day.day) ?
                            `${calendarStyle.todaySignal} ${calendarStyle.calendarLists}` :
                            `${calendarStyle.calendarLists}`
                    }>
                        <p>
                            {day.signalPrevNextMonth && <span>{day.month}/</span>}{day.day}
                        </p>
                        <p>{day.dayDate}</p>
                        {day.signalPrevNextMonth ? null :
                            <div className={`${todoStyle.todoView}`}>
                                <TodoCtrlOpenBtn />
                                <div className={`${todoStyle.todoCtrlElm}`}>
                                    <TodoCtrlClosedBtn />
                                    <p className={todoStyle.today}>{day.month}/{day.day}（{day.dayDate}）</p>
                                    <Todo todoID={`${day.year}/${day.month}/${day.day}`} />
                                </div>
                                <TodoList todoID={`${day.year}/${day.month}/${day.day}`} />
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default memo(Calendar);