let monthLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export const setMonthLabel = (obj = []) => {
    monthLabel = obj;   
}

export const getMonthLabel = (index) => {
    return monthLabel[index - 1];
}

export const getMonthLabels = () => monthLabel;