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

    async getNotificationById(token,id){

        const url = this.globals.serverHost + '/api/notification/'+id;

        let options = {
            headers: {token: this.authAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        await axios.get(url, options)
        .then(res =>{
            if (res.status==200){

            }
        })
    }

    async getNotificationByCustomer(customer,callback){

        const url = this.globals.serverHost + '/api/notification/customer/'+customer._id;
        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {'token':token, 'Access-Control-Allow-Origin':'*'}
        };
        console.log(customer._id)
        console.log("options: "+options.headers['token'])
        console.log("aaaaa");
        await axios.get(url,options)
             .then(res=>{
                 if (res.status==200){
                     console.log(res)
                     callback(false,res.data);
                 }
                 else {
                     console.log("errr1")
                     callback(res.data);
                 }
             })
             .catch(err=>{
                 console.log("error2")
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