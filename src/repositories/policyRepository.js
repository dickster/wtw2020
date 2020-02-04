import axios from 'axios';

const endpoint = '/galileo';

export default {

    find(id) {
        console.log('find policy')
        // return axios.get(endpoint, { params: { id } });
    },

    list() {
        console.log('list policy')
        // return axios.get(endpoint);
    },

}
