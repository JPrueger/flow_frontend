import appConfig from '../../config/appConfig';
import axios from 'axios';

export default function axiosClient() {
    return axios.create({
        baseURL: appConfig.apiUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
        }
    });
}