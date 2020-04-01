import React, { Component, useState } from 'react';
import { Block, Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, Alert, FlatList } from 'react-native';

import { Input, Icon, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import PetAPI from '../api/PetAPI'
import AuthAPI from '../api/AuthAPI'


const { width, height } = Dimensions.get("screen");

export default class PetProfile extends React.Component {
  state = {
    edit: false,
    popUpDialog: false,
    name: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    type: "",
    petId: "",
  }

  constructor(props) {
    super(props);
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
    this.retrieveData = this.retrieveData.bind(this);
    this.deletePet = this.deletePet.bind(this);
    this.pet = new Object();
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
  }

  componentWillUnmount() {
    this.didFocus.remove();

  }

  retrieveData() {
  const petId = this.props.navigation.state.params.pet._id;
    this.petAPI.getPetById(petId, (pet) => {
      this.setState({ name: pet.name, dateOfBirth: pet.dateOfBirth, weight: pet.weight, height: pet.height, type: pet.type, petId: petId});
    })
  }

  updatePet(state){
    console.log(state);
    this.pet.name = state.name;
    this.pet.dateOfBirth = state.dateOfBirth;
    this.pet.weight = state.weight;
    this.pet.height = state.height;
    this.pet.type = state.type;
    this.petAPI.updatePetById(this.pet._id, this.pet, (res) => {
      console.log(res);
      //this.setState({ name: pet.name, dateOfBirth: pet.dateOfBirth, weight: pet.weight, height: pet.height, type: pet.type});
    })
  }

  deletePet(petId) {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to delete pet?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.petAPI.deletePetByPetId(petId, (result) => {
              if (result == true) {
                this.props.navigation.navigate('Home');
              }
            })
          }
        },
      ],
      { cancelable: false }
    )
  }


  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{ flex: 1, width: '100%', height: '100%' }}>
        {/* <Block flex={0.28} style={{justifyContent:'flex-start'}}>
          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='contain' style={styles.headerImage}> */}
        <ScrollView>
          <View>
            <Button color="primary" style={{ marginLeft: 210, marginTop: 20, marginBottom: 10, width: width * 0.3 }} onPress={() => this.deletePet(this.state.petId)}>
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
              containerStyle={{ marginLeft: 150, marginTop: 30 }}
            />
          </View>
          <View>
            <ToggleSwitch
              isOn={this.state.edit}
              onColor={"green"}
              offColor={"#999999"}
              label="Edit"
              labelStyle={{ color: "white", fontWeight: "100", marginLeft: 240, marginTop: 20, marginBottom: 10 }}
              size="medium"
              onToggle={(isOn) => {this.setState({edit: isOn})}}
            />
          </View>
          <View>
            <Text bold size={14} style={{ marginTop: 10, marginLeft: 40, color: '#b4bd00' }}>
              Name:
      </Text>
          </View>
          <View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
            <Input
              borderless
              editable={this.state.edit}
              onChangeText={(name) => {this.setState({name})}}
              placeholder="  Pet Name"
              placeholderTextColor='#000000'
              style={{ backgroundColor: '#f49e19' }}
              value={'  ' + this.state.name}
              iconContent={
                <Icon
                  size={16}
                  color={'#ffffff'}
                  name="hat-3"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
              style={{backgroundColor: '#333333'}}
            />
          </View>
          <View>
            <Text bold size={14} style={{ marginTop: 5, marginLeft: 40, color: '#b4bd00' }}>
              Animal Type:
      </Text>
          </View>
          <View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
          <Input
              borderless
              editable={this.state.edit}
              onChangeText={(type) => {this.setState({type})}}
              placeholder="  Pet Type"
              placeholderTextColor='#000000'
              style={{ backgroundColor: '#f49e19' }}
              value={'  ' + this.state.type}
              iconContent={
                <Icon
                  size={16}
                  color={'#ffffff'}
                  name="shop"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
              style={{backgroundColor: '#333333'}}
            />
          </View>
          <View>
            <Text bold size={14} style={{ marginTop: 5, marginLeft: 40, color: '#b4bd00' }}>
              Height:
      </Text>
          </View>
          <View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
          <Input
              borderless
              editable={this.state.edit}
              onChangeText={(height) => {this.setState({height})}}
              placeholder="  Pet Height"
              placeholderTextColor='#000000'
              style={{ backgroundColor: '#f49e19' }}
              value={'  ' + this.state.height}
              iconContent={
                <Icon
                  size={16}
                  color={'#ffffff'}
                  name="palette"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
              style={{backgroundColor: '#333333'}}
            />
          </View>
          <View>
            <Text bold size={14} style={{ marginTop: 5, marginLeft: 40, color: '#b4bd00' }}>
              Weight:
      </Text>
          </View>
          <View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
          <Input
              borderless
              editable={this.state.edit}
              onChangeText={(weight) => {this.setState({weight})}}
              placeholder="  Pet Weight"
              placeholderTextColor='#000000'
              style={{ backgroundColor: '#f49e19' }}
              value={'  ' + this.state.weight}
              iconContent={
                <Icon
                  size={16}
                  color={'#ffffff'}
                  name="palette"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
              style={{backgroundColor: '#333333'}}
            />
          </View>
          <View>
            <Text bold size={14} style={{ marginTop: 5, marginLeft: 40, color: '#b4bd00' }}>
              Date Of Birth:
      </Text>
          </View>
          <View width={width * 0.8} style={{ marginTop: 0, marginLeft: 40 }}>
          <Input
              borderless
              editable={this.state.edit}
              onChangeText={(dateOfBirth) => {this.setState({dateOfBirth})}}
              placeholder="  Pet Date Of Birth"
              placeholderTextColor='#000000'
              style={{ backgroundColor: '#f49e19' }}
              value={'  ' + this.state.dateOfBirth}
              iconContent={
                <Icon
                  size={16}
                  color={'#ffffff'}
                  name="calendar-date"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
              style={{backgroundColor: '#333333'}}
            />
          </View>
          
          <View>
            <Button color="primary" style={{ marginLeft: 130, marginTop: 15, marginBottom: 20, width: width * 0.3 }} onPress = {this.updatePet(this.state)}>
              <Text bold size={14} color={'#9857ff'}>
                Save
      </Text>
            </Button>
          </View>
          <View>
            <Button color="primary" style={{ marginLeft: 95, marginTop: 10, marginBottom: 20, width: width * 0.5 }}>
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


