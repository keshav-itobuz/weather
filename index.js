const search = document.getElementById('placeSearch');
const findButton = document.getElementById('findButton');
const wether = document.getElementById('wether');
const place = document.getElementById('place');
const temperature = document.getElementById('temperatureInC');
const currentDate = document.getElementById('currentDate');
const locationIcon = document.getElementsByClassName('location')[0];
const section = document.getElementsByClassName("section")[0];
const monthCollection = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayCollection = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const api = 'https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=';

function putData(response) {
    let {current , location} = response;
    if(!current || !location){
        alert("current or location object doesn't exists");
        return;
    }
    let {name ,localtime } = location;
    let {condition , temp_c} = current;
    place.innerText = name;
    wether.innerText = condition.text;
    temperature.innerHTML = `${temp_c}&deg`;
    const locationDate = new Date(localtime);
    let day = locationDate.getDay()
    let date = locationDate.getDate()
    let month = locationDate.getMonth()
    let rainSun = (condition.text).toLowerCase();

    currentDate.innerText = `${dayCollection[day]}, ${date} ${monthCollection[month]}`;

    if (rainSun === "cloudy" || rainSun === "rainy" || rainSun === "light rain" || rainSun === "overcast" || rainSun === "thunder" || rainSun === "partly cloudy" || rainSun === "mist") {
        section.classList.replace(section.classList[1], 'rainy-section');
    }

    else if (locationDate.getHours() >= 20 || locationDate.getHours() < 5) {
        section.classList.replace(section.classList[1], 'night-section');
    }

    else {
        section.classList.replace(section.classList[1], 'sunny-section');
    }
}

async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            alert("City doesn't exist");
        }
        const response = await res.json();
        putData(response);
        section.style.display = "block";
    }

    catch (e) {
        console.log(`Error : ${e}`)
        section.style.display = "none";
    }
}
(() => {
    section.style.display = "none";
    findButton.addEventListener('click', (e) => {
        const query = search.value;
        const url = `${api}${query}&aqi=no`;
        fetchData(url);
    })

    search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = search.value;
            const url = `${api}${query}&aqi=no`;
            fetchData(url);
        }
    })

})();
