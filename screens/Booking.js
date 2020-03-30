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

import DataAPI from '../api/DataAPI';

const { width, height } = Dimensions.get("screen");

const locations = [
  {
      "name": "Singapore Turf Club Equine Hospital",
      "address": "338 Ang Mo Kio Avenue 1 #01-1671",
      //"coords": {
          "latitude": 1.422900,
          "longitude": 103.763064
      //},
  },
  {
      "name": "AAVC - Animal & Avian Veterinary Clinic",
      "address": "716 Yishun Street 71 #01-254",
      //"coords": {
          "latitude": 1.426181,
          "longitude": 103.827479
      //},
  },
  {
      "name": "Acacia Veterinary Clinic",
      "address": "338 Ang Mo Kio Avenue 1 #01-1671",
      //"coords": {
          "latitude": 1.363953,
          "longitude": 103.849044
      //},
  },
  {
      "name": "Allpets & Aqualife Vets Pte Ltd ",
      "address": "24 Jalan Kelulut",
      //"coords": {
          "latitude": 1.383402,
          "longitude": 103.875629
      //},
  },
  {
      "name": "Amber Veterinary Practice Pte Ltd",
      "address": "50 Burnfoot Terrace, Frankel Estate",
      //"coords": {
          "latitude": 1.312755,
          "longitude": 103.922726
      //},
  }
]

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
      serviceInput: "",
      petInput: "",
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
    };
    this.DataAPI = new DataAPI();
  }

  getAllClinics(){
    this.DataAPI.getAllClinics( (res) => {
      //console.log("res.data: " + JSON.stringify(res.data));
      if(res != null) {
        this.setState({ 
          locations: res.data,
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
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude,
      clinicInput: location.name,
      clickMarker: true,
      toolTipVisible: true,
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
                  <Tooltip
                    animated={true}
                    arrowSize={{ width: 16, height: 8 }}
                    backgroundColor="rgba(0,0,0,0)" // Color of the fullscreen background beneath the tooltip.
                    isVisible={this.state.toolTipVisible}
                    content={<Text>{location.name}</Text>} //(Must) This is the view displayed in the tooltip
                    placement="top"  //(Must) top, bottom, left, right, auto.
                    onClose={() => this.setState({ toolTipVisible: false })}
                  >
                    <Marker
                      key={idx}
                      coordinate={{ latitude, longitude }}
                      onPress={this.onMarkerPress(location)}
                      pinColor="navy"
                    >
                      {/* <MaterialIcons name='pets' size={30} style={{color: '#885DDA'}}/> */}
                    </Marker>
                  </Tooltip>
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
                {/* <Block flex middle style={{ elevation: 1, position: "absolute", zIndex: 1}}>
                  <Button color="primary" style={styles.button} onPress={() => this.setState({ currentPage: 1 })}>
                    <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                      Next
                    </Text>
                  </Button>
                </Block>  */}
                 
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
              
              <Block flex middle style={{ elevation: 1, height: height * 0.3, marginTop: -height * 0.05}}>
                <Button color="primary" style={styles.button} onPress={() => this.setState({ currentPage: 1 })}>
                  <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                    Next
                  </Text>
                </Button>
              </Block> 

              {/* <Block flex style={{ alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => this.setState({ currentPage: 1 })}>
                  <Block flex middle style={{flexDirection: 'row'}}>
                    <Text bold style={{color: '#ff0f0f',fontSize: 18, paddingBottom: 4}}>
                      Next
                    </Text>
                    <AntDesign name='doubleright' size={28} color='#ff0f0f' style={{padding: 5}} />
                  </Block>
                </TouchableOpacity>
              </Block> */}
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
    var todayDate = new Date().toISOString().slice(0,10);

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
                    this.setState({ selectedItems: items, serviceInput: item.name });
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

  onConfirm = () => {
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
          <Block flex={0.35} center>
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
    height: height * 0.25,
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
    marginVertical: 60,
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
  }
});

export default Booking;
