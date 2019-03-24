import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-react-a408a.firebaseio.com/'
});

export default instance;