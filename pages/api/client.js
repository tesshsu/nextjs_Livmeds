import axios from 'axios';
import Cookie from "js-cookie";
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
});

export function setupApiClient() {
  client.interceptors.request.use(async (config) => {
    const newConfig = config;
    const token = await localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      newConfig.headers.authorization = `Bearer ${token}`;
    }

    return newConfig;
  }, (err) => {
    if (!err.response) {
      Alert.alert('Erreur', 'Pas de réseau !');
    }

    return Promise.reject(err);
  });
}

export function parseCookies(req) {
  return Cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export default client;
