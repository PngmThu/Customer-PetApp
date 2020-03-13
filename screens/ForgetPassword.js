import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class ResetPassword extends React.Component {
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
            <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='contain' style={styles.headerImage}>
                {/* <Block flex middle> */}
                <Block flex>
                    {/* <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -65}} */}
                    <MaterialIcons name='keyboard-backspace' size={40} style={{left: 15, top: 35}}
                                  onPress={() => navigation.goBack()}/>
                </Block>
            </ImageBackground> 
          </Block>

          <Block flex>
            <Block flex middle>
              <Image source={require("../assets/imgs/sendEmail.png")} resizeMode='contain' 
                       style={{width: width * 0.9, height: "100%"}}/>
            </Block>
            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={22} style={{fontWeight: 'bold', marginTop: -20}}>
              Fill your email and we will send you 
              </Text>
              <Text color="#E1E1E1" size={22} style={{fontWeight: 'bold'}}>
              a link to reset your password
              </Text>
            </Block>

            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block width={width * 0.9} style={{ marginTop: 40}}>
                  <Input
                    borderless 
                    placeholder="Email"
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

                <Block flex middle style={{marginBottom: height * 0.08}}>
                  <Button color="primary" style={styles.button} onPress={() => navigation.navigate("Register")}>
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Send Email
                    </Text>
                  </Button>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          </Block>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width * 0.5,
    height: height * 0.15,
    //justifyContent:'flex-start',
    borderRadius: 4,
    //elevation: 1,
    //overflow: "hidden"
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
