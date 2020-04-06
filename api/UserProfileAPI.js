import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class UserProfileAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createCustomer(customer, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/account/customer';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.post(url, customer, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    async updateUserById(customer, customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/' + customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.put(url, customer, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    async updatePassword(vendorId, newPwd, oldPwd, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/password/' + vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {password: newPwd, oldPwd: oldPwd};

        axios.put(url, body, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            callback(err.response.data);
            console.log(err.response.data);
        })

    }

    async getUserById(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url, options)
        .then(res => {
            callback(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
}