import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class PetAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * to create a new pet object.
     * @param {object} pet - this is the user inpt for attributes of new pet object.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * update pet object using its id.
     * @param {object} pet - this is a new updated object to be used to update database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve pet object using pet id
     * @param {string} petId - this is the id of pet to be retrieved.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieves all the pet objects that the customer id have.
     * @param {string} customerId - this is the customer id to be queried.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieves all the pet objects that the customer id have.
     * @param {stirng} petId - this is the customer id to be queried.
     * @param {function} callback - this is callback function to catch the result.
     */
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