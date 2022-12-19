# Weather API React App

This is a simple React app that uses the [OpenWeatherMap](https://openweathermap.org/api) API to display the current weather in a city.

## Live Demo

[https://weather-api-app-mu.vercel.app/](https://weather-api-app-mu.vercel.app/)

> Note: This app uses vite, react, typescript, and sass
>
> Note: This app also uses [OpenCage](https://opencagedata.com/api) geocoding API to get the country for the city

## Getting Started

- Clone the repo, and `cd` into it
- Create a `.env` file in the root directory and add your OpenWeather and OpenCage API keys to it like so:

```text
VITE_OPEN_WEATHER_API_KEY=YOUR_OPEN_WEATHER_API_KEY
VITE_OPEN_CAGE_API_KEY=YOUR_OPEN_CAGE_API_KEY
```

- Install the dependencies and run the dev server

```bash
npm install
npm run dev
```

- Open [localhost:3000](http://localhost:3000) to view the app in the browser

## Resources

- [OpenWeatherMap API](https://openweathermap.org/api)
- [OpenCage Geocoding API](https://opencagedata.com/api)
