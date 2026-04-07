import axios from 'axios';
import { API_KEY } from '~utils/getSecrets';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const options = {
  params: {
    maxResults: '51',
  },
  headers: {
    // 'X-RapidAPI-Key': process.env.REACT_APP_SECRET_KEY,
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export default async function (url) {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.log(`error in fetch api: ${error}`);
  }
}
