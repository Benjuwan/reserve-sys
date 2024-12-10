import { ChangeEvent } from "react";
import { timeBlockBegin, timeBlockEnd } from "../components/TimeTable";

export const useCheckTimeBlockEntryForm = () => {
    const checkTimeBlockEntryForm: (e: ChangeEvent<HTMLInputElement>) => boolean = (e: ChangeEvent<HTMLInputElement>) => {
        let isValidateTime: boolean = false;
        const idAttrStr: string = e.target.id;
        const valueStr: string = e.target.value;
        if (idAttrStr === 'startTime') {
            if (parseInt(valueStr) < timeBlockBegin) {
                alert(`「${timeBlockBegin}時」以降の時間帯で指定してください`);
                isValidateTime = true;
            }
        } else {
            if (parseInt(valueStr) > timeBlockEnd) {
                alert(`「${timeBlockEnd}時」以前の時間帯で指定してください`);
                isValidateTime = true;
            }
        }

        return isValidateTime;
    }

    return { checkTimeBlockEntryForm }
}