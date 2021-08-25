import axios from 'axios';

//https://api.hgbrasil.com/weather?key=9c2e7151&lat=-23.682&lon=-46.875

//export const key = '9c2e7151';
export const key = '7eed1d01';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com' 
});

export default api;