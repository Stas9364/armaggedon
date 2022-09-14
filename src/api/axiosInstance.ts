import axios from 'axios';

const API_KEY = 'r3j0jxn3hgkbubUALxZo49hSMjMLqZiXn0PxtIsr';

export const asteroidsData = axios.create({
  baseURL: `https://api.nasa.gov/neo/rest/v1/neo/browse`,
});

export const pictureOfTheDay = axios.create({
  baseURL: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
});
