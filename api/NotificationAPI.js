import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';
export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    postNotification(Notification){

        const url = this.globals.serverHost + '/api/notification/add';

        let options = {
            headers: {token: this.authAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        let body = {content: content, time: time, customerId: customerId, vendorId: vendorId};
        return axios.post(url, body, options)
    }

    getNotificationById(token,id){

        const url = this.globals.serverHost + '/api/notification/'+id;

        let options = {
            headers: {token: this.authAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    async getNotificationByCustomer(customer,callback){

        const url = this.globals.serverHost + '/api/notification/customer/';
        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {'token':token, 'Access-Control-Allow-Origin':'*'}
        };
        let body = {customerId: customer._id};
        console.log(options);
        await axios.get(url,body,options)
             .then(res=>{
                 if (res.status==200){
                     callback(false,res.data);
                 }
                 else {
                     callback(res.data);
                 }
             })
             .catch(err=>{
                 callback(err);
             })

        console.log('jeljwelrj')
    }

    getNotificationByPetId(token,petId){

        const url = this.globals.serverHost + '/api/notification/pet/'+petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

}