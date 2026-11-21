import { factoryElem } from "./factory.js";
import { getIcon } from "./icon.js";

function renderCurrent(current) {
    const city = document.querySelector(".city");
    city.textContent = current.cityName;

    const date = document.querySelector(".date");
    const rawDate = new Date(`${current.date}T12:00:00`);
    const dateText = rawDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    date.textContent = dateText;

    const icon = document.querySelector(".current-icon");
    icon.textContent = getIcon(current.icon);

    const currentTemp = document.querySelector(".temp-value");
    currentTemp.textContent = Math.round(current.temp);

    const condition = document.querySelector(".conditions");
    condition.textContent = current.conditions;

    const range = document.querySelector(".range");
    range.textContent = `High ${Math.round(current.highTemp)}°    Low ${Math.round(current.lowTemp)}°    Feels like ${Math.round(current.feelsLike)}°`;
}

function renderDetails(current) {
    const items = [
        { id: "humidity", text: `${Math.round(current.humidity)}%` },
        { id: "wind", text: `${Math.round(current.wind)} km/h` },
        { id: "rain-chance", text: `${Math.round(current.rainChance)}%` },
        { id: "uv-index", text: Math.round(current.uv) },
        { id: "sunrise", text: current.sunrise.slice(0, 5) },
        { id: "sunset", text: current.sunset.slice(0, 5) },
    ];

    for (const item of items) {
        const field = document.querySelector(`#${item.id}`);
        field.textContent = item.text;
    }
}

function renderHours(hourlyStat) {
    const hoursContainer = document.querySelector(".hourly");
    hoursContainer.replaceChildren();

    for (const [ index, hourdata ] of hourlyStat.entries()) {
        const li = factoryElem("li", index === 0 ? "hour is-now" : "hour", "");
        const time = factoryElem("span", "hour-time", hourdata.time.slice(0, 5));
        const icon = factoryElem("span", "hour-icon", getIcon(hourdata.icon));
        const temp = factoryElem("span", "hour-temp", hourdata.temp + "°");

        li.append(time, icon, temp);
        hoursContainer.appendChild(li);
    }
}

function renderWeek(weeklyStat, weekRange) {
    const weekContainer = document.querySelector(".week");
    weekContainer.replaceChildren();

    const min = weekRange.min;
    const max = weekRange.max;
    const range = max - min !== 0 ? max - min : 1;

    for (const [index, weeklyData] of weeklyStat.entries()) {
        const li = factoryElem("li", "day", "");

        const rawDay = new Date(`${weeklyData.day}T12:00:00`);
        const processedDay = rawDay.toLocaleDateString("en-GB", { weekday: "short" });

        const day = factoryElem("span", "day-name", index === 0 ? "Today" : processedDay);
        const icon = factoryElem("span", "day-icon", getIcon(weeklyData.icon));
        const lowTemp = factoryElem("span", "day-low", `${Math.round(weeklyData.lowTemp)}°`);
        const highTemp = factoryElem("span", "day-high", `${Math.round(weeklyData.highTemp)}°`);
        const bar = factoryElem("span", "bar", "");
        const barFill = factoryElem("span", "bar-fill", "");

        const start = ((weeklyData.lowTemp - min) / range) * 100;
        const end = ((weeklyData.highTemp - min) / range) * 100;
        barFill.style.setProperty("--start", `${start}%`);
        barFill.style.setProperty("--end", `${end}%`);

        bar.appendChild(barFill);
        li.append(day, icon, lowTemp, bar, highTemp);
        weekContainer.appendChild(li);
    }
}
export { renderCurrent, renderDetails, renderHours, renderWeek };