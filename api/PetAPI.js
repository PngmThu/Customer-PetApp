import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class PetAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createPet(pet, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = pet;

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

    async updatePetById(pet, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/' + pet._id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = pet;
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
            console.log(err.response.data)
        })

    }

    async getPetById(petId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

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

    async getPetByCustomerId(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

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

    async deletePetByPetId(petId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

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