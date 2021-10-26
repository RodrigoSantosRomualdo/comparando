import axios from 'axios';

const sistenaUsuario =  axios.create({
  //baseURL: 'http://192.168.1.92:3000/users'
  baseURL: 'https://comparando-api.herokuapp.com/users'
});

export default sistenaUsuario;