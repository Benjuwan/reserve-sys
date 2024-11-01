import { SyntheticEvent, memo } from "react";
import todoStyle from "./styles/todoStyle.module.css";
import { useScrollTop } from "@/app/hooks/useScrollTop";
import { useViewTodoCtrl } from "./hooks/useViewTodoCtrl";

function TodoCtrlOpenBtn() {
    const { scrollTop } = useScrollTop();
    const { viewTodoCtrl } = useViewTodoCtrl();
    const handleOpenClosedBtnClicked: (btnEl: HTMLButtonElement) => void = (btnEl: HTMLButtonElement) => {
        viewTodoCtrl(btnEl);
        scrollTop();
    }

    return (
        <button className={`${todoStyle.openBtn} todoCtrlOpen`} onClick={(btnEl: SyntheticEvent<HTMLButtonElement>) => handleOpenClosedBtnClicked(btnEl.currentTarget)}>
            <span className="material-symbols-outlined">add_circle</span>
        </button>
    );
}

export default memo(TodoCtrlOpenBtn);