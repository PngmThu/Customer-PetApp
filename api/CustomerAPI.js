import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class CustomerAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

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