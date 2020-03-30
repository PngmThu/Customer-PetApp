import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    createBooking(booking){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {booking};

        return axios.post(url, body, options);
    }
    
    async getBookingById(bookingId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/' + bookingId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        console.log(token)

        axios.get(url, options)
        .then(res => {
            callback(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })

    }

    getBookingByVendorId(vendorId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/vendor/' + vendorId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    getBookingByCustomerId(customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/customer/' + customerId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    getBookingByPetId(petId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/pet/' + petId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    deleteBookingById(bookingId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }

    updateBookingById(bookingId, booking){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        let body = {booking}

        return axios.post(url, body, options)

    }

}