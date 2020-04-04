import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Icon, Button } from "../components";
import Input2 from "../components/Input2";
import { Images, argonTheme } from "../constants";
import { Avatar } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class AddPet extends React.Component {
  constructor () {
    super()
    this.state = {
      name: "",
      type: "",
      weight: "",
      height: "",
      date: "",
      successDialogVisible: false,
    };
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ 
        name: "",
        type: "",
        weight: "",
        height: "",
        date: "",
        successDialogVisible: false,
      })
    })

  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  createPet = async () => {
    let customerId = await this.authAPI.retrieveCustomerId();

    const {date} = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0); 

    let pet = new Object({
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      type: this.state.type,
      customerId: customerId,
      dateOfBirth: mydate
    })
    
    this.petAPI.createPet(pet, (res) => {
      console.log("Can create pet?: ", res);
      if(res){
        this.setState({
          successDialogVisible: true,
        });
        setTimeout(() => {
          this.setState({
            successDialogVisible: false,
          });
          this.props.navigation.goBack();
        }, 2000);
      }
      else{
        Alert.alert('Error', "Server error",
        [{text: 'Ok'}])
      }
    })
  }

  render() {
    var todayDate = new Date().toISOString().slice(0,10);

    return (
      <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
              <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}/>
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
              Pet Register
            </Text>
          </View>
        </ImageBackground>
        
        <Block flex>
          <Block flex middle>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <ScrollView style={{ flex: 1, width: width, marginTop: 10}} keyboardShouldPersistTaps="handled">
                <View width={width * 0.9} style={{ marginTop: 5, alignSelf: 'center' }}>
                  <Input2
                    borderless 
                    placeholder="Name"
                    placeholderTextColor='#505050'
                    onChangeText={(name) => {this.setState({name})}}
                    value={this.state.name}
                    style={styles.inputStyle}
                  />
                </View>
                <View width={width * 0.9} style={{ marginTop: 5, alignSelf: 'center' }}>
                  <Input2
                    borderless 
                    placeholder="Type"
                    placeholderTextColor='#505050'
                    onChangeText={(type) => {this.setState({type})}}
                    value={this.state.type}
                    style={styles.inputStyle}
                  />
                </View>
                <View width={width * 0.9} style={{ marginTop: 5, alignSelf: 'center'}}>
                  <Input2
                    borderless 
                    placeholder="Weight"
                    placeholderTextColor='#505050'
                    onChangeText={(weight) => {this.setState({weight})}}
                    value={this.state.weight}
                    style={styles.inputStyle}
                  />
                </View>
                <View width={width * 0.9} style={{ marginTop: 5, alignSelf: 'center'}}>
                  <Input2
                    borderless 
                    placeholder="Height"
                    placeholderTextColor='#505050'
                    onChangeText={(height) => {this.setState({height})}}
                    value={this.state.height}
                    style={styles.inputStyle}
                  />
                </View>
                
                <DatePicker
                  style={{width: width * 0.9, height: 44, marginTop: 15,
                          backgroundColor: "#282828", borderRadius: 8,
                          alignSelf: 'center', justifyContent: 'center'}}
                  date={this.state.date}
                  mode="date"
                  placeholder="Date of birth"
                  format="YYYY-MM-DD"
                  minDate="2000-01-01"
                  maxDate={todayDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <FontAwesome name='calendar-check-o' size={20} color='#511efa' style={{padding: 10}} />
                  }
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: -20,
                      top: 4,
                    },
                    dateInput: {
                      borderWidth: 0,
                      alignItems: "flex-start",
                      padding: 10,
                      marginLeft: 10,
                    },
                    dateText: {
                      color: "#E1E1E1",
                    },
                    placeholderText: {
                      color: '#505050'
                    },
                    modalStyle: {
                      backgroundColor: "#282828",
                    },
                    modalOverlayStyle: {
                      backgroundColor: "#282828",
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
              
                <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20}}>
                  <Button color="primary" style={styles.button} 
                    onPress={() => this.createPet()}
                    >
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Add
                    </Text>
                  </Button>
                </Block>
                
                
              </ScrollView>

              <Dialog
                visible={this.state.successDialogVisible}
                dialogStyle={{
                  borderRadius: 15, backgroundColor: "#232124", 
                  borderWidth: 4, width: width * 0.6,
                  alignSelf: 'center',
                }}
                onTouchOutside={() => this.setState({successDialogVisible: false})} >
                <Block flex middle style={{flexDirection: 'row'}}>
                  <AntDesign name='checkcircleo' size={25} color='#1df232' style={{marginRight: 10, marginBottom: -4 }} />
                  <Text bold style={{color: '#E1E1E1', fontSize: 16, marginBottom: -4}}>
                    Created successfully
                  </Text>
                </Block>
              </Dialog> 

            </KeyboardAvoidingView>

          </Block>
        </Block>

      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 80
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
  backArrow: {
    left: 10, 
    top: 10, 
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
  },
  inputStyle: {
    backgroundColor: "#282828"
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },
});