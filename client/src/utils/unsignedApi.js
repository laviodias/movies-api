import axios from "axios";

const API_URL = 'http://localhost:3000/';

const unsignedApi = axios.create({
  baseURL: API_URL,
});

export default unsignedApi;
