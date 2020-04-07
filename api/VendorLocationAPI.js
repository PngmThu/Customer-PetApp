import axios from 'axios';
import Globals from '../globals/globals';

export default class DataAPI{
    constructor(){
        this.globals = new Globals();
    }

    /**
     * retrieve a list of information for all clinics 
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve the clinic information by name.
     * @param {string} clinicName - this is the name of the clinic to be retrieved.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve the clinic information by vendor id.
     * @param {string} vendorId - this is the vendor's id to be querried. 
     * @param {function} callback - this is callback function to catch the result.
     */
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