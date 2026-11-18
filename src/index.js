const apiKey = process.env.VISUAL_CROSSING_API_KEY;

async function getTemperature(location, apiKey) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.currentConditions.temp;
}

async function main() {
    try {
        const temp = await getTemperature("new york", apiKey);
        console.log(temp);
    } catch (err) {
        console.log("Error!", err);
    }
}
main();
