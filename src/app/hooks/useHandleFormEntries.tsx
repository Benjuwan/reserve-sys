import { ChangeEvent } from "react";

type handleFormEntriesType = <T>(
    targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, targetFormEntries: T,
    setEntries: React.Dispatch<React.SetStateAction<T>>
) => void

export const useHandleFormEntries = () => {
    /* <T>：ジェネリクスで任意の型を指定 */
    const handleFormEntries: handleFormEntriesType = function <T>(
        targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        targetFormEntries: T,
        setEntries: React.Dispatch<React.SetStateAction<T>>
    ): void {
        const type: string = targetElm.currentTarget.id;
        let value: string | number | boolean = targetElm.currentTarget.value;

        const newEntries: T = {
            ...targetFormEntries,
            [type]: value
        }
        setEntries((_prevEntries) => newEntries);
    }

    return { handleFormEntries }
}