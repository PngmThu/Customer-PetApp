import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class UserProfileAPI{
    constructor() {
        this.globals = new Globals();
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

    getUserById(customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }
}