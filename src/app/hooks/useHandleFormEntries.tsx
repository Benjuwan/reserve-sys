import { ChangeEvent } from "react";

type handleFormEntriesType = <T>(
    targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, targetFormEntries: T,
    setEntries: React.Dispatch<React.SetStateAction<T>>,
    addSpecificFeatures?: string
) => void

export const useHandleFormEntries = () => {
    /* <T>：ジェネリクスで任意の型を指定 */
    const handleFormEntries: handleFormEntriesType = function <T>(
        targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        targetFormEntries: T,
        setEntries: React.Dispatch<React.SetStateAction<T>>,
        addSpecificFeatures?: string
    ): void {
        const type: string = targetElm.currentTarget.id;
        let value: string | number | boolean = targetElm.currentTarget.value;

        if (addSpecificFeatures === 'compare') {
            if (isNaN(Number(value))) return; // 数値以外の場合は早期リターンで処理終了
            const compareSpecificFeatureValue: string | undefined = _compareSpecificFeature(type, value);
            value = compareSpecificFeatureValue !== undefined ? compareSpecificFeatureValue : value; // 数値以外の入力値は''（空文字）で返却
        }

        if (addSpecificFeatures === 'korekau') {
            /* 「個数」項目 */
            if (type === 'itemNumber') {
                if (isNaN(Number(value)) || Number(value) > 99) return;
            }
            const korekauSpecificFeatureValue: boolean | undefined = _korekauSpecificFeature(type, targetElm);
            value = korekauSpecificFeatureValue !== undefined ? korekauSpecificFeatureValue : value;
        }

        const newEntries: T = {
            ...targetFormEntries,
            [type]: value
        }
        setEntries((_prevEntries) => newEntries);
    }

    /* 商品比較機能において別途追加する関数 */
    const _compareSpecificFeature: (type: string, value: string) => string | undefined = (type: string, value: string) => {
        if (type === 'amount' || 'price') {
            return value = value;
        }
    }

    /* 買うものリスト機能において別途追加する関数 */
    const _korekauSpecificFeature: (type: string, targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => boolean | undefined = (
        type: string,
        targetElm: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        /* 「すぐ買う」項目かつ input 要素かどうかを判定 */
        if (type === 'itemPriority' && targetElm.currentTarget instanceof HTMLInputElement) {
            return targetElm.currentTarget.checked; // Bool：true/false
        }
    }

    return { handleFormEntries }
}