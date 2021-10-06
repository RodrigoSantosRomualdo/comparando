import axios from 'axios';

const sistenaUsuario =  axios.create({
  baseURL: 'http://192.168.1.92:3000/users'
});

export default sistenaUsuario;