import React, { Component } from 'react';
import { Block, Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatList } from 'react-native';

import { Input, Icon, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem } from 'react-native-elements';
import ToggleSwitch  from 'toggle-switch-react-native';

const { width, height } = Dimensions.get("screen");

export default class PetProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
  return (
    <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
      {/* <Block flex={0.28} style={{justifyContent:'flex-start'}}>
          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='contain' style={styles.headerImage}> */}
    <ScrollView>
    <View>
    <Button color="primary" style={{marginLeft: 210, marginTop: 20, marginBottom: 10, width: width * 0.3}}>
      <Text bold size={14} color={'#dda0dd'}>
        Delete pet
      </Text>
    </Button>
    </View>
      <View>
    <Avatar
  rounded
  source={{
    uri:
      'https://www.thesprucepets.com/thmb/etEd67tJ5QzX77hFJUeA9LiXnyA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg',
  }}
  showEditButton
  size='large'
  containerStyle={{marginLeft:150, marginTop:30}}
/>
</View>
<View>
  <ToggleSwitch
  isOn={false}
  onColor="green"
  offColor="#808080"
  label="Edit"
  labelStyle={{ color: "white", fontWeight: "100", marginLeft:240, marginTop:20, marginBottom:10 }}
  size="medium"
  onToggle={isOn => console.log("changed to : ", isOn)}
/>
</View>
<View>
<Text bold size={14} style={{marginTop:10, marginLeft:40, color:'#b4bd00'}}>
        Name:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft:40 }}>
      <Input
        borderless 
        placeholder="  Brownie"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View>
<Text bold size={14} style={{marginTop:5, marginLeft:40, color:'#b4bd00'}}>
        Animal Type:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft:40 }}>
      <Input
        borderless 
        placeholder="  Dog"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View>
<Text bold size={14} style={{marginTop:5, marginLeft:40, color:'#b4bd00'}}>
        Breed:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft:40 }}>
      <Input
        borderless 
        placeholder="  Bichon Frise"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View>
<Text bold size={14} style={{marginTop:5, marginLeft:40, color:'#b4bd00'}}>
        Gender:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
      <Input
        borderless 
        placeholder="  Male"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View>
<Text bold size={14} style={{marginTop:5, marginLeft:40, color:'#b4bd00'}}>
        Weight:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft:40 }}>
      <Input
        borderless 
        placeholder="  3.5kg"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View>
<Text bold size={14} style={{marginTop:5, marginLeft:40, color:'#b4bd00'}}>
        Allergies/Dietary Information:
      </Text>
</View>
<View width={width * 0.8} style={{ marginTop: 0, marginLeft:40 }}>
      <Input
        borderless 
        placeholder="  Allergic to nuts"
        placeholderTextColor='#000000'
        style={{backgroundColor: '#f49e19'}}
      />
    </View>
    <View> 
    <Button color="primary" style={{marginLeft: 130, marginTop: 15, marginBottom: 20, width: width * 0.3}}>
      <Text bold size={14} color={'#9857ff'}>
        Save
      </Text>
    </Button>
    </View>
    <View>
    <Button color="primary" style={{marginLeft: 95, marginTop: 10, marginBottom: 20, width: width * 0.5}}>
      <Text bold size={14} color={'#9857ff'}>
        Make a booking
      </Text>
    </Button>
    </View>
    </ScrollView>
    {/* </ImageBackground>
    </Block> */}
    </ImageBackground>
  );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    //borderBottomColor: '#cbd2d9',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40
    //backgroundColor: '#bada55',
}
});


