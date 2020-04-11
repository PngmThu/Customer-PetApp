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

class EditProfile extends React.Component {
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
                        Edit My Profile
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
            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 180, marginRight: 280}}>
              Full Name 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5}}>
              <Input
                    borderless 
                    placeholder="Full Name"
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
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 180, marginRight: 250 }}>
              Email Address 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5 }}>
              <Input
                    borderless 
                    placeholder="Email Address"
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
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 180, marginRight: 270 }}>
              Date of Birth 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5 }}>
              <Input
                    borderless 
                    placeholder="Date of Birth"
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
            </Block>

            <Block flex={0.2} middle >
              <Text color="#E1E1E1" size={18} style={{ marginTop: 180, marginRight: 240 }}>
              Contact Number 
              </Text>
              <Block width={width * 0.9} style={{ marginTop: -5 }}>
              <Input
                    borderless 
                    placeholder="Contact Number"
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
            </Block>

            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block flex middle style={{marginBottom: height * 0.08}}>
                  <Button color="primary" style={styles.button} onPress={() => navigation.navigate("MyProfile")}>
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Save
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
});

export default EditProfile;
