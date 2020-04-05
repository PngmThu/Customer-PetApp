import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createBooking(booking, callback){
        const url = this.globals.serverHost + '/api/booking';
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = booking;

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
    
    async getBookingById(bookingId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/' + bookingId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err.response.data);
            console.log("error")
        })

    }

    async getBookingByVendorId(vendorId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/vendor/' + vendorId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

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

    async getBookingByCustomerId(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/customer/' + customerId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
            else {console.log("error backend")}

        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    async getBookingByPetId(petId, fromTime, callback){
        const token = await this.authAPI.retrieveToken();
        const url = this.globals.serverHost + '/api/booking/pet/' + petId + '/' + fromTime;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }
        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            //console.log(err.response.data);
            console.log(err)
        })
    }

    deleteBookingById(bookingId, callback){
        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: this.authAPI.retrievetoken(), 'Access-Control-Allow-Origin':'*'}
        }

        axios.delete(url, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    async updateBookingById(bookingId, booking, callback){
        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.put(url, booking, options)
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
    
}