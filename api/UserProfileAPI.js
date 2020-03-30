import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class UserProfileAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    createCustomer(customer){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/account/customer';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {customer};

        return axios.post(url, body, options)
    }

    updateUserById(customer, customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/' + customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {customer};
        return axios.post(url, body, options)

    }

    updatePasswordById(customer, customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/password/' + customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {customer};
        return axios.post(url, body, options)

    }

    async getUserById(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        console.log(token)

        axios.get(url, options)
        .then(res => {
            callback(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
}