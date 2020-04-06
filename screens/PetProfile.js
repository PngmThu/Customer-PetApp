import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView, Image,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker
} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Icon, Button } from "../components";
import Input from "../components/Input";
import { Images, argonTheme } from "../constants";
import { MaterialIcons, SimpleLineIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';
import ToggleSwitch from 'toggle-switch-react-native';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class PetProfile extends React.Component {
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
      edit: false,
      popUpDialog: false,
      petId: "",
      pet: null,
      message: "",
    };
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
    const pet = this.props.navigation.state.params.pet;

    var date = new Date(pet.dateOfBirth);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    var dateString = date.toISOString().split("T")[0];

    this.setState({
      petId: pet._id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      weight: pet.weight.toString(),
      height: pet.height.toString(),
      date: dateString,
      loading: false,
    })
  }

  UpdatePetProfile = async () => {
    if (!this.validateInput()) {
      return;
    }

    let customerId = await this.authAPI.retrieveCustomerId();

    const { date } = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0);

    let pet = new Object({
      _id: this.state.petId,
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      species: this.state.species,
      breed: this.state.breed,
      customerId: customerId,
      dateOfBirth: mydate
    })

    this.petAPI.updatePetById(pet, (res) => {
      if (res) {
        this.setState({
          message: "Updated successfully!",
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

  deletePet(petId) {
    Alert.alert(
      'Delete Pet',
      'Are you sure to delete this pet?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.petAPI.deletePetByPetId(petId, (res) => {
              if (res) {
                this.setState({
                  message: "Deleted successfully!",
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
        },
      ],
      { cancelable: false }
    )
  }

  get imageSource() {
    switch (this.state.species) {
      case "cat":
        return require('../assets/imgs/cat.png');
      case "dog":
        return require('../assets/imgs/dog.png');
      case "bird":
        return require('../assets/imgs/bird.png');
      default:
        return null
    }
  }
  render() {

    if (this.state.species) {
      var img = <Image resizeMode='contain' source={this.imageSource} style={styles.imgPet} />
    }
    else {
      img = null
    }

    return (
      <ImageBackground source={require("../assets/imgs/galaxy_bg.jpg")} resizeMode='cover' style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
              Pet Profile
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
              {this.state.message}
            </Text>
          </Block>
        </Dialog>

        <ScrollView style={{ flex: 1, width: width, marginTop: 10 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            <Block flex middle>
              <Block style={styles.buttonRow}>
                <Button style={styles.deleteButton} onPress={() => this.deletePet(this.state.petId)}>
                  <Text bold size={14} color={'black'}>
                    Delete pet
                    </Text>
                </Button>

                <ToggleSwitch
                  isOn={this.state.edit}
                  onColor={"#511efa"}
                  offColor={"#999999"}
                  label="Edit"
                  labelStyle={{
                    color: "white", fontWeight: "100",
                  }}
                  size="medium"
                  onToggle={(isOn) => { this.setState({ edit: isOn }) }}
                />
              </Block>

              {img}

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="#E1E1E1" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Name
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                <Input
                  borderless
                  editable={this.state.edit}
                  placeholder="Name"
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
                  enabled={this.state.edit}
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
                  <Picker.Item label="Species" value="" />
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
                  editable={this.state.edit}
                  placeholder="Breed"
                  placeholderTextColor='#505050'
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
                  editable={this.state.edit}
                  placeholder="Weight"
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
                  editable={this.state.edit}
                  placeholder="Height"
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
                disabled={!this.state.edit}
                mode="date"
                placeholder="Date of Birth"
                format="YYYY-MM-DD"
                minDate="1996-01-01"
                maxDate="2022-02-06"
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

              {this.state.edit ?
                <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
                  <Button color="primary" style={styles.button}
                    onPress={() => this.UpdatePetProfile()}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Save
                      </Text>
                  </Button>
                </Block>
                :
                <Block flex middle style={{ elevation: 1, height: height * 0.1 }} />
              }
            </Block>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const imgs = {
  'cat': 'https://drive.google.com/open?id=1jWdUyCNEcycVt9qaY2DTctZTnXfmQ28U',
  'dog': 'https://drive.google.com/open?id=1iFH_6_qt8OFqHkSMvlC_QB2qFZu9HtIv',
  'bird': 'https://drive.google.com/open?id=1iFH_6_qt8OFqHkSMvlC_QB2qFZu9HtIv'
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
  inputStyle: {
    backgroundColor: "#282828"
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },
  deleteButton: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "red",
  },
  buttonRow: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 5
  },
  textField: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 5
  },
  inputIcons: {
    marginRight: 12,
  },
  pickerIcon: {
    marginRight: 10,
    position: 'absolute',
    paddingTop: 14,
    paddingLeft: 15,
    zIndex: 10,
    elevation: 10
  },
  imgPet: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});