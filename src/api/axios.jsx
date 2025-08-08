
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sec.maastrixdemo.com/api/v1/', 

});

export default instance;
