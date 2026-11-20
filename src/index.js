import "./styles.css";
import { fetchWeather, processWeather } from "./api.js";
import { renderCurrent, renderDetails, renderHours } from "./ui.js";

const apiKey = process.env.VISUAL_CROSSING_API_KEY;

async function main() {
    try {
        const data = await fetchWeather("lagos", apiKey);
        console.log(processWeather(data));
        
        //* Render the hero ui
        const weather = processWeather(data);
        renderCurrent(weather.current);
        renderDetails(weather.current);
        renderHours(weather.hours);
        
    } catch (err) {
        console.error("Error!", err);
    }
}
main();
