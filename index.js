const search = document.getElementById('placeSearch');
const findButton = document.getElementById('findButton');
const wether = document.getElementById('wether');
const place = document.getElementById('place');
const temperature = document.getElementById('temperatureInC');

const api = 'https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=';

async function fetchData(url) {
    const response = await(await fetch(url)).json();
    place.innerHTML=response.location.name;
    wether.innerHTML=response.current.condition.text;
    temperature.innerHTML=` ${response.current.temp_c}&deg`;
    console.log(response)
}

findButton.addEventListener('click', (e) => {
    const query = search.value;
    const url = `${api}${query}&aqi=no`;
    fetchData(url);
})