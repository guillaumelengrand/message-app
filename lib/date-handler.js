export function displayDate(date) {
    const dateTmp = new Date(date);
    const dateNow = new Date(Date.now());

    const hour = dateTmp.getHours();
    const min = dateTmp.getMinutes();

    const day = dateTmp.getDate();
    const month = dateTmp.getMonth() < 10 ? `0${dateTmp.getMonth() + 1}` : dateTmp.getMonth() + 1;
    const year = dateTmp.getFullYear();

    if (year === dateNow.getFullYear() && dateTmp.getMonth() === dateNow.getMonth() && day === dateNow.getDate()) {
        return `${hour}:${min}`;
    }

    return `${day}/${month}/${year}`;
}
