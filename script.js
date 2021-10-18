const API_URL_STOCKHOLM = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'
const API_URL_FORECAST_STOCKHOLM = 'https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const API_URL_ATHENS = 'https://api.openweathermap.org/data/2.5/weather?q=athens&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'
const API_URL_FORECAST_ATHENS = 'https://api.openweathermap.org/data/2.5/forecast?q=athens&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const API_URL_SAN_JOSE = 'https://api.openweathermap.org/data/2.5/weather?q=San%20Jose,CR&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'
const API_URL_FORECAST_SAN_JOSE = 'https://api.openweathermap.org/data/2.5/forecast?q=San%20Jose,CR&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const API_URL_SAINT_PETERSBURG = 'https://api.openweathermap.org/data/2.5/weather?q=Saint%20Petersburg&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'
const API_URL_FORECAST_SAINT_PETERSBURG = 'https://api.openweathermap.org/data/2.5/forecast?q=Saint%20Petersburg&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22'

const body = document.getElementById('body')
const weatherContainer = document.getElementById('weatherContainer')
const currentWeather = document.getElementById('currentWeatherSunrise')
const cityName = document.getElementById('cityName')
const weatherForecast = document.getElementById('weatherForecast')
const buttonCity = document.getElementById('button')
const image = document.getElementById('imageButton')

const API_KEY = '7678391e67f390dcfc1cc2681209fd22'

const searchButton = document.getElementById('citySearchButton')
const chosenCity = document.getElementById('chosenCity')

let city = 'Stockholm'

const getWeather = (data) => {
    // console.log(data)
    const timezoneOffset = new Date().getTimezoneOffset() * 60
    const sunrise = data.sys.sunrise + data.timezone + timezoneOffset
    const sunset = data.sys.sunset + data.timezone + timezoneOffset
    let description = data.weather[0].description

    // Conversion of the first letter in description to be a uppercase.
    description = description.charAt(0).toUpperCase() + description.slice(1)

    // Converter for sunrise & sunset time to wanted format
    const convert = (t) => {
        const dt = new Date(t * 1000)
        const hr = '0' + dt.getHours()
        const m = '0' + dt.getMinutes()
        return hr.substr(-2) + '.' + m.substr(-2)
      };

    const sunriseTime = convert(sunrise)
    const sunsetTime = convert(sunset)
    
    currentWeather.innerHTML += /*html*/ `
        <h3 class='current-statements'>${description} | ${Math.round(data.main.temp)}°</h3>
        <h3 class='current-statements'>Wind ${Math.round(data.wind.speed)} m/s</h3>
        <h3 class='current-statements'>Sunrise ${sunriseTime}</h3>
        <h3 class='current-statements'>Sunset ${sunsetTime}</h3>
    `
    
    const changeRecommendation = () => {
        body.classList.remove(...body.classList)
        if (data.weather[0].main === 'Clear') {
            cityName.innerHTML += /*html*/ `
                <img src='assets/icons/icon-sunny.svg' alt='Sunglasses'>
                <h1>Get your sunnies on. ${data.name} [${data.sys.country}] is looking rather great today.</h1>
            `
            body.classList.add('sunny')
            buttonCity.style.background = 'url("assets/buttons/button_sunny.svg")'
        } else if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
            cityName.innerHTML += /*html*/ `
                <img src='assets/icons/icon-umbrella.svg' alt='Umbrella'/>
                <h1>Don't forget your umbrella. It's wet in ${data.name} [${data.sys.country}] today.</h1>
            `
            body.classList.add('rainy')
            buttonCity.style.background =
                'url("assets/buttons/button_rain.svg")'
        } else if (data.weather[0].main === 'Clouds') {
            cityName.innerHTML += /*html*/ `
                <img src='assets/icons/icon-cloud.svg' alt='Clound'/>
                <h1>${data.name} [${data.sys.country}] is looking grey today. Do something fun to brighten it up!</h1>
            `
            body.classList.add('cloudy')
            buttonCity.style.background = 'url("assets/buttons/button_clouds.svg")'
        } else if (data.weather[0].main === 'Snow') {
            cityName.innerHTML += /*html*/ `
                <img src='assets/icons/icon-snowflake.svg' alt='Snowflake'/>
                <h1>Light a fire and get cozy. It's snowing in ${data.name} [${data.sys.country}] today.</h1>
            `
            body.classList.add('snow')
            buttonCity.style.background = 'url("assets/buttons/button_snow.svg")'
        } else {
            cityName.innerHTML += /*html*/ `
                <img src='assets/icons/icon-unpredictable.svg' alt='Unpredictable weather icon'/>
                <h1>Prepare for everything! ${data.name} [${data.sys.country}] is unpredictable today.</h1>
            `
            body.classList.add('unpredictable')
            buttonCity.style.background = 'url("assets/buttons/button_other.svg")'
        }
        description = description.charAt(0).toUpperCase() + description.slice(1)
    }
    changeRecommendation()
}

// WORK IN PROGRESS...

// const getForecast = (data) => {
//     const tempForecast = data.list.filter((item) =>
//         item.dt_txt.includes('12:00:00')
//     )

//     console.log(tempForecast);

