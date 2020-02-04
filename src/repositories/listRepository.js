import axios from 'axios';

const endpoint = '/lists';

export default {

    get(key, /*version*/) {
        console.log('get list')
        // return axios.get(endpoint, { params: { id } });
    },

    list() {
        console.log('list policy')
        // return axios.get(endpoint);
    },

}
