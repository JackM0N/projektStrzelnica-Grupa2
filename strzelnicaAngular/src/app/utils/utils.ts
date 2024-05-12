
// Function for checking if the supplied url is a valid image
export function isImageValid(url: string): boolean {
    return (url != null && url != '' && /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url));
}

export function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
}

export function convertStringDatetime(date: Date, time: String) {
    const dateTime = new Date(date);
    dateTime.setHours( Number(time.split(":")[0]) );
    dateTime.setMinutes( Number(time.split(":")[1]) );
    return dateTime;
}
