async function fetchWeather(location, apiKey) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url);
    if(!response.ok) {
        const body = await response.text()
        throw new Error(`Request failed with status ${response.status}: ${body}`);
    }

    return response.json();
}

function processWeather(data) {
    const cityName = data.resolvedAddress;
    
    const currentWeather = {
        temp: data.currentConditions.temp,
        feelsLike: data.currentConditions.feelslike,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        humidity: data.currentConditions.humidity,
        wind: data.currentConditions.windspeed,
        rainChance: data.currentConditions.precipprob,
        uv: data.currentConditions.uvindex,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        highTemp: data.days[0].tempmax,
        lowTemp: data.days[0].tempmin,
    };

    const currentHour = parseInt(data.currentConditions.datetime, 10);

    const hourlyWeather = data.days
        .slice(0, 2)
        .flatMap((day) => day.hours)
        .slice(currentHour, currentHour + 24)
        .map((hour) => ({
            time: hour.datetime,
            icon: hour.icon,
            temp: hour.temp,
        }));

    const weeklyWeather = data.days.slice(0, 7).map((day) => ({
        day: day.datetime,
        icon: day.icon,
        lowTemp: day.tempmin,
        highTemp: day.tempmax,
    }));

    const weekRange = {
        min: Math.min(...weeklyWeather.map((day) => day.lowTemp)),
        max: Math.max(...weeklyWeather.map((day) => day.highTemp)),
    };

    return {
        city: cityName,
        current: currentWeather,
        hours: hourlyWeather,
        weeklyData: weeklyWeather,
        weekRange: weekRange,
    };
}

export { fetchWeather, processWeather }