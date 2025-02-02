let latt, long, weather;
let riseDiv = document.querySelector('.srise');
let setDiv = document.querySelector('.sset');
let humidDiv =  document.querySelector('.humid');
let windDiv =  document.querySelector('.wind-speed');
let tempDiv = document.querySelector('.temp');
let loc_heading = document.querySelector('.location-heading');
let weatherPara = document.querySelector('.weather-info');
let weather_img = document.querySelector('.weather-symbol');
let bgvid = document.querySelector('.bgvid');

const geoCode = async() => {
    let loc = document.querySelector('.loc input');
    let state = document.querySelector('.state input');
    loc_heading.innerText = (loc.value) + ', ' + state.value;
    let geo_key = '66a0c1671a13d634910942eakac44e3';
    let geo_api = `https://geocode.maps.co/search?q=${loc.value} ${state.value}&api_key=${geo_key}`;

    let response = await fetch(geo_api);
    let data = await response.json();
    latt = data[0].lat;
    long = data[0].lon;
    await weather_app();
    await weather_icon_change();
}

const weather_app = async() => {
    let weather_key = '588667189f67f789b65877c440714add';
    let weather_api = 'https://api.openweathermap.org/data/2.5/weather?';
    const url = `${weather_api}lat=${latt}&lon=${long}&appid=${weather_key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    let temp = data.main.temp;
    tempDiv.innerText = temp;

    let humidity = data.main.humidity;
    humidDiv.innerText = humidity + '%';
    
    let feels_like = data.main.feels_like;
    weather = data.weather[0].main;
    weatherPara.innerText = weather + ', Feels like ' + feels_like;

    let sunRise = data.sys.sunrise;
    let ist_sunrise = time_converter(sunRise);
    riseDiv.innerText = ist_sunrise + ' am';
    
    let sunSet = data.sys.sunset;
    let ist_sunset = time_converter(sunSet);
    setDiv.innerText = ist_sunset + ' pm';

    let wind = data.wind.speed;
    windDiv.innerText = wind + ' m/s';
}

const time_converter = (initTime) => {
    time = initTime * 1000;
    const date = new Date(time);
    let hrs = date.getHours().toString();
    let min = date.getMinutes().toString();
    return hrs + ':' +  min;
}

const weather_icon_change = () => {
    switch (weather) {
        case 'Sun':
            weather_img.src = 'sun-removebg-preview.png';
            bgvid.src = 'sunny.mp4';
            break;
        case 'Rain':
            weather_img.src = 'rain-removebg-preview.png';    
            bgvid.src = 'rain.mp4';
            break;
        case 'Clouds':
            weather_img.src = 'cloudy-removebg-preview.png';
            bgvid.src = 'cloudy.mp4';
            break;
        case 'Mist':
        case 'Fog': 
            weather_img.src = 'fog-removebg-preview.png';    
            bgvid.src = 'mist.mp4';
            break;
        default:
            weather_img.src = 'fog-removebg-preview.png';    
            bgvid.src = 'mist.mp4';
            break;
    }
}

let btn = document.querySelector('.sub');
btn.addEventListener('click',(evt) => {
    evt.preventDefault();
    geoCode();
})

window.addEventListener('load',() => {
    geoCode();
})