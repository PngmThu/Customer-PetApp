import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import {
  Button,
  Icon,
  Input
} from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Loader from '../components/Loader';
import AuthAPI from '../api/AuthAPI';

const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    keyboardHeight: 0
  }

  constructor(props) {
    super(props);
    this.authAPI = new AuthAPI();
    this.login = this.login.bind(this);
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

  login() {
    this.setState({ loading: true })
    this.authAPI.login(this.state.email, this.state.password, (res) => {
      this.setState({ loading: false })
      if (res == true) {
        this.props.navigation.navigate('Home')
      }
      else {
        Alert.alert('Error', res,
          [{ text: 'Ok' }])
      }
    })
  }

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      // <Block flex middle> 
      <Block flex middle >
        {/* <StatusBar hidden /> */}

        <ImageBackground
          // source={Images.GalaxyBackground} //Images.RegisterBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          {loader}
          <Block flex={0.62} middle>
            {/* <Block flex={1} top={true} style={{justifyContent:'flex-start'}}> */}
            <ImageBackground source={headerImg} resizeMode='contain' style={styles.headerImage}>
              <Block flex middle>
                <Image source={Images.petsImg} resizeMode='contain' style={{ marginTop: -50, width: '80%', height: '80%' }} />
              </Block>
            </ImageBackground>
          </Block>

          <Block flex>
            {/* <Block flex={0.15}>
              <Text color="#E1E1E1" size={32} style={{ marginLeft: 15, fontWeight: 'bold'}}>
                Welcome to PetWorld
              </Text>
            </Block> */}

            <Block flex={0.85} center>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={200}
              >
                <ScrollView style={{ width: width }}>
                  <Block flex={0.15}>
                    <Text color="#E1E1E1" size={30} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                      Welcome to PetWorld
                    </Text>
                  </Block>

                  <Block center width={width * 0.9} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      onChangeText={(email) => { this.setState({ email }) }}
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
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>
                  <Block center width={width * 0.9}>
                    <Input
                      password
                      viewPass
                      borderless
                      placeholder="Password"
                      onChangeText={(password) => { this.setState({ password }) }}
                      value={this.state.password}
                      iconContent={
                        <Icon
                          size={16}
                          //color={argonTheme.COLORS.ICON}
                          color={'white'}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>
                  <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                    <Text style={{
                      color: argonTheme.COLORS.PRIMARY, fontSize: 14, textAlign: 'right',
                      marginRight: width * 0.05
                    }}>
                      Forget Password?
                    </Text>
                  </TouchableOpacity>

                  <Block flex middle>
                    <Button color="primary" style={styles.loginButton} onPress={this.login}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>

                  <Block row flex center style={{ marginBottom: height * 0.05, marginTop: 30 }}>
                    <Text size={14} color={argonTheme.COLORS.WHITE}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                      <Text style={{ color: argonTheme.COLORS.PRIMARY, fontSize: 14 }}>
                        {"  "}Register now
                    </Text>
                    </TouchableOpacity>
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
  headerImage: {
    //width: '100%',
    //height: undefined,
    //aspectRatio: 1,
    width: width,
    height: height,
    //marginTop: -10,
    //scaleX: 1.2,
    justifyContent: 'flex-start',
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
  loginButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  }
});

export default Login;
