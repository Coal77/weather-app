# Weather App

A weather app built with vanilla JavaScript, HTML and CSS, bundled with webpack. It uses the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) to show current conditions and forecasts for any city.

## Features

- Search for any city
- Current conditions: temperature, feels-like, conditions, high and low
- Hourly forecast for the next 24 hours
- Details: humidity, wind, chance of rain, UV index, sunrise and sunset
- 7-day forecast with a temperature range bar for each day
- Loading state and error messages for empty or failed searches
- Dates and hours shown in the searched city's local time

## Tech

- JavaScript (ES modules)
- HTML and CSS (grid and flexbox, CSS custom properties)
- npm and webpack
- Visual Crossing Timeline Weather API

## Getting started

1. Clone the repository and install dependencies:

    ```bash
    npm install
    ```

2. Get a free API key from Visual Crossing.

3. Create a `.env` file in the project root:

    ```
    VISUAL_CROSSING_API_KEY=your_key_here
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    Then open `http://localhost:8080`.

## Project structure

```
src/
    index.html     page markup
    index.js       entry point: search form, loading and error handling
    api.js         fetchWeather (API request) and processWeather (reshapes the response)
    ui.js          render functions for each section of the page
    icons.js       maps Visual Crossing icon names to emoji
    styles.css     all styling
```

## How it works

1. `fetchWeather` requests the forecast and throws a readable error if the response is not OK.
2. `processWeather` reduces the large API response to only what the UI needs: the city, current conditions, the next 24 hours, 7 days of data, and the week's minimum and maximum temperature.
3. The render functions in `ui.js` fill in each section. The weekly bars use the week's minimum and maximum to place each day's range on a shared scale.

## Future improvements

- **°C/°F toggle.** Re-fetch with `unitGroup=us` and switch the unit labels (for example km/h to mph).
- **SVG icons.** Replace the emoji with an SVG icon set for a consistent look across operating systems.

## Notes

- The API key is bundled into the client-side JavaScript, so anyone can read it in the browser. Keep `.env` out of version control, and use a backend proxy if you ever deploy this publicly.