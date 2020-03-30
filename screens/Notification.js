import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationAPI from '../api/NotificationAPI'
const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {
  constructor(){
    super()
  this.state = {address: "", notifications: [<Text>"sfh"</Text>]}
}

async componentDidMount(){
  console.log('jjslfjsdlj')
  let notificationAPI = new NotificationAPI();
  console.log("jdlsjfjsldf")
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
      console.log("result is" +res)
      this.setState({notifications: res.map((notif)=>
        
        <View style={styles.leftDetail}>
        <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
          <Icon
            size={30}
            color={'#ffffff'}
            name="ic_mail_24px"
            family="ArgonExtra"
            style={styles.inputIcons}
          />
        </View>
        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                Your booking for {notif.petId} on {notif.time} at 
                    {notif.vendorId} is {notif.status}        </Text>
      </View>      )})
    }
    else console.log("error"+err);

  });}

  
  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        <Block flex={0.2} middle >
          <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
          <Text color="#ffffff" size={40} style={{ marginLeft: 15 }}>
            Notification
          </Text>
        </Block>

          <ScrollView flex={0.8} style={{width: "100%", marginBottom: 100 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
              <Block center style={{width: width, paddingBottom: 50}}>
              <View style={styles.agenda}>
                {this.state.notifications}
              </View>

              </Block>

              </KeyboardAvoidingView>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  inputIcons: {
    marginLeft: 5,
    marginTop: 5,
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: 'row'
  },
});

export default Notification;