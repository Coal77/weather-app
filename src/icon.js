const ICONS = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    "cloudy": "☁️",
    "fog": "🌫️",
    "wind": "💨",
    "rain": "🌧️",
    "showers-day": "🌦️",
    "showers-night": "🌧️",
    "thunder-rain": "⛈️",
    "thunder-showers-day": "⛈️",
    "thunder-showers-night": "⛈️",
    "snow": "❄️",
    "snow-showers-day": "🌨️",
    "snow-showers-night": "🌨️",
};

function getIcon(name) {
    return ICONS[name] ?? "🌡️";
}

export { getIcon };