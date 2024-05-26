import { Track } from "../interfaces/track";

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

export function getFormattedDate(date: Date | undefined): string {
    if (!date) {
      return '-';
    }
    return date.toString();
}

export function getFormattedTime(time: string | undefined): string {
    if (!time) {
        return '-';
    }

    const formattedTime = time.split(":")[0] + ":" + time.split(":")[1];

    return formattedTime;
}

export function getPolishDayOfWeek(date: Date): string {
    if (!date) {
        return '-';
    }

    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
}

export function isPastDate(date: Date, time?: string): boolean {
    const currentDate = new Date();
    const comparisonDate = new Date(date);
    if (time) {
        comparisonDate.setHours(Number(time.split(":")[0]));
        comparisonDate.setMinutes(Number(time.split(":")[1]));
    }
    return comparisonDate < currentDate;
}

export function formatDateForInput(dateString: Date): string {
    const date2 = new Date(dateString);
    const year = date2.getFullYear();
    let month = (date2.getMonth() + 1).toString().padStart(2, '0');
    let day = date2.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatTrack(track: Track | undefined): string {
    if (!track) {
        return 'Undefined track';
    }
    if (!track.type) {
        return 'Undefined track type';
    }
    return track.type.name + " nr. " + track.id;
}
