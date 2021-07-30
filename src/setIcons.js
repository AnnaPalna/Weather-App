let icon = document.querySelector('.weather-icon__img');
let content = document.querySelector('.main-content');

export function setIcons(elem) {
    if (elem === '01d') {
        icon.src = `../animated/day.svg`
        content.style.background = 'linear-gradient(to top left, powderblue, pink)'
    }
    if (elem === '01n') {
        icon.src = `../animated/night.svg`;
        content.style.background = 'linear-gradient(to right, #567599, #1f2e4b)';
        ;
    }
    if (elem === '02d') {
        icon.src = `../animated/cloudy-day-1.svg`;
        content.style.background = 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'
    }
    if (elem === '02n') {
        icon.src = `../animated/cloudy-night-1.svg`;
        content.style.background = 'linear-gradient(-225deg, #A8BFFF 0%, #884D80 100%)'
    }
    if (elem === '03d' || elem === '03n') {
        icon.src = `../animated/cloudy.svg`;
        content.style.background = 'linear-gradient(to top left, powderblue, pink)'
    }
    if (elem === '04d' || elem === '04n') {
        icon.src = `../animated/rainy-1.svg`;
        content.style.background = 'linear-gradient(45deg, rgb(185, 203, 199) 42%, rgb(52, 197, 201) 92%)'
    }
    if (elem === '09d' || elem === '09n') {
        icon.src = `../animated/rainy-7.svg`;
        content.style.background = 'linear-gradient(25deg, rgb(185, 203, 199) 15%, rgb(52, 197, 201) 92%)'
    }
    if (elem === '10d' || elem === '10n') {
        icon.src = `../animated/rainy-3.svg`;
        content.style.background = 'linear-gradient(45deg, rgb(185, 203, 199) 42%, rgb(52, 197, 201) 92%)'
    }
    if (elem === '11d' || elem === '11n') {
        icon.src = `../animated/thunder.svg`;
        content.style.background = 'linear-gradient(45deg, rgb(86, 43, 111) 35%, rgb(100, 127, 232) 83%, rgb(209, 243, 13) 100%)'
    }
    if (elem === '13d' || elem === '13n') {
        icon.src = `../animated/snowy-6.svg`;
        content.style.background = 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
    }
    if (elem === '50d' || elem === '50n') {
        icon.src = `../animated/rainy-4.svg`;
    } 
}