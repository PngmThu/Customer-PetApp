import axios from 'axios';
import Globals from '../globals/globals';

export default class DataAPI{
    constructor(){
        this.globals = new Globals();
    }

    getAllClinics(callback){
        const url = this.globals.serverHost + '/api/vendorLocation';

        axios.get(url)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
            else{
                callback("Cannot retrieve data!")
            }
        })
        .catch(err => {
            callback(err.response.data)
        })
    }

    getClinicByName(clinicName, callback){
        clinicName = encodeURIComponent(clinicName.trim())
        const url = this.globals.serverHost + '/api/vendorLocation/' + clinicName;

        axios.get(url)
        .then(res => {
            if(res.status == 200){
                callback(res);
            }
            else{
                callback("Cannot retrieve data!")
            }
        })
        .catch(err => {
            callback(err.response.data)
        })
    }

    getClinicByVendorId(vendorId, callback){

        const url = this.globals.serverHost + '/api/vendorLocation/vendor/' + vendorId;

        axios.get(url)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
            else{
                callback("Cannot retrieve data!")
            }
        })
        .catch(err => {
            callback(err.response.data)
        })
    }
}