//     const tempForecastFiveDays = tempForecast.map((listItem) => {
//         const dateVariable = new Date(listItem.dt * 1000).getDay()
//         const now = new Date().getDay()
//         const isToday = dateVariable === now
//         const arrayOfWeekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
//         const weekdayName = arrayOfWeekdays[dateVariable]
        // let maxTemp = 80
        // let minTemp = -80
        // let myDates = []

        // myDates.forEach((element) => {
        //     let weatherAt12 = data.list.filter((e) =>
        //         e.dt_txt.includes('${element} 12:00:00')
        //     );

        //     console.log(weatherAt12)

        //     let weatherDuringADay = data.list.filter((e) =>
        //         e.dt_txt.includes(element)
        //     );

        //     weatherDuringADay.forEach((e) => {
        //         if (e.main.temp_min < minTemp) {
        //             minTemp = Math.round(e.main.temp_min)
        //         } else if (e.main.temp_max > maxTemp) {
        //             maxTemp = Math.round(e.main.temp_max)
        //         }
        //     })
        // })

//         if (!isToday) {
//             weatherForecast.innerHTML += /*html*/ `
//                 <div class='week-wrap'>
//                     <div class='week-day'>
//                         <h1> ${weekdayName} </h1>
//                     </div>
//                     <div class='week-temp'>
//                         <div class='day-temp-max'>
//                             <h1>${Math.round(maxTemp)}°</h1>
//                         </div>
//                         <div class='day-temp-min'>
//                             <h1>${Math.round(minTemp)}°</h1>
//                         </div>
//                     </div>
//                 </div>
//             `
//         }
//     })
// }

const getForecast = (data) => {
    const tempForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
    ); // array

    const tempForecastFiveDays = tempForecast.map((listItem) => {
        // console.log(listItem.main.temp);
        const dateVariable = new Date(listItem.dt * 1000).getDay(); // gives us 2 as today is tuesday
        const now = new Date().getDay()
        const isToday = dateVariable === now
        const arrayOfWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        const weekdayName = arrayOfWeekdays[dateVariable]; //arrayofWeekdays[2]
        if (!isToday) {
            return (weatherForecast.innerHTML += /*html*/ `
                <div class="week-wrap-container">
                    <div class="week-wrap">
                        <div class="week-day">
                            <h1> ${weekdayName}</h1>
                        </div> 
                        <div class="week-temp">
                            <h1>${Math.round(listItem.main.temp)}°</h1>
                        </div>
                    </div>
                </div>
            `)
        };
    });
};


const fetchWeatherStockholm = () => {
    fetch(API_URL_STOCKHOLM)
        .then((response) => response.json())
        .then((data) => {
            getWeather(data)
            // console.log(data)
        })
    fetch(API_URL_FORECAST_STOCKHOLM)
        .then((response) => response.json())
        .then((data) => {
            getForecast(data)
        })
}

const fetchWeatherAthens = () => {
    fetch(API_URL_ATHENS)
        .then((response) => response.json())
        .then((data) => getWeather(data))
    fetch(API_URL_FORECAST_ATHENS)
        .then((response) => response.json())
        .then((data) => getForecast(data))
}

const fetchWeatherSanJose = () => {
    fetch(API_URL_SAN_JOSE)
        .then((response) => response.json())
        .then((data) => getWeather(data))
    fetch(API_URL_FORECAST_SAN_JOSE)
        .then((response) => response.json())
        .then((data) => getForecast(data))
}

const fetchWeatherSaintPetersburg = () => {
    fetch(API_URL_SAINT_PETERSBURG)
        .then((response) => response.json())
        .then((data) => getWeather(data))
    fetch(API_URL_FORECAST_SAINT_PETERSBURG)
        .then((response) => response.json())
        .then((data) => getForecast(data))
}

let click = 1

buttonCity.addEventListener('click', () => {
    if (click === 1) {
        fetchWeatherSaintPetersburg()
        currentWeather.innerHTML = ''
        cityName.innerHTML = ''
        weatherForecast.innerHTML = ''
        click = 2
    } else if (click === 2) {
        fetchWeatherAthens()
        currentWeather.innerHTML = ''
        cityName.innerHTML = ''
        weatherForecast.innerHTML = ''
        click = 3
    } else if (click === 3) {
        fetchWeatherSanJose()
        currentWeather.innerHTML = ''
        cityName.innerHTML = ''
        weatherForecast.innerHTML = ''
        click = 4
    } else {
        fetchWeatherStockholm()
        currentWeather.innerHTML = ''
        cityName.innerHTML = ''
        weatherForecast.innerHTML = ''
        click = 1
    }
})

const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            getWeather(data)
        })
        .catch(error => {
            console.error('Error: ', error)
            weatherForecast.innerHTML = /*html*/ `
                <div class="error-text">Ooops! Please try again.</div>
                <div class="search-instructions">If the city you searched for is not in the country you intended please submit the country code as well. For example, instead of writing <i>Melbourne</i> write <i>Melbourne, AU</i>.</div>
            `
        })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            getForecast(data)
        })
    currentWeather.innerHTML = ''
    cityName.innerHTML = ''
    weatherForecast.innerHTML = ''
}

const changeCity = () => {
    // console.log(chosenCity.value)
    city = chosenCity.value
    fetchWeather()
    chosenCity.value = ''
}

searchButton.addEventListener('click', () => {
    changeCity()
})

chosenCity.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        changeCity()
    }
})

// start display
fetchWeather()
