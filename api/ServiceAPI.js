import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class ServiceAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

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