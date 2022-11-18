import axios from 'axios';
import { API_BASE_URL } from '../Constants';


const backApi = axios.create({baseURL: API_BASE_URL});

export default backApi;
