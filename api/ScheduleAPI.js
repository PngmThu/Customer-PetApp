import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    async getUnavailableDateByVendor(vendor){
        const url = this.globals.serverHost + '/api/schedule/vendorId/'+vendor._id;

        let options = {
            headers: {token: AuthAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

}