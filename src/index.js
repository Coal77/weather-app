import "./styles.css";
import { fetchWeather, processWeather } from "./api.js";

const apiKey = process.env.VISUAL_CROSSING_API_KEY;

async function main() {
    try {
        const data = await fetchWeather("lagos", apiKey);
        console.log(processWeather(data));
        
    } catch (err) {
        console.log("Error!", err);
    }
}
main();
