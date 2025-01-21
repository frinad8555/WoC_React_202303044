const cityInp = document.querySelector('.inpBox');
const search = document.querySelector('.subBtn');
const api = 'd9bdef27b39c0442b96c3c38717bab53';
const notfound = document.querySelector('.notfound');
const searchsection = document.querySelector('.searchsec');
const info = document.querySelector('.info');
const citytxt = document.querySelector('.citytxt');
const temptxt = document.querySelector('.temp');
const condtxt = document.querySelector('.cond');
const datetxt = document.querySelector('.curdate');
const humidtxt = document.querySelector('.humidityvalue');
const windtxt = document.querySelector('.windvalue');
const summaryimg = document.querySelector('.imgWeather');
const forecastCont = document.querySelector('.forecastContainer');


search.addEventListener('click', () => {
    if (cityInp.value.trim() != '') {
        updateWeather(cityInp.value);
        cityInp.value = '';
        cityInp.blur();
    }
})

cityInp.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInp.value.trim() != '') {
        updateWeather(cityInp.value);
        cityInp.value = '';
        cityInp.blur();
    }
})

function getDate() {
    const currentDate = new Date();
    const choice = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', choice);
}

function getIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    else if (id <= 321) return 'drizzle.svg';
    else if (id <= 531) return 'rain.svg';
    else if (id <= 622) return 'snow.svg';
    else if (id <= 781) return 'atmosphere.svg';
    else if (id <= 800) return 'clear.svg';
    else return 'clouds.svg';

}

async function getData(mode, city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/${mode}?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(apiurl);
    return response.json();
}

async function updateWeather(city) {
    const weatherData = await getData('weather', city);
    if (weatherData.cod != 200) {
        showDisplaySection(notfound);
        return;
    }
    console.log(weatherData);

    const {
        name: cityname,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    citytxt.textContent = cityname;
    temptxt.textContent = Math.round(temp) + ' °C';
    condtxt.textContent = main;
    windtxt.textContent = speed + ' m/s';
    humidtxt.textContent = humidity + '%';
    datetxt.textContent = getDate();
    summaryimg.src = `weather/${getIcon(id)}`;

    await updateForecast(city);
    showDisplaySection(info);
}

async function updateForecast(city) {
    const forecast = await getData('forecast', city);

    const timetaken = '12:00:00';
    const today = new Date().toISOString().split('T')[0];
    forecastCont.innerHTML = '';
    forecast.list.forEach(forecast1 => {
        if (forecast1.dt_txt.includes(timetaken) && !forecast1.dt_txt.includes(today)) {
            updateForecastTxt(forecast1);
        }
    })
    console.log(forecast);
}

function updateForecastTxt(data) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = data;

    const date1 = new Date(date);
    const datechoice = {
        day: '2-digit',
        month: 'short'
    };

    const dateres = date1.toLocaleDateString('en-GB', datechoice);
    const foreitem = `
        <div class="forecast">
            <h5 class="forecastdate regular">
                ${dateres}
            </h5>
            <img src="weather/${getIcon(id)}" class="forecastimg">
            <h5 class="forecasttemp">${Math.round(temp)} °C</h5>
        </div>
    `

    forecastCont.insertAdjacentHTML('beforeend', foreitem)
}

function showDisplaySection(section) {
    [info, searchsection, notfound].forEach(section => section.style.display = 'none');
    section.style.display = 'flex';
}