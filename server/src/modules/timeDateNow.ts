

export function timeDateNow(): string {
    const now = new Date();
    const hours = now.getHours();

    // Для docker
    const myHours = hours + 3;

    const stringMyHours = myHours.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate();
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    return ` ч:м ${stringMyHours}:${minutes}, день ${day}, месяц ${month}, год ${year}`;
}