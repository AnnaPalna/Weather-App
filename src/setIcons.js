let icon = document.querySelector('.weather-icon__img');

export function setIcons(elem) {
    if (elem === '01d') {
        icon.src = `../animated/day.svg`
    }
    if (elem === '01n') {
        icon.src = `../animated/night.svg`
    }
    if (elem === '02d') {
        icon.src = `../animated/cloudy-day-1.svg`;
    }
    if (elem === '02n') {
        icon.src = `../animated/cloudy-night-1.svg`;
    }
    if (elem === '03d' || elem === '03n') {
        icon.src = `../animated/cloudy.svg`;
    }
    if (elem === '04d' || elem === '04n') {
        icon.src = `../animated/rainy-1.svg`;
    }
    if (elem === '09d' || elem === '09n') {
        icon.src = `../animated/rainy-7.svg`;
    }
    if (elem === '10d' || elem === '10n') {
        icon.src = `../animated/rainy-3.svg`;
    }
    if (elem === '11d' || elem === '11n') {
        icon.src = `../animated/thunder.svg`;
    }
    if (elem === '13d' || elem === '13n') {
        icon.src = `../animated/snowy-6.svg`;
    }
    if (elem === '50d' || elem === '50n') {
        icon.src = `../animated/rainy-4.svg`;
    } 
}