import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  ScrollView,
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfileAPI from '../api/UserProfileAPI';
import Popup from '../components/Popup';
const { width, height } = Dimensions.get("screen");

class ChangePassword extends React.Component {
  state = {
    popUpDialog: false,
    oldPwd: "",
    newPwd: "",
    rePwd: "",
    keyboardHeight: 0
  }

  constructor(props) {
    super(props);
    //console.log(this.props.navigation.state.params);
    this.clickSave = this.clickSave.bind(this);
    this.updatePwd = this.updatePwd.bind(this);
    this.userProfileAPI = new UserProfileAPI();
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }

  async updatePwd(bool) {
    if (bool) {
      if (this.validatePwd()) {
        let customerId = await this.userProfileAPI.authAPI.retrieveCustomerId();
        this.userProfileAPI.updatePassword(customerId, this.state.newPwd, this.state.oldPwd, async (res) => {
          if (res == true) {
            Alert.alert('Successful', "Password is updated succesfully!",
              [{ text: 'OK' }]);
            await this.userProfileAPI.authAPI.clearToken();
            this.props.navigation.navigate('Account');
          }
          else {
            Alert.alert('Error', res,
              [{ text: 'OK' }]);
          }
        })
      }
    }
    this.setState({ popUpDialog: false })
  }

  validatePwd() {
    if (this.state.newPwd != this.state.rePwd) {
      Alert.alert('Error', "New password not match",
        [{ text: 'OK' }])
      return false
    }

    if (!this.state.newPwd || !this.state.rePwd || !this.state.oldPwd) {
      Alert.alert('Error', "Input field can not be empty",
        [{ text: 'OK' }])
      return false
    }

    return true;
  }
  clickSave(event) {
    this.setState({ popUpDialog: true })
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >

          <Popup visible={this.state.popUpDialog} choice={this.updatePwd} question={"Do you want to update password?"} />
          <Block flex={0.3} middle >
            <ImageBackground source={require("../assets/imgs/headerPwd.png")} resizeMode='contain' style={styles.headerImage} />
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backBtn}
              onPress={() => navigation.navigate("Profile")} />
            <Text color="#ffffff" size={33} style={{ marginLeft: 15, fontFamily: 'ITCKRIST', marginTop: 20 }}>
              Change Password
          </Text>
          </Block>

          <ScrollView>
            <Block flex={0.5} center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={this.state.keyboardHeight}
                enabled
              >
                <Block width={width * 0.9} style={{ marginTop: 120, marginBottom: 15 }}>
                  <Input
                    borderless
                    password
                    viewPass
                    placeholder="Old password"
                    onChangeText={(oldPwd) => { this.setState({ oldPwd }) }}
                    value={this.state.oldPwd}
                    style={{ backgroundColor: '#333333' }}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    password
                    viewPass
                    placeholder="New Password"
                    onChangeText={(newPwd) => { this.setState({ newPwd }) }}
                    value={this.state.newPwd}
                    style={{ backgroundColor: '#333333' }}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    password
                    viewPass
                    placeholder="Re-enter new Password"
                    onChangeText={(rePwd) => { this.setState({ rePwd }) }}
                    value={this.state.rePwd}
                    style={{ backgroundColor: '#333333' }}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>

                <Block flex={0.1} middle style={{ marginBottom: height * 0.1 }}>
                  <Button style={styles.passwordBtn} onPress={() => { this.clickSave() }}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Save
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
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent: 'flex-start',
    borderRadius: 4,
    position: 'absolute',
    marginTop: -80
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
  passwordBtn: {
    backgroundColor: "grey",
    marginTop: 15
  },
  backBtn: {
    position: 'absolute',
    marginTop: 100,
    paddingTop: 20,
    marginLeft: 18,
    alignSelf: 'flex-start',
    color: 'white'
  }
});

export default ChangePassword;
