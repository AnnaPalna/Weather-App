window.addEventListener('load', () => {
    let long;
    let lat;
    let apiKey = '3e297a51b01ad56e318392fec6716e11';
    let city = document.querySelector('.city-name__title');
    let time = document.querySelector('.city-name__time');
    let date = document.querySelector('.city-name__date');
    let temperature = document.querySelector('.temperature__value');
    let condition = document.querySelector('.conditions__value');
    let humidity = document.querySelector('.humidity__value');
    let wind = document.querySelector('.wind__value')
    let icon = document.querySelector('.weather-icon__img')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                //set dom elements from api

                //город
                city.textContent = data.name;
                //datetime
                //temprature
                //из кельвина в цельсии
                let temp = data.main.temp;
                temperature.textContent = Math.round(temp - 273.15) + 'С°';

                //влажность
                humidity.textContent = data.main.humidity + '%';
                //облачность
                condition.textContent = data.weather[0].description;

                //ветер
                wind.textContent = Math.floor(data.wind.speed) + 'm/s';

                //Отображение иконки в зависимости от значения поля в ответе апи
                //https://openweathermap.org/weather-conditions

                if (data.weather[0].icon === '04n') {
                    icon.src = `../animated/night.svg`
                }
            })
        });
    }
})

//Отображение иконок

function setIcons(elem) {
    if (elem === '01d') {
        elem = `../animated/day.svg`
    }
    if (elem === '01n') {
        elem = `../animated/night.svg`
    }
    if (elem === '02d') {
        elem = `../animated/cloudy-day-1.svg`;
    }
    if (elem === '02n') {
        elem = `../animated/cloudy-night-1.svg`;
    }
    if (elem === '03d' || elem === '03n') {
        elem = `../animated/cloudy.svg`;
    }
    if (elem === '04d' || elem === '04n') {
        elem = `../animated/rainy-1.svg`;
    }
    if (elem === '09d' || elem === '09n') {
        elem = `../animated/rainy-7.svg`;
    }
    if (elem === '10d' || elem === '10n') {
        elem = `../animated/rainy-3.svg`;
    }
    if (elem === '11d' || elem === '11n') {
        elem = `../animated/thunder.svg`;
    }
    if (elem === '13d' || elem === '13n') {
        elem = `../animated/snowy-6.svg`;
    }
    if (elem === '50d' || elem === '50n') {
        elem = `../animated/rainy-4.svg`;
    }
  
}
