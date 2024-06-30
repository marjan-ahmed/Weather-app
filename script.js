document.addEventListener('DOMContentLoaded', () => {
    let searchBtn = document.getElementById('search-button');
    let temperature = document.getElementById('temp');
    let inputBox = document.getElementById('city-input');
    let weather_img = document.querySelector('.weather-img')
    let city = document.getElementById('city-name');
    let country = document.getElementById('country-name');
    let weatherDescription = document.getElementById('weather-description');
    let humidity = document.getElementById('humidity-per');
    let windSpeed = document.getElementById('wind-per');
    let weatherInfo = document.querySelector('.weather-info');

    async function getWeather(cityName) {
        const apiKey = 'f2da66442fd742c54e3ab791df6bfa86';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            // if (!response.ok) {
            //     throw new Error(`City not found: ${cityName}`);
            // }
            const weatherData = await response.json();


            temperature.innerHTML = `${weatherData.main.temp}°C`;
            city.innerHTML = weatherData.name;
            country.innerHTML = weatherData.sys.country;
            weatherDescription.innerHTML = weatherData.weather[0].description;
            humidity.innerHTML = `${weatherData.main.humidity}%`;
            windSpeed.innerHTML = `${weatherData.wind.speed} km/h`;

            switch(weatherData.weather[0].main){
                case 'Clouds':
                    weather_img.src = "/assets/cloud.png";
                    break;
                case 'Clear':
                    weather_img.src = "/assets/clear.png";
                    break;
                case 'Rain':
                    weather_img.src = "/assets/rain.png";
                    break;
                case 'Mist':
                    weather_img.src = "/assets/mist.png";
                    break;
                case 'Snow':
                    weather_img.src = "/assets/snow.png";
                    break;
            }

            weatherInfo.style.display = 'block';

        } catch (error) {
            console.error(error);
            weather_img.src = "/assets/404.png";
            temperature.innerHTML = 'N/A';
            city.innerHTML = 'City not found';
            country.innerHTML = '';
            weatherDescription.innerHTML = '';
            humidity.innerHTML = '';
            windSpeed.innerHTML = '';
            weatherIcon.src = '';
            weatherInfo.style.display = 'none';
        }

    }

    function handleSearch() {
        getWeather(inputBox.value);
    }

    searchBtn.addEventListener('click', handleSearch);

    inputBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});
