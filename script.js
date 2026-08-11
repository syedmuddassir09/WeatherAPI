const API_KEY = "18eac8f340d14dd68c8131321261108";

const form = document.getElementById("weatherForm");

const cityInput = document.getElementById("cityInput");

const loading = document.getElementById("loading");

const error = document.getElementById("error");

const weatherResult =
document.getElementById("weatherResult");

const weatherIcon =
document.getElementById("weatherIcon");

const cityName =
document.getElementById("cityName");

const countryName =
document.getElementById("countryName");

const temperature =
document.getElementById("temperature");

const condition =
document.getElementById("condition");

const feelsLike =
document.getElementById("feelsLike");

const humidity =
document.getElementById("humidity");

const wind =
document.getElementById("wind");

const updated =
document.getElementById("updated");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    hideError();

    weatherResult.classList.add("hidden");

    loading.classList.remove("hidden");

    try {

        const url =
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "Unable to find the city."
            );
        }

        displayWeather(data);

    } catch (err) {

        showError(
            err.message ||
            "Something went wrong. Please try again."
        );

    } finally {

        loading.classList.add("hidden");

    }

});

function displayWeather(data) {

    const location = data.location;

    const current = data.current;

    cityName.textContent =
        location.name;

    countryName.textContent =
        location.country;

    temperature.textContent =
        Math.round(current.temp_c);

    condition.textContent =
        current.condition.text;

    feelsLike.textContent =
        `${Math.round(current.feelslike_c)}°C`;

    humidity.textContent =
        `${current.humidity}%`;

    wind.textContent =
        `${current.wind_kph} km/h`;

    updated.textContent =
        current.last_updated;

    weatherIcon.textContent =
        getWeatherIcon(current.condition.text);

    weatherResult.classList.remove("hidden");

}

function getWeatherIcon(condition) {

    const text = condition.toLowerCase();

    if (
        text.includes("sunny") ||
        text.includes("clear")
    ) {
        return "☀️";
    }

    if (
        text.includes("cloud") ||
        text.includes("overcast")
    ) {
        return "☁️";
    }

    if (
        text.includes("rain") ||
        text.includes("drizzle")
    ) {
        return "🌧️";
    }

    if (
        text.includes("thunder")
    ) {
        return "⛈️";
    }

    if (
        text.includes("snow")
    ) {
        return "❄️";
    }

    if (
        text.includes("mist") ||
        text.includes("fog")
    ) {
        return "🌫️";
    }

    return "🌤️";

}

function showError(message) {

    error.textContent = message;

    error.classList.remove("hidden");

}

function hideError() {

    error.classList.add("hidden");

}
