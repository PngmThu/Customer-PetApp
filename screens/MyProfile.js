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

class MyProfile extends React.Component {
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
                        My Profile
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

          <Block flex>
            <Block>
              <Block>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text color="#FF0000" size={17} style={{ marginTop: 30, marginLeft: 20}}>
                    <Icon
                    size={17}
                    color={'#FF0000'}
                    name="padlock-unlocked"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                  Logout
                  </Text>
                </TouchableOpacity>
              </Block>
              <Block>
                <Button color="primary" style={styles.buttonEdit} onPress={() => navigation.navigate("EditProfile")}>
                   <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Edit
                   </Text>
                </Button>
              </Block>
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 80, marginRight: 280}}>
              Full Name 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5}}>
                  <Input
                    editable = {false}
                    borderless 
                    placeholder="Ng Wee Hau, Zaphyr"
                  />
                </Block>
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 80, marginRight: 250 }}>
              Email Address 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5 }}>
                  <Input
                    editable = {false}
                    borderless 
                    placeholder="weehau1996@hotmail.com"
                  />
                </Block>
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 80, marginRight: 260}}>
              Date of Birth 
              </Text>
              <Block width={width * 0.35} style={{ marginTop: -5, marginRight: 230}}>
                  <Input
                    editable = {false}
                    borderless 
                    placeholder="12 March 1996"
                  />
                </Block>
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 80, marginRight: 235}}>
              Contact Number 
              </Text>
              <Block width={width * 0.35} style={{ marginTop: -5, marginRight: 230}}>
                  <Input
                    editable = {false}
                    borderless 
                    placeholder="90408085"
                  />
                </Block>
            </Block>

            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block flex middle style={{marginBottom: height * 0.08}}>
                  <Button color="primary" style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Change Password
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
    width: width,
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
  },
  buttonEdit: {
    width: width * 0.15,
    height: 25,
    marginLeft: 325,
    marginTop: -25,
    borderRadius: 10,
  }
});

export default MyProfile;
