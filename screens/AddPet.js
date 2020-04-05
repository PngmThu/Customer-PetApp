import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker
} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import Input from "../components/Input";
import { Icon, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class AddPet extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      species: "",
      breed: "",
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
        species: "",
        breed: "",
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

  validateInput() {
    var str = "";
    if (!this.state.name)
      str += "name";
    if (!this.state.species) {
      if (str == "")
        str += "species";
      else
        str += ", species";
    }
    if (!this.state.weight) {
      if (str == "")
        str += "weight";
      else
        str += ", weight";
    }
    if (!this.state.height) {
      if (str == "")
        str += "height";
      else
        str += ", height";
    }
    if (!this.state.date) {
      if (str == "")
        str += "date of birth";
      else
        str += ", date of birth";
    }
    if (str != "") {
      Alert.alert('Error', "Input field can not be empty: " + str,
        [{ text: 'OK' }])
      return false;
    }
    return true;
  }

  createPet = async () => {
    if (!this.validateInput()) {
      return;
    }

    let customerId = await this.authAPI.retrieveCustomerId();

    const { date } = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0);

    let pet = new Object({
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      species: this.state.species,
      breed: this.state.breed,
      customerId: customerId,
      dateOfBirth: mydate
    })

    this.petAPI.createPet(pet, (res) => {
      if (res) {
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
      else {
        Alert.alert('Error', "Server error",
          [{ text: 'Ok' }])
      }
    })
  }

  render() {
    var todayDate = new Date().toISOString().slice(0, 10);

    return (
      <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
              Pet Register
            </Text>
          </View>
        </ImageBackground>


        <Dialog
          visible={this.state.successDialogVisible}
          dialogStyle={{
            borderRadius: 15, backgroundColor: "#232124",
            borderWidth: 4, width: width * 0.6,
            alignSelf: 'center',
          }}
          onTouchOutside={() => this.setState({ successDialogVisible: false })} >
          <Block flex middle style={{ flexDirection: 'row' }}>
            <AntDesign name='checkcircleo' size={25} color='#1df232' style={{ marginRight: 10, marginBottom: -4 }} />
            <Text bold style={{ color: '#E1E1E1', fontSize: 16, marginBottom: -4 }}>
              Created successfully
                  </Text>
          </Block>
        </Dialog>

        <ScrollView style={{ flex: 1, width: width, marginTop: 10 }} keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            <Block flex middle>
              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Name
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                <Input
                  borderless
                  placeholder=""
                  onChangeText={(name) => { this.setState({ name }) }}
                  value={this.state.name}
                  iconContent={
                    <SimpleLineIcons
                      size={16}
                      color={'#ffffff'}
                      name="arrow-right"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                />
              </View>

              <Block style={styles.textField}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Species
                  </Text>
              </Block>
              <View width={width * 0.9} style={{
                alignSelf: 'center',
                backgroundColor: this.state.edit ? '#333333' : '#1f1f1f',
                borderRadius: 9,
                marginTop: 10
              }}>
                <MaterialIcons name="list" size={16} color="white"
                  style={styles.pickerIcon}
                />
                <Picker
                  selectedValue={this.state.species}
                  style={{
                    width: "100%",
                    backgroundColor: 'transparent',
                    height: 44,
                    color: "#cccccc",
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    borderRadius: 10,
                  }}
                  itemStyle={{
                    backgroundColor: "white",
                    paddingLeft: 50
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ species: itemValue });
                  }}>
                  <Picker.Item label="" value="" />
                  <Picker.Item label="Cat" value="cat" />
                  <Picker.Item label="Dog" value="dog" />
                  <Picker.Item label="Bird" value="bird" />
                </Picker>
              </View>

              <Block style={styles.textField}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Breed
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                <Input
                  borderless
                  placeholder=""
                  onChangeText={(breed) => { this.setState({ breed }) }}
                  value={this.state.breed}
                  iconContent={
                    <MaterialIcons
                      size={16}
                      color={'#ffffff'}
                      name="pets"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                />
              </View>

              <Block style={styles.textField}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Weight(kg)
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                <Input
                  borderless
                  placeholder=""
                  onChangeText={(weight) => { this.setState({ weight }) }}
                  value={this.state.weight}
                  iconContent={
                    <MaterialCommunityIcons
                      size={16}
                      color={'#ffffff'}
                      name="weight"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                />
              </View>

              <Block style={styles.textField}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Height(m)
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                <Input
                  borderless
                  placeholder=""
                  onChangeText={(height) => { this.setState({ height }) }}
                  value={this.state.height}
                  iconContent={
                    <MaterialCommunityIcons
                      size={16}
                      color={'#ffffff'}
                      name="ruler"
                      family="ArgonExtra"
                      style={styles.inputIcons}
                    />
                  }
                  style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                />
              </View>

              <Block style={styles.textField}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Date of birth
                  </Text>
              </Block>
              <DatePicker
                style={{
                  width: width * 0.9, height: 44, marginTop: 8,
                  backgroundColor: "#1f1f1f", borderRadius: 10,
                  justifyContent: 'center', alignSelf: 'center'
                }}
                date={this.state.date}
                mode="date"
                placeholder="Choose..."
                format="YYYY-MM-DD"
                minDate="1996-01-01"
                maxDate={todayDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  disabled: {
                    backgroundColor: "#1f1f1f"
                  },
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start",
                    padding: 10,
                    marginLeft: 10,
                  },
                  dateText: {
                    color: "#ffffff",
                  },
                  placeholderText: {
                    color: '#505050'
                  },
                  modalStyle: {
                    backgroundColor: "#1f1f1f",
                  },
                  modalOverlayStyle: {
                    backgroundColor: "#1f1f1f",
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />

              <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
                <Button color="primary" style={styles.button}
                  onPress={() => this.createPet()}
                >
                  <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                    Add
                    </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </ScrollView>
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
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
  },
  inputStyle: {
    backgroundColor: "#282828"
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },
  pickerIcon: {
    marginRight: 10,
    position: 'absolute',
    paddingTop: 14,
    paddingLeft: 15,
    zIndex: 10,
    elevation: 10
  },
  textField: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 5
  },
});