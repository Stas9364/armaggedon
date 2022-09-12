import {asteroidsData, pictureOfTheDay} from './axiosInstance';

export const asteroidsDataAPI = {
  getData() {
    return asteroidsData.get('');
  },
  getPicture() {
    return pictureOfTheDay.get('');
  }
};
