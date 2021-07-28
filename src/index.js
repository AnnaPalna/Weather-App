import {setIcons} from '../src/setIcons';

let temperature = document.querySelector('.temperature__value');
let condition = document.querySelector('.conditions__value');
let humidity = document.querySelector('.humidity__value');
let wind = document.querySelector('.wind__value')

window.addEventListener('load', () => {
    let long;
    let lat;
    let apiKey = '3e297a51b01ad56e318392fec6716e11';
    let city = document.querySelector('.city-name__title');
    let time = document.querySelector('.city-name__time');
    let weekDay = document.querySelector('.city-name__date');
    let temperature = document.querySelector('.temperature__value');
    let condition = document.querySelector('.conditions__value');
    let humidity = document.querySelector('.humidity__value');
    let wind = document.querySelector('.wind__value')
    let icon = document.querySelector('.weather-icon__img');

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

                //смена иконки погоды

                let elem = data.weather[0].icon;
                console.log(elem)
                setIcons(elem);


                //получение даты 
                let day = new Date();
                let month = day.getMonth();

                //отобразить время
                let str = day.toLocaleTimeString('en-US');
                time.textContent = str;
                //отобразить день недели
                let days = [
                    "Sunday", "Monday", "Tuesday", "Wednesday", 
                    "Thursday", "Friday", "Saturday"];
                let n = day.getDay();
                console.log(days[n]);
                weekDay.textContent = days[n];
                
                
            })
        });
    }
})


let input = document.querySelector('.search-form__input');
let btn = document.querySelector('.search-form__button');
let time = document.querySelector('.city-name__time');
let weekDay = document.querySelector('.city-name__date');


//Поиск города по названию
btn.addEventListener('click', (event) => {
    event.preventDefault();

    //объявление города поиска
    let searchCity = input.value;

    //апи
    let apiKey = '3e297a51b01ad56e318392fec6716e11';
    let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    //сохранение города в local storage
    
    localStorage.setItem('city', searchCity);


    //определение элементов dom
    let city = document.querySelector('.city-name__title');

    //
    console.log(localStorage.getItem('city'));
    //очищение инпута
    input.value = ''

    //запрос на сервер
    fetch(cityApi)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        //set dom elements from api
        city.textContent = data.name;

        //смена иконки погоды
        let elem = data.weather[0].icon;
        console.log(elem)
        setIcons(elem);

        //получение текущей даты
        const currentDate = new Date();
        let utc_offset = currentDate.getTimezoneOffset();
        //время в utc 
        currentDate.setMinutes(currentDate.getMinutes() + utc_offset);
        //перевод текущего времени utc в секунды
        const seconds = Date.parse(currentDate)/1000;
        //расчет текущего времени utc (+0) во время в выбранном городе(+timezone)
        let localSeconds = seconds + data.timezone;
        //перевод текущего времени в секундах в дату
        let utcTime = new Date(localSeconds*1000)
        console.log(new Date(localSeconds*1000));

        //время в формате AM/PM
        let str = utcTime.toLocaleTimeString('en-US');
        time.textContent = str;
        //data.timezone - сдвиг в секундах по utc

        //!! Чтобы узнать время в секундах местное нужно: ко времени UTC прибавать 
        //!! сдвиг в секундах по utc

        //Получение дня недели
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];
        let n = utcTime .getDay();
        console.log(days[n]);
        weekDay.textContent = days[n];

        //вывод погодных данных
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
        
})
})

//получение и отображение текущей даты
