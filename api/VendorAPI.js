import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class VendorAPI{
    constructor(){
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * create a new vendor object.
     * @param {object} vendor - this is vendor object with the attributes of vendor to be saved to database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve the list of locations of all vendors.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve vendor object by the id.
     * @param {string} vendorId - this is the vendor id to be querried for in the database.
     * @param {*} callback - this is callback function to catch the result.
     */
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
