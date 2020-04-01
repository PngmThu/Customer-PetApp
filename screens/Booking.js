import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView, 
  Platform
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input,
 } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

import { ViewPager } from 'rn-viewpager'

import StepIndicator from 'react-native-step-indicator'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SearchableDropdown from 'react-native-searchable-dropdown';
import DatePicker from 'react-native-datepicker';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';

//import  MapView  from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Polyline } from '@mapbox/polyline';
import { Marker }from 'react-native-maps';
import MapView from 'react-native-maps';
//import { Polyline } from 'react-native-maps';
import { IntentLauncherAndroid } from 'expo';
import Tooltip from 'react-native-walkthrough-tooltip';

import CalendarView from './CalendarView';

import VendorLocationAPI from '../api/VendorLocationAPI';
import ServiceAPI from '../api/ServiceAPI';
import AuthAPI from '../api/AuthAPI';
import BookingAPI from '../api/BookingAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

const secondIndicatorStyles = {
  //#511efa, #606afc, #7880fa: blue
  //#ff1414: orange
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2.5,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7880fa', //orange: '#fe7013'
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#7880fa', //orange: '#fe7013'
  stepStrokeUnFinishedColor: '#000000', //gray: '#aaaaaa'
  separatorFinishedColor: '#7880fa', //orange: '#fe7013'
  separatorUnFinishedColor: '#000000', //gray: '#aaaaaa'
  stepIndicatorFinishedColor: '#7880fa', //orange: '#fe7013'
  stepIndicatorUnFinishedColor: '#170b0b',  //'#ffffff'
  stepIndicatorCurrentColor: '#170b0b', //'#ffffff'
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#7880fa', //orange: '#fe7013'
  stepIndicatorLabelFinishedColor: '#170b0b', //'#ffffff'
  stepIndicatorLabelUnFinishedColor: '#000000', //gray: '#aaaaaa'
  labelColor: '#000000', //grey: '#999999'
  labelSize: 13,
  currentStepLabelColor: '#7880fa' //orange: '#fe7013'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#170b0b' : '#7880fa', //'#ffffff' : '#fe7013'
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
      serviceInput: null,
      petInput: null,
      date:"",
      time:"",
      confirmDialogVisible: false,
      successDialogVisible: false,
      latitude: null,
      longitude: null,
      //locations: locations
      locations: null,
      isLoading: true,
      clickMarker: false,
      toolTipVisible: false,
      isRegister: false,
      chosenClinic: null,
      servicesData: null,
      petsData: null,
    };
    this.VendorLocationAPI = new VendorLocationAPI();
    this.serviceAPI = new ServiceAPI();
    this.authAPI = new AuthAPI();
    this.bookingAPI = new BookingAPI();
    this.PetAPI = new PetAPI();
  }

  getAllClinics(){
    this.VendorLocationAPI.getAllClinics( (res) => {
      if(res != null) {
        this.setState({ 
          locations: res,
          isLoading: false
        });
      }
      else{
        Alert.alert('Error', res,
          [{text: 'Ok'}])
      }
    });
    //console.log("this.state.locations: " + this.state.locations);
  }

  getData = async () => {
    let vendorId = this.state.chosenClinic.vendorId;
    let customerId = await this.authAPI.retrieveCustomerId();

    await this.serviceAPI.getServiceByVendor(vendorId, (services) => {
      if(services != null) {
        this.setState({ servicesData: services });
      }
      else{
        Alert.alert('Error', res,
          [{text: 'Ok'}])
      }
      //console.log("this.state.servicesData: " + JSON.stringify(this.state.servicesData));

      this.PetAPI.getPetByCustomerId(customerId, (pets) => {
        if(pets != null) {
          this.setState({ 
            petsData: pets,
            isLoading: false
          });
        }
        //console.log("this.state.petsData: " + JSON.stringify(this.state.petsData));
      })
    })
  }

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

  componentWillMount() {
    this.getAllClinics();
    //this.getData(this.state.chosenClinic);
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});

    // console.log('latitude is ' + location.coords.latitude.toString())
    // console.log('longitude is ' + location.coords.longitude.toString())

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
    //   (error) => console.log('Error:', error)
    // )

    // const { locations: [ sampleLocation ] } = this.state

    // console.log("sampleLocation: " + JSON.stringify(sampleLocation));

    // this.setState({
    //   desLatitude: sampleLocation.coords.latitude,
    //   desLongitude: sampleLocation.coords.longitude
    // }, this.mergeCoords)
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyBS41pWqFh2IHMuqYSL23Okzg5br7XUvdg`)
      //console.log("resp: " + JSON.stringify(resp));
      const respJson = await resp.json();
      const response = respJson.routes[0];
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const timeTaken = distanceTime.duration.text;
      var polyline = require('@mapbox/polyline');
      // const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const points = polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, timeTaken });
    } catch(error) {
      console.log('Error: ', error);
    }
  }

  onMarkerPress = location => () => {
  //onMarkerPress = (id, location) => () => {
    //const { coords: { latitude, longitude } } = location;
    const { latitude, longitude } = location;

    //console.log("AAAAAAAA");
    //console.log("location chose: " + JSON.stringify(location));
    if (location.vendorId)
      this.setState({ isRegister: true });
    else 
      this.setState({ isRegister: false });

    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude,
      clinicInput: location.name,
      clickMarker: true,
      chosenClinic: location,
      //toolTipVisible: true,
    }, this.mergeCoords);

  }

  renderMarkers = () => {
    const { locations } = this.state;

    // const {
    //   latitude, longitude
    // } = locations[0];

    //console.log("locations[0]: " + JSON.stringify(locations[0]));
    if (locations)
      return (
        <View>
          {
            locations.map((location, idx) => {
              // const {
              //   coords: { latitude, longitude }
              // } = location
              const latitude = parseFloat(location.latitude);
              const longitude = parseFloat(location.longitude);

              //console.log("latitude: " + latitude);
              //console.log("longitude: " + longitude);
              return (
                (latitude && longitude) ? 
                  // <Tooltip
                  //   animated={true}
                  //   arrowSize={{ width: 16, height: 8 }}
                  //   backgroundColor="rgba(0,0,0,0)" // Color of the fullscreen background beneath the tooltip.
                  //   isVisible={this.state.toolTipVisible}
                  //   content={<Text>{location.name}</Text>} //(Must) This is the view displayed in the tooltip
                  //   placement="top"  //(Must) top, bottom, left, right, auto.
                  //   onClose={() => this.setState({ toolTipVisible: false })}
                  // >
                    <Marker
                      key={idx}
                      coordinate={{ latitude, longitude }}
                      onPress={this.onMarkerPress(location)}
                      pinColor="navy"
                    >
                      {/* <MaterialIcons name='pets' size={30} style={{color: '#885DDA'}}/> */}
                    </Marker>
                  // </Tooltip>
                : null
              )
            })
          }
        </View>
      )
    else 
      return null;
  }

  showMap = () => {
    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ];

    const {
      timeTaken,
      coords,
      distance,
      latitude,
      longitude,
      destination
    } = this.state;

    //console.log('latitude is ' + latitude);
    //console.log('longitude is ' + longitude);
    if (latitude) {
      return (
        <MapView
          showsUserLocation
          style={{ flex: 1 }}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={
            [StyleSheet.absoluteFillObject, styles.map]
          }
        >
          {this.renderMarkers()}
          {coords && <MapView.Polyline
            strokeWidth={3}
            strokeColor="#511efa"
            coordinates={coords}
          />}
        </MapView>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text color="#E1E1E1">Rendering map!</Text>
          <Text color="#E1E1E1">Wait too long? Turn on your GPS!</Text>
        </View>
      )
    }
  }

  getLocationAsync = async() => {
    let permit = await Permissions.askAsync(Permissions.LOCATION);
    alert(JSON.stringify(permit));
  }

  showClinicInfo = () => {
    const clinic = this.state.chosenClinic;
    //console.log("clinic: " + JSON.stringify(clinic));
    return (
      this.state.chosenClinic ?
        <Block flex={0.8} center style={styles.booking}>
          <ScrollView>
            <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Name: 
                    <Text style={styles.value}>{" "}{clinic.name}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Type: 
                    <Text style={styles.value}>{" "}{clinic.type}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Address: 
                    <Text style={styles.value}>{" "}{clinic.address}</Text>
                  </Text>
                </View>
              
                <View style={styles.row}>
                  <Text style={styles.field}>Postal code: 
                    <Text style={styles.value}>{" "}{clinic.postal_code}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Telephone office 1: 
                    <Text style={styles.value}>{" "}{clinic.tel_office_1 ? clinic.tel_office_1 : "na"}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Telephone office 2: 
                    <Text style={styles.value}>{" "}{clinic.tel_office_2 ? clinic.tel_office_2 : "na"}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Fax office: 
                    <Text style={styles.value}>{" "}{clinic.fax_office}</Text>
                  </Text>
                </View>

                {!this.state.isRegister &&
                  <View style={{alignItems: 'center', marginTop:10, marginBottom: 10}}>
                    <Text style={styles.warningText}>This clinic has not been registered</Text>
                    <Text style={styles.warningText}>under our system</Text>
                    <Text style={styles.warningText}>Please contact them directly!</Text>
                  </View>
                }
            </View>
          </ScrollView>
        </Block>
      : null     
    )
  }

  chooseClinicView = () => {
    const {timeTaken, distance} = this.state;

    //console.log("this.showMap(): ", this.showMap());
    //const test = this.state.clickMarker ? this.state.clinicInput : undefined;
    //console.log("this.state.clickMarker ? this.state.clinicInput : undefined -> " + test);
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
                    this.setState({ clinicInput: item.name }, this.onMarkerPress(item));
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
                  //items={items}
                  items={this.state.locations}
                  resetValue={false}
                  value={this.state.clinicInput}
                  onFocus={() => this.setState({clickMarker: false})}
                  onBlur={() => this.setState({clickMarker: true})}
                  textInputProps={this.state.clickMarker ? 
                    {
                      placeholder: "Choose...",
                      placeholderTextColor: "#525151",
                      underlineColorAndroid: "transparent",
                      value: this.state.clinicInput,
                      style: {
                          padding: 5,
                          marginLeft: 10,
                          color: "#E1E1E1"
                      },
                    }
                      :
                    {
                      placeholder: "Choose...",
                      placeholderTextColor: "#525151",
                      underlineColorAndroid: "transparent",
                      //value: this.state.clinicInput,
                      //value: this.state.clickMarker ? this.state.clinicInput : undefined,
                      //value: undefined,
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
                  //textInputProps={this.state.clickMarker ? {value: this.state.clinicInput} : undefined}
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />
                 
              </Block>

              <Block flex
                style={{
                  marginTop: -height * 0.5 + 90,
                  paddingTop: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: height * 0.15,
                }}>
                <Text style={{ fontWeight: 'bold', color: "#E1E1E1" }}>Estimated Time: {timeTaken}</Text>
                <Text style={{ fontWeight: 'bold', color: "#E1E1E1" }}>Estimated Distance: {distance}</Text>
              </Block>   

              {/* Google Map here */}
              <Block flex center style={{height: width * 0.95, width: width * 0.95,
                                  borderRadius: 30, overflow: 'hidden',
                                  marginTop: -height * 0.06}}>
                {this.showMap()}
              </Block>
              
              {this.state.clickMarker ?
                <View>
                  <Text style={styles.headerTxt}>Clinic info</Text>
                  {this.showClinicInfo()}
                  
                  {this.state.isRegister ?
                    <Block flex middle style={{ elevation: 1, height: height * 0.3, marginTop: -height * 0.1}}>
                      <Button color="primary" style={styles.button} 
                        onPress={() => this.setState({ currentPage: 1, 
                                                        isloading: true }, this.getData)}>
                        <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                          Next
                        </Text>
                      </Button>
                    </Block>
                  : 
                    <Block flex middle style={{ elevation: 1, height: height * 0.1 }} />
                  }
                </View>
                :
                <Block flex middle style={{ elevation: 1, height: height * 0.1 }} />
              }     
            </ScrollView>
          </KeyboardAvoidingView>

        </Block>
      </Block>
    )
  }

  DetailsView = () => {
    var todayDate = new Date().toISOString().slice(0,10);

    // const {date, time} = this.state;
    // console.log("this.state.date: " + this.state.date);
    // console.log("this.state.time: " + this.state.time);
    // let datetime = new Date(this.state.date + "T" + this.state.time + ":00").toString();
    // var d = this.state.date.split('-');
    // var t = this.state.time.split(':');
    // if (date && time) {
    //   var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(t[0]), parseInt(t[1]), 0, 0); 
    // }

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

              <Block center>
                <Text color="#E1E1E1" size={20} 
                      style={{ marginLeft: width * 0.05, marginBottom: 5,
                               fontWeight: 'bold'}}>
                  Date   
                </Text>
              </Block>
              
              <CalendarView vendor={this.state.chosenClinic}/>

              <Block>
                <Text color="#E1E1E1" size={20} 
                      style={{ marginLeft: width * 0.05, marginBottom: 5,
                               fontWeight: 'bold'}}>
                  Clinic   
                </Text>
              </Block>

              <Block style={{ alignSelf: 'center',width: width * 0.9, height: 50, justifyContent: 'center',
                              marginBottom: 10, borderRadius: 10, backgroundColor: "#282828"}}>
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
                    this.setState({ selectedItems: items, serviceInput: item });
                  }}
                  containerStyle={{ padding: 5, width: width * 0.9, top: 32,
                                     elevation: 1, position: "absolute", zIndex: 5,
                                    backgroundColor: "#282828", borderRadius: 10,
                                    alignSelf: 'center'}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: '#030205',
                    borderRadius: 10,
                  }}
                  itemTextStyle={{ color: '#E1E1E1' }}
                  itemsContainerStyle={{ maxHeight: 150 }}
                  //items={services}
                  items={this.state.servicesData}
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

              <Block style={{marginTop: -height * 0.5 + 90}}>
                <View style={{marginLeft: width * 0.05}}>
                  <Text style={{fontWeight: "bold", color: "#E1E1E1"}}>Description: 
                    <Text style={{color:"#E1E1E1"}}>{" "}{this.state.serviceInput ? this.state.serviceInput.description : ""}</Text>
                  </Text> 
                </View>

                <View style={{marginLeft: width * 0.05}}>
                  <Text style={{fontWeight: "bold", color: "#E1E1E1"}}>Price:
                    <Text style={{color:"#E1E1E1"}}>{" $"}{this.state.serviceInput ? this.state.serviceInput.price : ""}</Text>
                  </Text> 
                </View>
              </Block>
              
              <Block style={{height: height * 0.5, marginTop: 10,
                //marginTop: -height * 0.5 + 90
                }}>
                <Block>
                  <Text flex color="#E1E1E1" size={20} 
                        style={{ marginLeft: width * 0.05, marginBottom: 5,
                                  fontWeight: 'bold'}}>
                    Pet   
                  </Text>
                </Block>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    this.setState({ selectedItems: items, petInput: item });
                  }}
                  containerStyle={{ padding: 5, width: width * 0.9, top: 32,
                                    elevation: 1, position: "absolute", zIndex: 4,
                                    backgroundColor: "#282828", borderRadius: 10,
                                    alignSelf: 'center'}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: '#030205',
                    borderRadius: 10,
                  }}
                  itemTextStyle={{ color: '#E1E1E1' }}
                  itemsContainerStyle={{ maxHeight: 150}}
                  //items={pets}
                  items={this.state.petsData}
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
              
              <Block style={{width: width * 0.9, height: height * 0.4, marginTop: -height * 0.5 + 90, 
                             flexDirection: 'row', justifyContent: 'space-between',
                             alignSelf: 'center'}}>
                <Block>
                  <Block>
                    <Text flex color="#E1E1E1" size={20} 
                          style={{ marginBottom: 5, fontWeight: 'bold'}}>
                      Date   
                    </Text>
                  </Block>
                  <DatePicker
                    style={{width: width * 0.4, height: 50, marginBottom: height * 2, 
                            backgroundColor: "#282828", borderRadius: 10,
                            justifyContent: 'center', }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Choose..."
                    format="YYYY-MM-DD"
                    //minDate="2016-05-01"
                    minDate={todayDate}
                    maxDate="2022-02-06"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconComponent={
                      <FontAwesome name='calendar-check-o' size={20} color='#511efa' style={{padding: 10}} />
                    }
                    customStyles={{
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
                </Block>

                <Block>
                  <Block>
                    <Text flex color="#E1E1E1" size={20} 
                          style={{ marginBottom: 5, fontWeight: 'bold'}}>
                      Time   
                    </Text>
                  </Block>
                  <DatePicker
                    style={{width: width * 0.4, height: 50, marginBottom: height * 2, 
                            backgroundColor: "#282828", borderRadius: 10,
                            justifyContent: 'center', }}
                    date={this.state.time}
                    mode="time"
                    placeholder="Choose..."
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconComponent={
                      <Entypo name='back-in-time' size={25} color='#511efa' style={{padding: 10}} />
                    }
                    customStyles={{
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
                        color: "#E1E1E1",
                      },
                      placeholderText: {
                        color: '#505050'
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(time) => {this.setState({time: time})}}
                  />
                </Block>
              </Block>
              
              <Block style={{width: width * 0.65, height: height * 0.4, marginTop: -height * 0.5 + 90, 
                             flexDirection: 'row', justifyContent: 'center',
                             alignSelf: 'center'}}>
                <Block flex middle>
                  <Button color="primary" style={styles.button2} onPress={() => this.setState({ currentPage: 0 })}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Back
                    </Text>
                  </Button>
                </Block>

                <Block flex middle >
                  <Button color="primary" style={styles.button2} onPress={() => this.setState({ currentPage: 2, confirmDialogVisible: true })}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Book
                    </Text>
                  </Button>
                </Block>
              </Block>
            </ScrollView>

          </KeyboardAvoidingView>

        </Block>
      </Block>
    )
  }

  onConfirm = async () => {
    let customerId = await this.authAPI.retrieveCustomerId();
    let vendorId = this.state.chosenClinic.vendorId;
    const {date, time} = this.state;
    var d = date.split('-');
    var t = time.split(':');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(t[0]), parseInt(t[1]), 0, 0); 

    let booking = new Object({
      petId: this.state.petInput._id,
      time: mydate,
      serviceId: this.state.serviceInput._id,
      vendorId: vendorId,
      customerId: customerId,
    })
    
    this.serviceAPI.createBooking(booking, (res) => {
      if(res){
        // Alert.alert('Successfully', "Service is created successfully!",
        // [{text: 'Ok', onPress: () => {this.props.navigation.goBack()}}])
        this.setState({
          confirmDialogVisible: false,
          successDialogVisible: true,
        });
        setTimeout(() => {
          this.setState({
            successDialogVisible: false,
            currentPage: 0,
          });
        }, 3000);
      }
      else{
        Alert.alert('Error', "Server error",
        [{text: 'Ok'}])
      }
    })
  }

  renderPage(currentPage) {
    switch(currentPage) {
      case 0:
        return (<this.chooseClinicView />);
      case 1:
        return (<this.DetailsView />);
      case 2:
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
          {/* <Block flex={0.35} style={{justifyContent:'flex-start'}}> */}
          <Block style={{marginBottom: -20}}
            //flex={0.35} 
            center
          >
            <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='contain' style={styles.headerImage}>
                <View style={styles.stepIndicator}>
                  <StepIndicator
                    renderStepIndicator={this.renderStepIndicator}
                    customStyles={secondIndicatorStyles}
                    stepCount={3}
                    currentPosition={this.state.currentPage}
                    //onPress={this.onStepPress}
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
          

          {!this.state.isLoading && this.renderPage(this.state.currentPage)}

          <ConfirmDialog
            title="Confirmation"
            message="Are you sure to book?"
            titleStyle={{color: argonTheme.COLORS.PRIMARY}}
            messageStyle={{color: "#E1E1E1"}}
            visible={this.state.confirmDialogVisible}
            onTouchOutside={() => this.setState({confirmDialogVisible: false})}
            positiveButton={{
                title: "YES",
                onPress: () => this.onConfirm(),
                titleStyle: {color: argonTheme.COLORS.PRIMARY}
            }}
            negativeButton={{
                title: "NO",
                onPress: () => this.setState({confirmDialogVisible: false, currentPage: 2}),
                titleStyle: {color: argonTheme.COLORS.PRIMARY}
            }}
            dialogStyle={{
              borderRadius: 20, backgroundColor: "#232124", 
              //opacity: 0.8,
              //borderColor: "#37578a",
              borderWidth: 5, 
            }}
          />

          <Dialog
            visible={this.state.successDialogVisible}
            //title="Success"
            dialogStyle={{
              borderRadius: 15, backgroundColor: "#232124", 
              //borderColor: "#1df232",
              borderWidth: 4, width: width * 0.6,
              alignSelf: 'center',
            }}
            onTouchOutside={() => this.setState({successDialogVisible: false})} >
            <Block flex middle style={{flexDirection: 'row'}}>
              <AntDesign name='checkcircleo' size={25} color='#1df232' style={{marginRight: 10, marginBottom: -4 }} />
              <Text bold style={{color: '#E1E1E1', fontSize: 16, marginBottom: -4}}>
                Booked successfully
              </Text>
            </Block>
          </Dialog>     

        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 230,
    //height: height * 0.25,
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
  button2: {
    width: width * 0.3,
    marginTop: 25,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 75,
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
  },
  map: {
    //borderRadius: 20,
  },
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.8)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: "400",
    color: 'white'
  },
  row:{
    textAlign: "left",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    //paddingTop: 10,
  },
  detailInfo: {
    width: "100%",
  },
  field:{
    fontWeight: '500',
    fontFamily: 'opensans',
    fontSize: 17,
    color: 'white'
  },
  value: {
    fontFamily: 'opensans',
    fontWeight: '300',
    marginLeft: 20,
  },
  cancelBtn: {
    alignSelf: 'center', 
    width: 100,
    marginTop: 5
  },
  backBtn: {
    position: 'absolute', 
    marginTop: 50, 
    marginLeft: 20,
    alignSelf: 'flex-start',
    color: 'white'
  },
  home: {
    width: width,    
    marginTop: 0,
    paddingBottom: 20
  },
  warningText: {
    fontFamily: 'opensans',
    fontSize: 15,
    color: '#ff1414'
  },
});

export default Booking;
