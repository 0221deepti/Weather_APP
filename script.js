

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '2bf2fb23c108c04e69234f2cff43bf3e';
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'Image/mysun.png';
                    break;
                case 'Rain':
                    image.src = 'Image/rain2.png';
                    break;
                case 'Wind':
                    image.src = 'Image/windy.png';
                    break;
                case 'Clouds':
                    image.src = 'Image/NoSun.png';
                    break;
                case 'Snow':
                    image.src = 'Image/snow.png';
                    break;
                case 'Haze':
                    image.src = 'Image/haze.png';
                    break;
                case 'Mist':
                    image.src = 'Image/mist.png';
                    break;
                default:
                    image.src = 'Image/Cloudy.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});

