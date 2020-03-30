import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

import NotificationAPI from '../api/NotificationAPI'

const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Notification extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notifications:[]
    }
  }
  async componentDidMount(){
    notificationAPI = new NotificationAPI();
    await notificationAPI.getNotificationByCustomer({
      _id:"5e7e21a3b2d11d00172337de",
      email:"2006@gmail.com",
      password:"$2b$10$xblnGajBExBEfY/.4zZr/uuazV9i5HwtlgqLnl8VqQNE7.WQemOFq",
      mobile:"90865103",
      firstName:"Louis",
      lastName:"Phung",
      createdAt:"2020-03-27T15:54:11.731+00:00",
      __v:0
    },(err,res)=>{
      if (!err) {
        console.log(notif)
        this.setState({notifications: res.map((notif)=>{
          <Block style={{ marginTop: 160}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for {notif.petId} on {notif.time} at 
                    {notif.vendorId} is {notif.status}
                </Text>
             </Block>
          </Block>        })})
      }
      else console.log(err);

    });
    
  }
  render() {
    const { navigation } = this.props;

    return (
      // <Block flex middle >
      <Block flex middle >
        {/* <StatusBar hidden /> */}
        
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1}}
        >
          {/* <Block flex={0.4} middle > */}
          <Block flex={0.15} style={{justifyContent:'flex-start'}}>
            {/* <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='contain' style={styles.headerImage}> */}
            <ImageBackground source={require("../assets/imgs/headerLogin.png")} resizeMode='stretch' style={styles.headerImage}>
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text color="#E1E1E1" size={32} style={{ marginLeft: 15, fontWeight: 'bold'}}>
                        Notification
                    </Text>
                </View>
                {/* <Block flex middle> */}
                <Block flex>
                    {/* <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -65}} */}
                    <MaterialIcons name='keyboard-backspace' size={40} style={{left: 15, top: 35}}
                                  onPress={() => navigation.goBack()}/>
                </Block>
            </ImageBackground> 
          </Block>
          <ScrollView>

            {this.state.notifications  }          

          </ScrollView>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height * 0.15,
    //justifyContent:'flex-start',
    borderRadius: 4,
    //elevation: 1,
    //overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12,
  },
  item: {
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 20
  }
});

export default Notification;