import React from 'react';
import Loader from '../components/Loader';
import AuthAPI from '../api/AuthAPI';
import {View} from 'react-native';
export default class AuthLoadingScreen extends React.Component {

    constructor(props){
        super(props);
        this.authAPI = new AuthAPI();
    }
    
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await this.authAPI.retrieveToken();
        this.props.navigation.navigate(userToken ? 'Main' : 'Account');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{backgroundColor: '#333333'}}>
                <Loader />
            </View>

        );
    }
}