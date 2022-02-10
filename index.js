import L from 'leaflet';
import myIcons from 'leaflet/dist/images/marker-icon.png'


let input = document.querySelector('.search-bar__input');
const title = document.querySelector('#adress')
const btn = document.querySelector('.search-bar__btn');

const ip = document.querySelector('#ip');
const location = document.querySelector('#location');
const isp = document.querySelector('#isp');
const timezone = document.querySelector('.timezone');

const map = L.map('map').setView([51.505, -0.09], 13);
const myIcon = L.icon({
    iconUrl: myIcons,
    iconSize: [38, 55],
    
});


window.onload = getMeLocation;







L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2lyc2huZXIiLCJhIjoiY2t6Y205M2ZuMjExODJubnhvYzI0eWd4NyJ9.e4tAij-IpI5vTVuzfdlZ3g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2lyc2huZXIiLCJhIjoiY2t6Y205M2ZuMjExODJubnhvYzI0eWd4NyJ9.e4tAij-IpI5vTVuzfdlZ3g'
}).addTo(map);



btn.addEventListener('click', getData);

function getData() {
   

    // нужна праверка валидности вводимых данных
    if (validatIp(input.value, title)) {
        getLocation (input.value);
        
    }
    
}

async function getLocation (ip) {
    let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qhYBMWTdwukpBDyJA9hZjssbQQ7Bm&ipAddress=${ip}`);
    let data = await response.json();
    setInfo(data)
    
}

async function getMeLocation () {
    let response = await fetch('https://ipapi.co/json/');
    let data = await response.json();

    console.log(data);
    print(data)
    
}
function print(data) {
    console.log(data)
    title.innerHTML = `вы сейчас здесь : ${data.city}, ${data.region}, Ваш ip : ${data.ip} `;
         
    
    ip.innerHTML = data.ip;
    location.innerHTML = `${data.region} ${data.city}`
    timezone.innerHTML = data.utc_offset;
    isp.innerHTML = data.version

    map.setView([data.latitude, data.longitude]);
    L.marker([data.latitude, data.longitude], {icon: myIcon}, ).addTo(map);
}

function setInfo(data) {
    title.innerHTML = 'Поиск по IP адресу';
   
    
    ip.innerHTML = data.ip;
    location.innerHTML = `${data.location.region} ${data.location.city}`
    timezone.innerHTML = data.location.timezone;
    isp.innerHTML = data.isp;

    map.setView([data.location.lat, data.location.lng]);
    L.marker([data.location.lat, data.location.lng], ).addTo(map);
   
};

function validatIp(ip, title) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
        return true
    } 
    title.firstChild.data = 'шото, братка, ты ввёл не так!'
    
    return false
}


// document.addEventListener('DOMContentLoaded', getMeLocation);



