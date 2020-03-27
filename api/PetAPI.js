import axios from 'axios';
import Globals from '../globals/globals';

export default class PetAPI{
    constructor() {
        this.globals = new Globals();
    }

    postPet(token, name, dateOfBirth, weight, height, type){

        const url = this.globals.serverHost + '/api/pet/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {name: name, dateOfBirth: dateOfBirth, weight: weight, height: height, type:type};
        return axios.post(url, body, options)
    }

    updatePetById(token, name, dateOfBirth, weight, height, type){
        const url = this.globals.serverHost + '/api/pet/:id';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {name: name, dateOfBirth: dateOfBirth, weight: weight, height: height, type:type};
        return axios.post(url, body, options)

    }

    getPetById(token,petId){

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    getPetByCustomerId(token,customerId){

        const url = this.globals.serverHost + '/api/pet/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    deletePetByPetId(token,petId){
        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }

}