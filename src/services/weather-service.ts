import httpService from "./http-service";

const apiUrl = process.env.REACT_APP_API_URL as string;
const apiKey = process.env.REACT_APP_WEATHER_API


const locationsEndpoint = (city: string) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`;

export const getWeather = (city: string, days?: number) => {
  return httpService.get(
    apiUrl +
      (days ? `/weather/?city=${city}&days=${days}` : `/weather/?city=${city}`)
  );
};

export const fetchLocations = (params: string) => {
    let locationsUrl = locationsEndpoint(params);
    return httpService.get(locationsUrl)
}

export const weatherCompare = (payload: any) => {
  return httpService.post(apiUrl + '/compare-weather', payload);
}