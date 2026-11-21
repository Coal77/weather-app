import "./styles.css";
import { fetchWeather, processWeather } from "./api.js";
import { renderCurrent, renderDetails, renderHours, renderWeek } from "./ui.js";

const apiKey = process.env.VISUAL_CROSSING_API_KEY;

async function main(city) {
    try {
        const data = await fetchWeather(city, apiKey);
        const weather = processWeather(data);
        
        //* Render the hero ui
        renderCurrent(weather.current);
        renderDetails(weather.current);
        renderHours(weather.hours);
        renderWeek(weather.weeklyData, weather.weekRange);
        
    } catch (err) {
        console.error("Error!", err);
    }
}

//* search feature
const input = document.querySelector("#location");
const form = document.querySelector(".search");

const defaultPlaceholder = input.placeholder;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (city === "") {
        form.classList.add("is-invalid");
        input.placeholder = "Please enter a city.";
        return;
    }

    form.classList.remove("is-invalid")

    main(city);
});

input.addEventListener("input", () => {
    form.classList.remove("is-invalid");
    input.placeholder = defaultPlaceholder;
})

main("London");
