import axios from 'axios';

export const fetchAxios = axios.create({
  baseURL: 'https://back-muni.herokuapp.com/api/v1',
});
