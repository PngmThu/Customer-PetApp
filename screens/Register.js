import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  View,
  Text,
  Alert
} from "react-native";
import { Block, Checkbox, theme } from "galio-framework";
import { Button, 
  Icon, 
  Input, Select } from "../components";
import { Images, argonTheme } from "../constants";
import { MaterialIcons } from '@expo/vector-icons';
import UserProfileAPI from '../api/UserProfileAPI';
const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Register extends React.Component {
  
  constructor(props){
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.userProfileAPI = new UserProfileAPI();
  }

  componentDidMount(){

  }

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  }

  handleRegister(){
    if(!this.state.email || !this.state.firstName || !this.state.password || !this.state.lastName){
      Alert.alert('Error', "Input field can not be empty",
      [{text: 'Ok'}])
      return;
    }
    else if(this.state.password != this.state.rePassword){
      Alert.alert('Error', "Password field not match",
      [{text: 'Ok'}]);
      return;
    }
    this.customer = new Object({
      email: this.state.email,
      mobile: this.state.phone,
      firstName: this.state.firstName,
      password: this.state.password,
      lastName: this.state.lastName
    });
    
    this.userProfileAPI.createCustomer(this.customer, (res) => {
      if(res == true){
        Alert.alert('Succesfully', 'User is created successfully! You can log in now',
          [{text: 'Ok' , onPress: () => this.props.navigation.navigate('Login')}]
        );
      }
      else{
        Alert.alert('Error', res,
        [{text: 'Ok'}]);
      }
    })
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle >
        
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          {/* <Block flex={0.3} middle> */}
          <Block flex={0.3}>
            <ImageBackground source={require("../assets/imgs/headerRegister.png")} resizeMode='stretch' style={styles.headerImage}>
                {/* <Block flex middle> */}
                <Block>
                    <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
                                    //style={{left: -170, top: -35, color:'white'}}
                                  onPress={() => navigation.navigate('Login')}/>
                </Block>
            </ImageBackground> 
          </Block>

          <Block flex={0.7}>
            {/* <Block flex={0.1}>
              <Text style={{ marginLeft: 15, fontSize: 32, fontWeight: 'bold', color:'white'}}>
                Create an account
              </Text>
            </Block> */}

            <Block flex={1} center style={{marginTop: 10, paddingBottom: 50}}>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200}>
                  <ScrollView style={{width: width}}>
                    <Text style={{ marginLeft: 15, fontSize: 32, fontWeight: 'bold', color:'white'}}>
                      Create an account
                    </Text>
                    <Block center width={width * 0.9} style={{marginTop: 20, marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="First name"
                        onChangeText={(firstName) => {this.setState({firstName})}}
                        value={this.state.firstName}
                        iconContent={
                          <Icon
                            size={16}
                            color={'white'}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        style={{backgroundColor: '#333333'}}
                      />
                    </Block>

                    <Block center width={width * 0.9} style={{marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Last name"
                        onChangeText={(lastName) => {this.setState({lastName})}}
                        value={this.state.lastName}
                        iconContent={
                          <Icon
                            size={16}
                            color={'white'}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        style={{backgroundColor: '#333333'}}
                      />
                    </Block>

                    <Block center width={width * 0.9} style={{ marginBottom: 15 }}>
                      <Input
                        borderless 
                        placeholder="Email"
                        onChangeText={(email) => {this.setState({email})}}
                        value={this.state.email}
                        iconContent={
                          <Icon
                            size={16}
                            color={'white'}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        style={{backgroundColor: '#333333'}}
                      />
                    </Block>

                    <Block center width={width * 0.9} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        viewPass
                        borderless
                        placeholder="Password"
                        onChangeText={(password) => {this.setState({password})}}
                        value={this.state.password}
                        iconContent={
                          <Icon
                            size={16}
                            color={'white'}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        style={{backgroundColor: '#333333'}}
                      />                 
                    </Block> 
                    <Block center width={width * 0.9} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        viewPass
                        borderless
                        placeholder="Re-enter password"
                        onChangeText={(rePassword) => {this.setState({rePassword})}}
                        value={this.state.rePassword}
                        iconContent={
                          <Icon
                            size={16}
                            color={'white'}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        style={{backgroundColor: '#333333'}}
                      />            
                    </Block>

                    <Block middle style={{marginBottom: 20}}>
                      <Button color="primary" style={styles.loginButton} onPress={this.handleRegister}>
                        <Text bold size={14} color={'white'} style={{color: 'white'}}>
                          Register
                        </Text>
                      </Button>
                    </Block>
                  </ScrollView>
                </KeyboardAvoidingView>
            </Block>
          </Block>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  // headerImage: {
  //   //width: '100%',
  //   //height: undefined,
  //   //aspectRatio: 1,
  //   width: width,
  //   height: height,
  //   //marginTop: -10,
  //   //scaleX: 1.2,
  //   justifyContent:'flex-start',
  //   borderRadius: 4,
  //   //elevation: 1,
  //   //overflow: "hidden"
  // },
  headerImage: {
    width: width,
    height: 200,
    justifyContent:'flex-start',
  },
  backArrow: {
    left: 15,
    top: 40,
    color: 'white',
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
