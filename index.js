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
    place.innerText = response.location.name;
    wether.innerText = response.current.condition.text;
    temperature.innerHTML = `${response.current.temp_c}&deg`;
    const d = new Date(response.location.localtime);
    let day = d.getDay()
    let date = d.getDate()
    let month = d.getMonth()
    currentDate.innerText = `${dayCollection[day]}, ${date} ${monthCollection[month]}`;
    let rainSun = (response.current.condition.text).toLowerCase();
    if (rainSun == "cloudy" || rainSun == "rainy" || rainSun == "light rain" || rainSun == "overcast" || rainSun == "thunder" || rainSun == "partly cloudy" || rainSun == "mist") {
        section.classList.replace(section.classList[1], 'rainy-section');
    }
    else if (d.getHours() >= 20 || d.getHours() < 5) {
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
        locationIcon.style.display = "inline"

    }
    catch (e) {
        console.log(`Error : ${e}`)
        currentDate.innerText = "";
        place.innerText = "";
        wether.innerText = "";
        temperature.innerHTML = "";
        locationIcon.style.display = "none"
    }
}

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