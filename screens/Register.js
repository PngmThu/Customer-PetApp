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

//const headerImg = require("../assets/imgs/headerLogin.png");

class Register extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex={0.4} middle>
            <ImageBackground source={require("../assets/imgs/headerRegister.png")} resizeMode='contain' style={styles.headerImage}>
              <Block flex middle>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Register")}> */}
                  <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -90}}
                                 onPress={() => navigation.goBack()}/>
                {/* </TouchableOpacity> */}
              </Block>
            </ImageBackground> 
          </Block>

          <Block flex>
            <Block flex={0.15}>
              <Text color="#E1E1E1" size={32} style={{ marginLeft: 15, marginTop: 20, 
                                                        fontWeight: 'bold'}}>
                Create an account
              </Text>
            </Block>
            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block width={width * 0.9} style={{marginTop: 20, marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Your name"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
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
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    password
                    viewPass
                    borderless
                    placeholder="Password"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />            
                </Block> 
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    password
                    viewPass
                    borderless
                    placeholder="Re-enter password"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />            
                </Block>

                <Block flex middle style={{marginBottom: height * 0.1}}>
                  <Button color="primary" style={styles.loginButton} onPress={() => navigation.navigate("Register")}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
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
    //width: '100%',
    //height: undefined,
    //aspectRatio: 1,
    width: width,
    height: height,
    //marginTop: -10,
    //scaleX: 1.2,
    justifyContent:'flex-start',
    borderRadius: 4,
    //elevation: 1,
    //overflow: "hidden"
    position: 'absolute', zIndex: 3
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
  loginButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  }
});

export default Register;
