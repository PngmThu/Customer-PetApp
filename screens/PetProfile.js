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
import ToggleSwitch from 'toggle-switch-react-native';
import Loader from '../components/Loader';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class PetProfile extends React.Component {
  constructor () {
    super()
    this.state = {
      name: "",
      type: "",
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

    var date =  new Date(pet.dateOfBirth);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() + (offset * 60 * 1000));
    var dateString = date.toISOString().split("T")[0];

    // var localDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    // console.log("localDate: " + localDate.toString());

    this.setState({
      petId: pet._id,
      name: pet.name,
      type: pet.type,
      weight: pet.weight.toString(),
      height: pet.height.toString(),
      date: dateString,
      loading: false,
    })
  }

  UpdatePetProfile = async () => {
    if(!this.validateInput()){
      return;
    }

    let customerId = await this.authAPI.retrieveCustomerId();

    const {date} = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0); 

    let pet = new Object({
      _id: this.state.petId,
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      type: this.state.type,
      customerId: customerId,
      dateOfBirth: mydate
    })

    this.petAPI.updatePetById(pet, (res) => {
      console.log("Can update pet?: ", res);
      if(res){
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
      else{
        Alert.alert('Error', "Server error",
        [{text: 'Ok'}])
      }
    })

  }

  validateInput(){
    if(!this.state.name || !this.state.type || !this.state.weight || !this.state.height || !this.state.date){
      Alert.alert('Error', "Input field can not be empty",
      [{text: 'OK'}])
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
              else{
                Alert.alert('Error', "Server error",
                [{text: 'Ok'}])
              }
            })
          }
        },
      ],
      { cancelable: false }
    )
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
              Pet Profile
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
                <Block style={styles.buttonRow}>
                  <Button style={styles.deleteButton} onPress={() => this.deletePet(this.state.petId)}>
                    <Text bold size={14} color={'black'}>
                      Delete pet
                    </Text>
                  </Button>

                  <ToggleSwitch
                    isOn={this.state.edit}
                    onColor={"green"}
                    offColor={"#999999"}
                    label="Edit"
                    labelStyle={{ color: "white", fontWeight: "100", 
                                  //marginLeft: 240, marginTop: 20, marginBottom: 10 
                    }}
                    size="medium"
                    onToggle={(isOn) => {this.setState({edit: isOn})}}
                  />
                </Block>
                
                <Block style={{width: width * 0.9, alignSelf: 'center', marginTop: 15}}>
                  <Text color="#E1E1E1" size={18} style={{marginLeft: 15, fontWeight: 'bold'}}>
                    Name
                  </Text>
                </Block>
                <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                  <Input2
                    borderless 
                    editable={this.state.edit}
                    placeholder="Name"
                    placeholderTextColor='#505050'
                    onChangeText={(name) => {this.setState({name})}}
                    value={this.state.name}
                    style={styles.inputStyle}
                  />
                </View>
                <Block style={styles.textField}>
                  <Text color="#E1E1E1" size={18} style={{marginLeft: 15, fontWeight: 'bold'}}>
                    Type
                  </Text>
                </Block>
                <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                  <Input2
                    borderless 
                    editable={this.state.edit}
                    placeholder="Type"
                    placeholderTextColor='#505050'
                    onChangeText={(type) => {this.setState({type})}}
                    value={this.state.type}
                    style={styles.inputStyle}
                  />
                </View>
                <Block style={styles.textField}>
                  <Text color="#E1E1E1" size={18} style={{marginLeft: 15, fontWeight: 'bold'}}>
                    Weight(kg)
                  </Text>
                </Block>
                <View width={width * 0.9} style={{ alignSelf: 'center'}}>
                  <Input2
                    borderless 
                    editable={this.state.edit}
                    placeholder="Weight"
                    placeholderTextColor='#505050'
                    onChangeText={(weight) => {this.setState({weight})}}
                    value={this.state.weight}
                    style={styles.inputStyle}
                  />
                </View>
                <Block style={styles.textField}>
                  <Text color="#E1E1E1" size={18} style={{marginLeft: 15, fontWeight: 'bold'}}>
                    Height(m)
                  </Text>
                </Block>
                <View width={width * 0.9} style={{ alignSelf: 'center'}}>
                  <Input2
                    borderless 
                    editable={this.state.edit}
                    placeholder="Height"
                    placeholderTextColor='#505050'
                    onChangeText={(height) => {this.setState({height})}}
                    value={this.state.height}
                    style={styles.inputStyle}
                  />
                </View>
                
                <Block style={styles.textField}>
                  <Text color="#E1E1E1" size={18} style={{marginLeft: 15, fontWeight: 'bold'}}>
                    Date of birth
                  </Text>
                </Block>
                <DatePicker
                  style={{width: width * 0.9, height: 44, marginTop: 8,
                          backgroundColor: "#282828", borderRadius: 10,
                          justifyContent: 'center', alignSelf: 'center' }}
                  date={this.state.date}
                  disabled={!this.state.edit}
                  mode="date"
                  placeholder="Date of Birth"
                  format="YYYY-MM-DD"
                  minDate="1996-01-01"
                  maxDate="2022-02-06"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <FontAwesome name='calendar-check-o' size={16} color='#511efa' style={{padding: 10}} />
                  }
                  customStyles={{
                    disabled:{
                      backgroundColor: "#282828"
                    },
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
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
                      backgroundColor: "#333333",
                    },
                    modalOverlayStyle: {
                      backgroundColor: "#333333",
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
              
                {this.state.edit ?
                  <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20}}>
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
                    {this.state.message}
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
  }
});