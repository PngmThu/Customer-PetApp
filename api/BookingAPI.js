import axios from 'axios';
import Globals from '../globals/globals';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
    }

    postBooking(token,petId,serviceId,vendorId,customerId){

        const url = this.globals.serverHost + '/api/booking/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {petId: petId, serviceId : serviceId, vendorId: vendorId, customerId:customerId};

        return axios.post(url, body, options);
    }
    
    getBookingById(token, id){
        const url = this.globals.serverHost + '/api/booking/' + id;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    getBookingByVendorId(token, vendorId){
        const url = this.globals.serverHost + '/api/booking/vendor/' + vendorId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    getBookingByCustomerId(token, customerId){
        const url = this.globals.serverHost + '/api/booking/customer/' + customerId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    getBookingByPetId(token, PetId){
        const url = this.globals.serverHost + '/api/booking/pet/' + PetId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    deleteBookingById(token, bookingId){
        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }

    updateBookingById(token, bookingId, bookingStatus){
        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        let body = {status: bookingStatus}

        return axios.post(url, body, options)

    }

}