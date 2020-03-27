import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';

import { Input, Icon, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar } from 'react-native-elements';

const { width, height } = Dimensions.get("screen");

export default class AddPet extends React.Component {

  addPetAlert=()=>{
    alert('Pet added!');
  }

  render() {
  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>Add a pet!</Text>
    // </View>
    <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
    <ScrollView>
    <View>
    <Avatar
  rounded
  icon={{name: 'photo'}}
  showEditButton
  size='large'
  containerStyle={{marginLeft:150, marginTop:30}}
/>
    </View>
    <View width={width * 0.9} style={{ marginTop: 30, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Name"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View width={width * 0.9} style={{ marginTop: 5, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Animal Type"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View width={width * 0.9} style={{ marginTop: 5, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Breed"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View width={width * 0.9} style={{ marginTop: 5, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Gender"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View width={width * 0.9} style={{ marginTop: 5, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Weight"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View width={width * 0.9} style={{ marginTop: 5, marginLeft:20 }}>
      <Input
        borderless 
        placeholder="  Allergies/Medical Information"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View> 
    <Button onPress={this.addPetAlert} color="primary" style={{marginLeft: 130, marginTop: 15, width: width * 0.3}}>
      <Text bold size={14} color={'#00bfff'}>
        Add My Pet!
      </Text>
    </Button>
</View>
    </ScrollView>
    </ImageBackground>
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