import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class UserProfileAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * create a new customer object.
     * @param {object} customer - this is the customer object to be created with customer profile attributes.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * update user account by their account id.
     * @param {object} customer - this is the updated customer object to be updated into the database.
     * @param {string} customerId - this is the id of the object to be updated.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * to change password for user.
     * @param {string} customerId - this is the customer id for password change.
     * @param {string} newPwd - this is the new password to be changed to.
     * @param {string} oldPwd - this is the old passowrd of the user to be replaced.
     * @param {function} callback - this is callback function to catch the result.
     */
    async updatePassword(customerId, newPwd, oldPwd, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/customer/password/' + customerId;

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

    /**
     * retrieve the user profile which is the customer object.
     * @param {string} customerId - this is the id of the customer to be retrieve.
     * @param {function} callback - this is callback function to catch the result.
     */
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