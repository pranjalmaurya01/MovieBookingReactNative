import axios from 'axios';
import baseURL from '../constants/baseUrl';
// https://github.com/axios/axios#request-config
const client = axios.create({
	baseURL,
});

export default client;
