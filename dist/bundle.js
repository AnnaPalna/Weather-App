/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";let e=document.querySelector(".weather-icon__img");function t(t){"01d"===t&&(e.src="../animated/day.svg"),"01n"===t&&(e.src="../animated/night.svg"),"02d"===t&&(e.src="../animated/cloudy-day-1.svg"),"02n"===t&&(e.src="../animated/cloudy-night-1.svg"),"03d"!==t&&"03n"!==t||(e.src="../animated/cloudy.svg"),"04d"!==t&&"04n"!==t||(e.src="../animated/rainy-1.svg"),"09d"!==t&&"09n"!==t||(e.src="../animated/rainy-7.svg"),"10d"!==t&&"10n"!==t||(e.src="../animated/rainy-3.svg"),"11d"!==t&&"11n"!==t||(e.src="../animated/thunder.svg"),"13d"!==t&&"13n"!==t||(e.src="../animated/snowy-6.svg"),"50d"!==t&&"50n"!==t||(e.src="../animated/rainy-4.svg")}let n=document.querySelector(".temperature__value"),o=document.querySelector(".conditions__value"),a=document.querySelector(".humidity__value"),r=document.querySelector(".wind__value");window.addEventListener("load",(()=>{let e,n,o=document.querySelector(".city-name__title"),a=document.querySelector(".city-name__time"),r=document.querySelector(".city-name__date"),c=document.querySelector(".temperature__value"),d=document.querySelector(".conditions__value"),i=document.querySelector(".humidity__value"),l=document.querySelector(".wind__value");document.querySelector(".weather-icon__img"),navigator.geolocation&&navigator.geolocation.getCurrentPosition((u=>{e=u.coords.longitude,n=u.coords.latitude,fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${n}&lon=${e}&appid=3e297a51b01ad56e318392fec6716e11`).then((e=>e.json())).then((e=>{console.log(e),o.textContent=e.name;let n=e.main.temp;c.textContent=Math.round(n-273.15)+"С°",i.textContent=e.main.humidity+"%",d.textContent=e.weather[0].description,l.textContent=Math.floor(e.wind.speed)+"m/s";let u=e.weather[0].icon;console.log(u),t(u);let m=new Date,s=(m.getMonth(),m.toLocaleTimeString("en-US"));a.textContent=s;let y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],g=m.getDay();console.log(y[g]),r.textContent=y[g]}))}))}));let c=document.querySelector(".search-form__input"),d=document.querySelector(".search-form__button"),i=document.querySelector(".city-name__time"),l=document.querySelector(".city-name__date");d.addEventListener("click",(e=>{e.preventDefault();let d=c.value,u=`https://api.openweathermap.org/data/2.5/weather?q=${d}&appid=3e297a51b01ad56e318392fec6716e11`,m=document.querySelector(".city-name__title");fetch(u).then((e=>e.json())).catch((e=>alert(e))).then((e=>{console.log(e),localStorage.setItem("city",d),m.textContent=e.name;let c=e.weather[0].icon;console.log(c),t(c);const u=new Date;let s=u.getTimezoneOffset();u.setMinutes(u.getMinutes()+s);let y=Date.parse(u)/1e3+e.timezone,g=new Date(1e3*y);console.log(new Date(1e3*y));let h=g.toLocaleTimeString("en-US");i.textContent=h;let _=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],S=g.getDay();console.log(_[S]),l.textContent=_[S];let v=e.main.temp;n.textContent=Math.round(v-273.15)+"С°",a.textContent=e.main.humidity+"%",o.textContent=e.weather[0].description,r.textContent=Math.floor(e.wind.speed)+"m/s"})).catch((e=>alert(e)))}))})();