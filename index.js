const search = document.getElementById('placeSearch');
const findButton = document.getElementById('findButton');
const wether = document.getElementById('wether');
const place = document.getElementById('place');
const temperature = document.getElementById('temperatureInC');
const currentDate = document.getElementById('currentDate');
const monthCollection = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayCollection = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const section = document.getElementsByClassName("section")[0];

const api = 'https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=';

async function fetchData(url) {
    const response = await (await fetch(url)).json();
    place.innerHTML = response.location.name;
    wether.innerHTML = response.current.condition.text;
    temperature.innerHTML = ` ${response.current.temp_c}&deg`;
    const d = new Date(response.location.localtime);
    let day = d.getDay()
    let date = d.getDate()
    let month = d.getMonth()
    currentDate.innerHTML = `${dayCollection[day]}, ${date} ${monthCollection[month]}`;
    let rainSun = (response.current.condition.text).toLowerCase();
    if (d.getHours() > 18 || d.getHours() < 5) {
        section.classList.remove(section.classList[1]);
        section.classList.add('night-section');
    }
    else if (rainSun == "cloudy" || rainSun == "rainy" || rainSun == "light rain" || rainSun == "overcast" || rainSun == "thunder" || rainSun == "partly cloudy") {
        section.classList.remove(section.classList[1]);
        section.classList.add('rainy-section');
    }
}

findButton.addEventListener('click', (e) => {
    const query = search.value;
    const url = `${api}${query}&aqi=no`;
    fetchData(url);
})