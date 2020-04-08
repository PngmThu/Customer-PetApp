import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class ServiceAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * retrieve list of services offered by a vendor
     * @param {string} vendorId - this is the vendor id to be querried. 
     * @param {function} callback - this is callback function to catch the result.
     */
    async getServiceByVendor(vendorId, callback){

        const url = this.globals.serverHost + '/api/services/vendor/' + vendorId;

        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url,options)
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
     * retrieve service object by id.
     * @param {string} serviceId - this is the id of a particular service object.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getServiceById(serviceId, callback){

        const url = this.globals.serverHost + '/api/services/' + serviceId;

        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url,options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    /**
     * create service object.
     * @param {string} service - this is a new object of service to be created.
     * @param {function} callback - this is callback function to catch the result.
     */
    async createNewService(service, callback){
        const url = this.globals.serverHost + '/api/services/';
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.post(url, service, options)
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
     * update service object
     * @param {object} service - this is service object to be updated in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
    async updateService(service, callback){
        const url = this.globals.serverHost + '/api/services/'+ service._id;
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.put(url, service, options)
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
     * delete service by id
     * @param {string} serviceId - this is the id of service to be deleted.
     */
    async deleteService(serviceId){
        const url = this.globals.serverHost + '/api/services/'+ serviceId;

        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.delete(url,options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            console.log(err.response.data);
        })     
    }
}