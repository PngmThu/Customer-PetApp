import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class CustomerAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * get customer object by id
     * @param {string} customerId - this is the customer id to be searched for to retrieve customer object in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getCustomerById(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url, options)
        .then( res =>{
            if (res.status == 200){
                callback(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}