import axios from 'axios';

const URL_API = 'https://murmuring-tor-81614.herokuapp.com/api';
const URL = "https://murmuring-tor-81614.herokuapp.com";

const getProducts = (dealers) => {
    const url = dealers && dealers.length ? `${URL_API}/goods/?dealers=${dealers}` : `${URL_API}/goods`;

    return axios.get(url)
      .then( (response) => {
        return response.data;
      });
}

export default {
    getProducts,
    URL
}
