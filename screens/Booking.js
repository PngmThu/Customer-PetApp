import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';

import { ViewPager } from 'rn-viewpager'

import StepIndicator from 'react-native-step-indicator'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("screen");

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2.5,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ff1414', //orange: '#fe7013'
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#ff1414', //orange: '#fe7013'
  stepStrokeUnFinishedColor: '#000000', //gray: '#aaaaaa'
  separatorFinishedColor: '#ff1414', //orange: '#fe7013'
  separatorUnFinishedColor: '#000000', //gray: '#aaaaaa'
  stepIndicatorFinishedColor: '#ff1414', //orange: '#fe7013'
  stepIndicatorUnFinishedColor: '#170b0b',  //'#ffffff'
  stepIndicatorCurrentColor: '#170b0b', //'#ffffff'
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ff1414', //orange: '#fe7013'
  stepIndicatorLabelFinishedColor: '#170b0b', //'#ffffff'
  stepIndicatorLabelUnFinishedColor: '#000000', //gray: '#aaaaaa'
  labelColor: '#000000', //grey: '#999999'
  labelSize: 13,
  currentStepLabelColor: '#ff1414' //orange: '#fe7013'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#170b0b' : '#ff1414', //'#ffffff' : '#fe7013'
    size: 15
  }
  switch (position) {
    // case 0: {
    //   iconConfig.name = 'shopping-cart'
    //   break
    // }
    case 0: {
      iconConfig.name = 'location-on'
      break
    }
    case 1: {
      iconConfig.name = 'assessment'
      break
    }
    case 2: {
      iconConfig.name = 'payment'
      break
    }
    // case 4: {
    //   iconConfig.name = 'track-changes'
    //   break
    // }
    default: {
      break
    }
  }
  return iconConfig
}

var items = [
  {
    id: 1,
    name: 'Jurong Point Clinic',
  },
  {
    id: 2,
    name: 'Pasir Ris Clinic',
  },
  {
    id: 3,
    name: 'Yishun Clinic',
  },
  {
    id: 4,
    name: 'Jurong East Clinic',
  },
  {
    id: 5,
    name: 'Orchar Clinic',
  },
  {
    id: 6,
    name: 'Woodlands Clinic',
  },
  {
    id: 7,
    name: 'Bishan Clinic',
  },
  {
    id: 8,
    name: 'City Hall Clinic',
  },
];

var services = [
  {
    id: 1,
    name: 'Hair Cutting',
  },
  {
    id: 2,
    name: 'Health Check',
  },
  {
    id: 3,
    name: 'Beauty Service',
  },
  {
    id: 4,
    name: 'Massage',
  },
  {
    id: 5,
    name: 'Nutrition Consultant',
  },
];

var pets = [
  {
    id: 1,
    name: 'Momo (Hamster)',
  },
  {
    id: 2,
    name: 'Tom (Cat)',
  },
  {
    id: 3,
    name: 'Doggi (Dog)',
  },
];

class Booking extends React.Component {
  constructor () {
    super()
    this.state = {
      currentPage: 0,
      clinicInput: "",
      serviceInput: "",
      petInput: "",
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
    }
  }

  /*
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true })
  };
 
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false })
  };
 
  handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  */

  onStepPress = position => {
    this.setState({ currentPage: position })
  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  )

  renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    )
  }

  chooseClinicView = () => {
    console.log("height * 0.2:" + (height * 0.2));
    return (
      <Block flex>
        <Block flex middle>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            <ScrollView style={{ flex: 1, width: width}} keyboardShouldPersistTaps="handled">
              <Block flex={0.3}>
                <Text color="#E1E1E1" size={30} style={{ marginLeft: 15, fontWeight: 'bold'}}>
                  Choose a clinic
                </Text>
              </Block>

              <Block middle style={{height: height * 0.5}}>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    this.setState({ selectedItems: items, clinicInput: item.name });
                  }}
                  containerStyle={{ padding: 5, width: width * 0.8, top: height * 0.02,
                                     elevation: 1, position: "absolute", zIndex: 2,
                                    backgroundColor: "#333333", borderRadius: 10,}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: '#030205',
                    borderRadius: 10,
                  }}
                  itemTextStyle={{ color: '#E1E1E1' }}
                  itemsContainerStyle={{ maxHeight: 150 }}
                  items={items}
                  resetValue={false}
                  value={this.state.clinicInput}
                  textInputProps={
                    {
                      placeholder: "Choose...",
                      placeholderTextColor: "#525151",
                      underlineColorAndroid: "transparent",
                      //value: "",
                      style: {
                          padding: 5,
                          marginLeft: 10,
                          color: "#E1E1E1"
                      },
                      // onTextChange: text => {
                      //   const {clinicInput} = this.state;   
                      //   this.setState({ clinicInput: text });
                      // }
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />
                <Block flex middle style={{ elevation: 1, position: "absolute", zIndex: 1}}>
                  <Button color="primary" style={styles.button} onPress={() => this.setState({ currentPage: 1 })}>
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Next
                    </Text>
                  </Button>
                </Block> 
                 
              </Block>

              {/* Google Map here */}
              <Block flex>
            
              </Block>
              
              <Block flex style={{ alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.setState({ currentPage: 1 })}>
                <Block flex middle style={{flexDirection: 'row'}}>
                  <Text bold style={{color: '#ff0f0f',fontSize: 18, paddingBottom: 4}}>
                    Next
                  </Text>
                  <AntDesign name='doubleright' size={28} color='#ff0f0f' style={{padding: 5}} />
                </Block>
              </TouchableOpacity>
            </Block>
            </ScrollView>

            {/* <Block width={width * 0.9} style={{ marginTop: 40}}>
              <Input
                borderless 
                placeholder="Email"
                iconContent={
                  <Icon
                    size={16}
                    color={'#5E5454'}
                    name="ic_mail_24px"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
                style={{backgroundColor: '#333333'}}
              />
            </Block> */}

            {/* <Block flex middle style={{marginBottom: height * 0.08}}>
              <Button color="primary" style={styles.button} onPress={() => this.setState({ currentPage: 1 })}>
                <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                  Next
                </Text>
              </Button>
            </Block>  */}
            

          </KeyboardAvoidingView>

        </Block>
      </Block>
    )
  }

  DetailsView = () => {
    console.log("height * 0.2:" + (height * 0.2));
    return (
      <Block flex>
        <Block flex middle>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            <ScrollView style={{ flex: 1, width: width}} keyboardShouldPersistTaps="handled">
              {/* <Block flex={0.3}> */}

              <Block>
                <Text color="#E1E1E1" size={20} 
                      style={{ marginLeft: width * 0.05, marginBottom: 5,
                               fontWeight: 'bold'}}>
                  Clinic   
                </Text>
              </Block>

              <Block style={{ alignSelf: 'center',width: width * 0.9, height: 50, justifyContent: 'center',
                              marginBottom: 15 ,borderRadius: 10, backgroundColor: "#333333"}}>
                <Text style={{padding: 10,color: '#E1E1E1',
                          marginLeft: 10}}>
                  {this.state.clinicInput}
                </Text>
              </Block>

              <Block style={{height: height * 0.5}}>
                <Block>
                  <Text color="#E1E1E1" size={20} 
                        style={{ marginLeft: width * 0.05, marginBottom: 5,
                                fontWeight: 'bold'}}>
                    Service   
                  </Text>
                </Block>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    this.setState({ selectedItems: items, serviceInput: item.name });
                  }}
                  containerStyle={{ padding: 5, width: width * 0.9, top: 32,
                                     elevation: 1, position: "absolute", zIndex: 5,
                                    backgroundColor: "#333333", borderRadius: 10,
                                    alignSelf: 'center'}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: '#030205',
                    borderRadius: 10,
                  }}
                  itemTextStyle={{ color: '#E1E1E1' }}
                  itemsContainerStyle={{ maxHeight: 150 }}
                  items={services}
                  resetValue={false}
                  value={this.state.serviceInput}
                  textInputProps={
                    {
                      placeholder: "Choose...",
                      placeholderTextColor: "#525151",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 5,
                          marginLeft: 10,
                          color: "#E1E1E1"
                      },
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />
              </Block>
              
              <Block style={{height: height * 0.5, marginTop: -height * 0.5 + 90}}>
                <Block>
                  <Text flex color="#E1E1E1" size={20} 
                        style={{ marginLeft: width * 0.05, marginBottom: 5,
                                  fontWeight: 'bold'}}>
                    Pet   
                  </Text>
                </Block>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    this.setState({ selectedItems: items, petInput: item.name });
                  }}
                  containerStyle={{ padding: 5, width: width * 0.9, top: 32,
                                    elevation: 1, position: "absolute", zIndex: 4,
                                    backgroundColor: "#333333", borderRadius: 10,
                                    alignSelf: 'center'}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: '#030205',
                    borderRadius: 10,
                  }}
                  itemTextStyle={{ color: '#E1E1E1' }}
                  itemsContainerStyle={{ maxHeight: 150}}
                  items={pets}
                  resetValue={false}
                  value={this.state.petInput}
                  textInputProps={
                    {
                      placeholder: "Choose...",
                      placeholderTextColor: "#525151",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 5,
                          marginLeft: 10,
                          color: "#E1E1E1"
                      },
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />
                
              </Block>
              
              {/* <View>
                <Button title="Show Date Picker" onPress={this.showDatePicker()} />
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleConfirm()}
                  onCancel={this.hideDatePicker()}
                />
              </View> */}
              
              <Block flex style={{ alignItems: 'flex-end', marginTop: -30}}>
                <TouchableOpacity onPress={() => this.setState({ currentPage: 1 })}>
                  <Block flex middle style={{flexDirection: 'row'}}>
                    <Text bold style={{color: '#ff0f0f',fontSize: 18, paddingBottom: 4}}>
                      Next
                    </Text>
                    <AntDesign name='doubleright' size={28} color='#ff0f0f' style={{padding: 5}} />
                  </Block>
                </TouchableOpacity>
              </Block>
            </ScrollView>

            {/* <Block width={width * 0.9} style={{ marginTop: 40}}>
              <Input
                borderless 
                placeholder="Email"
                iconContent={
                  <Icon
                    size={16}
                    color={'#5E5454'}
                    name="ic_mail_24px"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
                style={{backgroundColor: '#333333'}}
              />
            </Block> */}

            {/* <Block flex middle style={{marginBottom: height * 0.08}}>
              <Button color="primary" style={styles.button} onPress={() => this.setState({ currentPage: 1 })}>
                <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                  Next
                </Text>
              </Button>
            </Block>  */}
            

          </KeyboardAvoidingView>

        </Block>
      </Block>
    )
  }

  renderPage(currentPage) {
    switch(currentPage) {
      case 0:
        return (<this.chooseClinicView />);
      case 1:
        return (<this.DetailsView />);
      default:
        return (<this.chooseClinicView />);
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex middle >
        {/* <StatusBar hidden /> */}
        
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1}}
        >
          <Block flex={0.28} style={{justifyContent:'flex-start'}}>
            <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='contain' style={styles.headerImage}>
                <View style={styles.stepIndicator}>
                  <StepIndicator
                    renderStepIndicator={this.renderStepIndicator}
                    customStyles={secondIndicatorStyles}
                    stepCount={3}
                    currentPosition={this.state.currentPage}
                    onPress={this.onStepPress}
                    labels={[
                      //'Cart',
                      'Location',
                      'Details',
                      'Confirm',
                      //'Track'
                    ]}
                  />
                </View>
            </ImageBackground> 
          </Block>
          
          {this.renderPage(this.state.currentPage)}
          
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height * 0.21,
    //justifyContent:'flex-start',
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
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 40
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  }
});

export default Booking;
