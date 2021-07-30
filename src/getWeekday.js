export function getDayOfTheWeek(elem) {
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"];
    let n = elem.getDay();
    return days[n];
}