export const useGetSpecificDay = () => {
    const getToday: () => number = () => {
        const theToday: number = new Date().getDate();
        return theToday;
    }

    const getThisLastDay: () => number = () => {
        // 当年当月の「0日目」を取得（翌月の0日＝当月の最終日）し、その日付（最終日）を出す 
        // 例：const thisLastDay = new Date(2025, 6, 0).getDate() 
        const theThisLastDay: number = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        return theThisLastDay;
    }

    return { getToday, getThisLastDay }
}