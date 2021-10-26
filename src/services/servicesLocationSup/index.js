import axios from 'axios';

//https://api.hgbrasil.com/weather?key=9c2e7151&lat=-23.682&lon=-46.875

//export const key = '9c2e7151';
export const key = '7eed1d01';

const servicesLocationSup =  axios.create({
  //baseURL: 'http://192.168.1.92:3000/location'
  baseURL: 'https://comparando-api.herokuapp.com/location'
});

export default servicesLocationSup;