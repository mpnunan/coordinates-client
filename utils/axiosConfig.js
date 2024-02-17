import axios from 'axios';
import { clientCredentials } from './client';

const coordinates = axios.create({
  baseURL: clientCredentials.databaseURL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

coordinates.interceptors.response.use((response) => response, (error) => {
  console.warn(error);
  throw error;
});

export default coordinates;
