import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Globals from '../globals/globals';
import { Notifications } from 'expo';
export default class AuthAPI {
    constructor() {
        this.globals = new Globals();
    }

    /**
     * login verification.
     * @param {string} email - this is email of user.
     * @param {string} password - this is user's password.
     * @param {function} callback- this is callback function to catch the result.
     */
    login(email, password, callback) {
        const url = this.globals.serverHost + '/api/auth/login/customer';

        let options = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };

        let body = { email: email.trim(), password: password };
        axios.post(url, body, options)
            .then(res => {
                if (res.status == 200) {
                    this.registerDevice(res.data.token, res.data.id);
                    this.storeToken(res.data.token);
                    this.storeCustomerId(res.data.id);
                    callback(true);
                }
                else {
                    callback("Authentication error!")
                }
            })
            .catch(err => {
                console.log(err.response.data)
                callback(err.response.data)
            })
    }

    /**
     * send reset password.
     * @param {string} email - this is email of user.
     * @param {function} callback- this is callback function to catch the result.
     */
    forgetPassword(email, callback) {
        const url = this.globals.serverHost + '/api/auth/password/customer';

        let options = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        let body = { email: email };
        axios.post(url, body, options)
            .then(res => {
                if (res.status == 200) {
                    this.storeToken(res.data.token);
                    callback(true);
                }
                else {
                    callback("Authentication error!")
                }
            })
            .catch(err => {
                callback(err.response.data)
            })
    }

    /**
     * store the token for login session.
     * @param {string} token - this is the token for user login session.
     */
    async storeToken(token) {
        try {
            await AsyncStorage.setItem('token', token);
        }
        catch (err) {
            console.log(err);
        }
    }

    /**
     * retrieve the token for login session.
     */
    async retrieveToken() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value
            }
            else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    async clearToken() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
    }


    /**
     * store id of customer
     * @param {string} id - this is the customer id.
     */
    async storeCustomerId(id) {
        try {
            await AsyncStorage.setItem('id', id);
        }
        catch (err) {
            console.log(err);
        }
    }

    /**
     * retrieve id of customer
     */
    async retrieveCustomerId() {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                return value
            }
            else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    /**
     * tag device id to user id
     * @param {string} token - this is the token for user login session.
     * @param {string} userId - this is the id user enters for registeration.
     */
    async registerDevice(token, userId) {
        const url = this.globals.serverHost + '/api/serviceNotification';
        let deviceId = await Notifications.getExpoPushTokenAsync();
        let options = {
            headers: { token: token, 'Access-Control-Allow-Origin': '*', Accept: 'application/json' }
        };

        let body = { userId: userId, deviceId: deviceId };

        axios.post(url, body, options)
            .then(res => {
            })
            .catch(err => {
                callback(err.response.data)
            })
    }
}