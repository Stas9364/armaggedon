import {asteroidsData, pictureOfTheDay} from './axiosInstance';

const API_KEY = 'r3j0jxn3hgkbubUALxZo49hSMjMLqZiXn0PxtIsr';

export const asteroidsDataAPI = {
  getData(size: number, page: number) {
    return asteroidsData.get('', {
      params: {
        api_key: API_KEY, size, page
      }
    });
  },
  getPicture() {
    return pictureOfTheDay.get('');
  }
};
