import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    async getServiceByVendor(vendor){

        const url = this.globals.serverHost + '/services/vendor/'+vendor._id;

        let options = {
            headers: {token: AuthAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        let body = {};
        return axios.get(url, body, options)
    }

}