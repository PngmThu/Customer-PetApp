import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class VendorAPI{
    constructor(){
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createVendor(vendor, callback){
        const url =this.globals.serverHost + '/api/account/vendor';

        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        let body = vendor;

        axios.post(url, body, options)
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

    getVendorLocation(callback){
        const url = this.globals.serverHost + '/api/vendorLocation';
        
        let options = {
            headers: {'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    async getVendorById(vendorId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/' + vendorId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url,options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            callback(false);
            console.log(err.response.data);
        })
    }
}
