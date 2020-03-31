import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class PetAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    createPet(pet){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {pet};

        return axios.post(url, body, options)
    }

    updatePetById(pet, petId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/' + petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {pet};
        return axios.post(url, body, options)

    }

    async getPetById(petId,callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        await axios.get(url, options).then( (res)=>{
            if (res.status!=200) 
            {
                callback("Error");
                console.log("Pet here")}
            else {
                callback(false,res.data)}
        }
        )
    }

    getPetByCustomerId(customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    deletePetByPetId(petId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }

}