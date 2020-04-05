import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Image,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import { Button, 
  Icon, 
  Input } from "../components";
import AuthAPI from '../api/AuthAPI';
import { MaterialIcons } from '@expo/vector-icons';
import { argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class ResetPassword extends React.Component {

  state = {
    email: ''
  }

  constructor(props){
    super(props);
    this.authAPI = new AuthAPI();
    this.forgetPwd = this.forgetPwd.bind(this);
  }

  forgetPwd(){
    this.authAPI.forgetPassword(this.state.email, (res) => {
      if(res == true){
        Alert.alert('Email is sent successfully', 'Please check your mailbox to get your new password',
        [{text: 'Ok'}])
      }
      else{
        Alert.alert('Error', res,
        [{text: 'Ok'}])
      }
    })
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex middle >       
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1}}
        >
          <Block style={{justifyContent:'flex-start'}}>
            <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='stretch' style={styles.headerImage}>
                <Block flex>
                    {/* <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -65}} */}
                    <MaterialIcons name='keyboard-backspace' size={40} style={{left: 15, top: 35, color: 'white'}}
                                  onPress={() => navigation.goBack()}/>
                </Block>
            </ImageBackground> 
          </Block>

          <Block flex>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              keyboardVerticalOffset={0}
            >
              <ScrollView>
                <Block flex middle>
                  <Image source={require("../assets/imgs/sendEmail.png")} resizeMode='contain' 
                          style={{width: width * 0.9, height: height * 0.4}}
                  />
                </Block>
                <Block flex={0.2} middle >
                  <Text color="#E1E1E1" size={20} style={{fontWeight: 'bold'}}>
                  Fill your email and we will send you 
                  </Text>
                  <Text color="#E1E1E1" size={20} style={{fontWeight: 'bold'}}>
                  a link to reset your password
                  </Text>
                </Block>

                <Block flex center>
                  <Block width={width * 0.9} style={{ marginTop: 40}}>
                    <Input
                      borderless 
                      placeholder="Email"
                      onChangeText={(email) => {this.setState({email})}}
                      value={this.state.email}
                      iconContent={
                        <Icon
                          size={16}
                          color={'#5E5454'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{backgroundColor: '#333333'}}
                    />
                  </Block>

                  <Block flex middle style={{marginBottom: height * 0.1}}>
                    <Button color="primary" style={styles.button} onPress={this.forgetPwd}>
                      <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                        Send Email
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </ScrollView>
            </KeyboardAvoidingView>
          </Block>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width * 0.5,
    height: 100
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
  socialConnect: {
    backgroundColor: "#404957", //argonTheme.COLORS.WHITE
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  }
});

export default ResetPassword;
