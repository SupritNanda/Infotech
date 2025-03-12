function getWeather() {
    const city = document.getElementById("locationInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current_weather=true&timezone=auto`;
    
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                throw new Error("City not found");
            }
            const { latitude, longitude } = data.results[0];
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
        })
        .then(response => response.json())
        .then(data => {
            const weather = data.current_weather;
            document.getElementById("weatherInfo").innerHTML = `
                <h2>${city}</h2>
                <p>Temperature: ${weather.temperature}°C</p>
                <p>Weather: ${weather.weathercode}</p>
                <p>Wind Speed: ${weather.windspeed} km/h</p>
            `;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        });
}
