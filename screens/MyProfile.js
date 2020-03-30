import React, { useState } from "react";
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
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";
import { hide } from "expo/build/launch/SplashScreen";


const { width, height } = Dimensions.get("screen");

class MyProfile extends React.Component {
  state = {
    dob: "", 
    edit: false, 
    popUpDialog: false,
    name: "",
    email: "",
    mobile: ""
  }

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
  }

  logout(bool){
    if(bool){
      console.log("Logged out!");
    }
    this.setState({popUpDialog: false})
  }

  clickLogout(event){
    this.setState({popUpDialog: true})
  }

  render() {
    const { navigation } = this.props;

    if(this.state.edit){
      var updateInfo = <Button style={styles.loginButton} onPress={() => {navigation.navigate("Home")}}>
                          <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                            Update Info
                          </Text>
                        </Button>
    }
    else{
      updateInfo = null
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        
        <Popup visible={this.state.popUpDialog} choice={this.logout} question={"Do you want to log out?"}/> 
        <Block flex={0.2} middle style={{ marginBottom: 10 }} >
          <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
          <Text color="#ffffff" size={40} style={{ marginLeft: 15 }}>
            Your info
          </Text>
        </Block>

          <ScrollView>
            <Block flex={0.8} row style={styles.action} >
              <View style={{alignContent:'flex-start', flex:1, flexDirection: 'row'}} onTouchStart={(event) => {this.clickLogout(event)}}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.logoutIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.logoutTxt}>Logout</Text>
              </View>

              <View style={{justifyContent:'flex-end', flex: 1, flexDirection: 'row'}}>
                <ToggleSwitch
                  isOn={this.state.edit}
                  onColor={"#333333"}
                  offColor={"#999999"}
                  onToggle={(isOn) => {this.setState({edit: isOn})}}
                />
                <Text size={20} style={styles.editTxt}>Edit</Text>
              </View>
            </Block>

            <Block flex={0.4} center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block width={width * 0.9} style={{marginTop: 20, marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Your name"
                    onChangeText={(name) => {this.setState({name})}}
                    value={this.state.name}
                    editable={this.state.edit}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Email"
                    editable={this.state.edit}
                    onChangeText={(email) => {this.setState({email})}}
                    value={this.state.email}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                <DatePicker
                    style={{width: width * 0.9, 
                            backgroundColor: "#333333", borderRadius: 10,
                            justifyContent: 'center', }}
                    date={this.state.date}
                    disabled={!this.state.edit}
                    mode="date"
                    placeholder="Date of Birth"
                    format="YYYY-MM-DD"
                    minDate="1996-01-01"
                    maxDate="2022-02-06"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconComponent={
                      <FontAwesome name='calendar-check-o' size={16} color='#ffffff' style={{padding: 10}} />
                    }
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderWidth: 0,
                        alignItems: "flex-start",
                        padding: 10,
                        marginLeft: 10,
                      },
                      dateText: {
                        color: "#ffffff",
                      },
                      modalStyle: {
                        backgroundColor: "#333333",
                      },
                      modalOverlayStyle: {
                        backgroundColor: "#333333",
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Phone number"
                    editable={this.state.edit}
                    onChangeText={(phone) => {this.setState({phone})}}
                    value={this.state.phone}
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#ffffff'}
                        name="phone"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>

                <Block flex={0.1} middle style={{marginBottom: height * 0.1}}>
                  {updateInfo}
                  <Button style={styles.passwordBtn} onPress={() => {navigation.navigate("ChangePassword")}}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Change Password
                    </Text>
                  </Button>
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
    paddingBottom: 20,
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  registerContainer: {
    width: width * 0.9,  //0.9
    height: height * 0.78,
    backgroundColor: "#05060A", //#F4F5F7
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12,
  },
  logoutIcon:{
    color: 'red',
    fontWeight: '200',
  },
  action: {
    width:"90%",
    alignSelf: 'center',
    marginTop: 10
  },
  logoutTxt: {
    color: 'red',
    marginLeft: 5
  },
  editIcon: {
    color: 'white',
    fontWeight: '200',
    textAlign: 'left'
  },
  editTxt: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'left'
  },
  passwordBtn: {
    backgroundColor: "grey",
    marginTop: 15
  },
  picker: {
    width: '100%',
    paddingBottom: 0,
    backgroundColor: 'transparent',
    paddingLeft: 0,
    transform: [{scaleX: 0.77}, {scaleY: 0.77}],
    position: 'absolute',
    color: "#cccccc"
  }
});

export default MyProfile;
