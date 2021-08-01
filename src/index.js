import {setIcons} from '../src/setIcons';
import {getDayOfTheWeek} from './getWeekday';
import { getCurrentTime, formatTime } from './updateTime';

let apiKey = '3e297a51b01ad56e318392fec6716e11';
let city = document.querySelector('.city-name__title');
let time = document.querySelector('.city-name__time');
let weekDay = document.querySelector('.city-name__date');
let temperature = document.querySelector('.temperature__value');
let condition = document.querySelector('.conditions__value');
let humidity = document.querySelector('.humidity__value');
let wind = document.querySelector('.wind__value')
let input = document.querySelector('.search-form__input');
let btn = document.querySelector('.search-form__button'); 

/*Display weather conditions */

function updateWeather (data) {
  //destructure arguments
  const { main, weather, wind } = data;
  //update temp, wind etc
  city.innerHTML = data.name;
  //temprature - from Kelvin to Celcius
  let temp = main.temp;
  temperature.textContent = Math.round(temp - 273.15) + "С°";
  //humidity
  humidity.textContent = main.humidity + "%";
  //cloudy
  condition.textContent = weather[0].description;
  //wind
  wind.textContent = Math.floor(wind.speed) + "m/s";
}

/*Getting data by current location */

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
                //change icon
                let elem = data.weather[0].icon;
                setIcons(elem);
                //get date
                let day = new Date();
                let str = formatTime(day);
                //show time
                time.textContent = str;
                weekDay.textContent = getDayOfTheWeek(day);    
            })
        });
    }
})


/*Getting data by city name */

btn.addEventListener('click', (event) => {
    event.preventDefault();
    //initialize a search city
    let searchCity = input.value;
    //api
    let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    //очищение инпута
    input.value = ''

    if (searchCity) {
        fetch(cityApi)
        .then(response => {
            if (!response.ok) {
                throw Error(`is not ok: ` + response.status) 
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data);

            //add icon
            let elem = data.weather[0].icon;
            console.log(elem)
            setIcons(elem);

            const currentDate = new Date();
            //utc
            const seconds = getCurrentTime(currentDate);
            let localSeconds = seconds + data.timezone;
            let utcTime = new Date(localSeconds*1000)
            //format to AM/PM
            let str = formatTime(utcTime);
            time.textContent = str;
            weekDay.textContent = getDayOfTheWeek(utcTime); 
        })
    }
})