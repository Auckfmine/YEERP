/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yeerp.herokuapp.com/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

export default api;
