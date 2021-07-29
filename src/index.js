import {setIcons} from '../src/setIcons';
import {getDayOfTheWeek} from '../src/getDateAndTime';

let apiKey = '3e297a51b01ad56e318392fec6716e11';
let city = document.querySelector('.city-name__title');
let time = document.querySelector('.city-name__time');
let weekDay = document.querySelector('.city-name__date');
let temperature = document.querySelector('.temperature__value');
let condition = document.querySelector('.conditions__value');
let humidity = document.querySelector('.humidity__value');
let wind = document.querySelector('.wind__value')
let icon = document.querySelector('.weather-icon__img');    

function updateWeather (data) {
  //destructure arguments
  const { main, weather, wind } = data;
//   console.log(data);

  //update temp, wind etc
  city.innerHTML = data.name;
  //temprature
  //из кельвина в цельсии
  let temp = main.temp;
  temperature.textContent = Math.round(temp - 273.15) + "С°";
  //влажность
  humidity.textContent = main.humidity + "%";
  //облачность
  condition.textContent = weather[0].description;
  //ветер
  wind.textContent = Math.floor(wind.speed) + "m/s";
}


window.addEventListener('load', () => {
    let long;
    let lat;

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
                updateWeather(data);
        
                //смена иконки погоды

                let elem = data.weather[0].icon;
                console.log(elem)
                setIcons(elem);

                //получение даты 
                let day = new Date();

                //отобразить время
                let str = day.toLocaleTimeString('en-US');
                
                time.textContent = str;
                //отобразить день недели
                weekDay.textContent = getDayOfTheWeek(day);    
            })
        });
    }
})


let input = document.querySelector('.search-form__input');
let btn = document.querySelector('.search-form__button');

//Поиск города по названию
btn.addEventListener('click', (event) => {
    event.preventDefault();

    //объявление города поиска
    let searchCity = input.value;

    //апи
    let apiKey = '3e297a51b01ad56e318392fec6716e11';
    let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    //сохранение города в local storage
    
    //определение элементов dom
    let city = document.querySelector('.city-name__title');

    //
    localStorage.setItem('city', searchCity);
    // console.log(localStorage.getItem('city'));
    //очищение инпута
    input.value = ''


    if (searchCity) {
        fetch(cityApi)
        .then(response => {
            if (!response.ok) {
                throw Error(`is not ok: ` + response.status);
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data);

            //add icon
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

            //время в формате AM/PM
            let str = utcTime.toLocaleTimeString('en-US');
            // str = str.substring(str.indexOf(':') + 2, str.indexOf(':') + 4)
            time.textContent = str;

            weekDay.textContent = getDayOfTheWeek(utcTime); 
        })
    }
})