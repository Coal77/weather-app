import "./styles.css";
import { fetchWeather, processWeather } from "./api.js";
import { renderCurrent, renderDetails, renderHours, renderWeek } from "./ui.js";

const apiKey = process.env.VISUAL_CROSSING_API_KEY;

const form = document.querySelector(".search");
const input = document.querySelector("#location");
const button = form.querySelector("button");
const status = document.querySelector(".status");

function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
    status.hidden = message === "";
}

async function search(city) {
    form.classList.remove("is-invalid");
    setStatus("Loading...");
    button.disabled = true;

    try {
        const data = await fetchWeather(city, apiKey);
        const weather = processWeather(data);

        renderCurrent(weather.current);
        renderDetails(weather.current);
        renderHours(weather.hours);
        renderWeek(weather.weeklyData, weather.weekRange);

        setStatus("");
    } catch (err) {
        console.error("Error!", err);
        form.classList.add("is-invalid");
        setStatus(`Couldn't get weather for "${city}".`, true);
    } finally {
        button.disabled = false;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (city === "") {
        form.classList.add("is-invalid");
        setStatus("Please enter a city.", true);
        return;
    }

    search(city);
});

input.addEventListener("input", () => {
    form.classList.remove("is-invalid");
});

search(input.value.trim());