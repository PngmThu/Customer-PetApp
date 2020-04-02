import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatList, Alert, TouchableOpacity } from 'react-native';

import { Input, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Block, Text, theme } from "galio-framework";

import AuthAPI from '../api/AuthAPI';
import BookingAPI from '../api/BookingAPI';
import PetAPI from '../api/PetAPI';
import VendorAPI from '../api/VendorAPI';
import ServiceAPI from '../api/ServiceAPI';

const { width, height } = Dimensions.get("screen");

export default class PetBooking extends React.Component {

  constructor(props) {
    super(props);
    this.authAPI = new AuthAPI();
    this.bookingAPI = new BookingAPI();
    this.petAPI = new PetAPI();
    this.vendorAPI = new VendorAPI();
    this.serviceAPI = new ServiceAPI();
    this.retrieveData = this.retrieveData.bind(this);
    //this.petId = route.params;
    // this.state = {   
    //   loading: false,
    //   listData: [
    //     { bookingID: '1', dateandtime: '10-2-2020  1.30pm', venue:'Animal World Vet Clinic' },
    //     { bookingID: '2', dateandtime: '3-1-2020  10.00am', venue:'Stars Vet Clinic' },
    //   ],
    //   error: null,
    // };
    this.state = {
      bookingData: [],
      loading: true,
      pet: this.props.navigation.state.params.pet,
      bookingList: [],
      services: [],
      dates: [],
      times: [],
      vendors: [],
      bookings: [],
    }
  }


   
  componentDidMount(){
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({loading: true}, () => {
        this.retrieveData();
      })
    })
  }

  componentWillUnmount(){
    this.didFocus.remove();
  }

  retrieveData = () => {
    // this.bookingId = this.props.navigation.state.params.data;
    // if (!this.bookingId) {
    //   this.props.navigation.goBack();
    // }
    //let customerId = await this.authAPI.retrieveCustomerId();
    let petId = this.props.navigation.state.params.pet._id;

    this.bookingAPI.getBookingByPetId(petId, (res1) => {
      var {bookings, vendors, services, dates, times} = this.state;
      if (res1) {
        bookings = res1;
        //this.setState({bookings: bookings});
        var counter = 0;
        while (counter < bookings.length) {
          let vendorId = bookings[counter].vendorId;
          let serviceId = bookings[counter].serviceId;
          
          this.vendorAPI.getVendorById(vendorId, (res2) => {
            if (res2) {
              //console.log("res2: " + JSON.stringify(res2));
              vendors.push(res2.name);
              //this.setState({vendors: vendors});

              this.serviceAPI.getServiceById(serviceId, (res3) => {
                if (res3) {
                  //console.log("res3: " + JSON.stringify(res3));
                  services.push(res3.name);
                  //this.setState({service: services});
                  console.log(bookings[counter]);
                  var date =  new Date(bookings[counter].time);
                  const offset = date.getTimezoneOffset();
                  date = new Date(date.getTime() + (offset * 60 * 1000));
                  var datetimepart = date.toISOString().split("T");
                  date = datetimepart[0];
                  var timePart = datetimepart[1];
                  var timeParts = timePart.split(":");
                  var time = timeParts[0] + ":" + timeParts[1];

                  dates.push(date);
                  times.push(time)
                  console.log("counter: " + counter);
                  console.log("bookings: " + JSON.stringify(bookings));
                  console.log("services: " + JSON.stringify(services));
                  console.log("vendors: " + JSON.stringify(vendors));
                  console.log("times: " + JSON.stringify(times));
                  console.log("dates: " + JSON.stringify(dates));
                  counter ++;
                  if (counter == bookings.length) {
                    this.setState({
                      bookings: bookings, 
                      vendors: vendors, 
                      services: services, 
                      dates: dates, 
                      times: times
                    });
                  }
                }
              })
            }
          })
        }
      }
    })
  }

  showAlert1(bookingId) {  
    Alert.alert(  
        'Delete Booking',  
        'Do you want to delete this booking?',  
        [  
          {  
            text: 'Cancel',  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
        },  
        {text: 'OK', onPress: this.bookingAPI.deleteBookingById(bookingId)},  
        ],  
        {cancelable: false}  
    )  
  }  

//   renderSeperator = () => {
//     return (
//       <View
//       style={{
//         height: 1,
//         width: '100%',
//         backgroundColor: '#8ee5ee',
//       }}
//       />
//     );
//   };

renderCard() {
  var table = [];
  var {pet, bookings, services, vendors, times, dates} = this.state;

  console.log("services: " + JSON.stringify(services));
  console.log("vendors: " + JSON.stringify(vendors));
  console.log("times: " + times);
  console.log("dates: " + dates);
  if (bookings.length != 0 && services.length != 0 && vendors.length != 0 && times.length != 0 && dates.length != 0)
  this.state.bookings.forEach((item, id) => {
    table.push(
      <TouchableOpacity 
        //onPress={() => this.props.navigation.navigate('BookingDetails',{bookingId: bookings[i]._id})}
      >
        <Block flex={0.8} center style={styles.booking}>
          <View style={styles.detailInfo}>
            <Text style={{fontFamily: 'ITCKRIST', fontSize: 17, color: 'white', alignSelf: 'center',
                          paddingTop: 10}}>
              {pet.name}
            </Text>
            <View style={styles.row}>
              <MaterialCommunityIcons name='notebook' size={20} color='#511efa' 
                  style={{paddingRight: 10}} 
              />
              <Text style={styles.field}>
                {services[id].name}
              </Text>
            </View>

            <View style={styles.row}>
              <Entypo name='back-in-time' size={20} color='#511efa' 
                    style={{paddingRight: 10}}  
              />
              <Text style={styles.field}>
                {times[id]}{" "}{dates[i]}
              </Text>
            </View>

            <View style={styles.lastRow}>
              <MaterialIcons name='location-on' size={20} color='#511efa' 
                  style={{paddingRight: 10}} 
              />
              <Text style={styles.field}>
                {vendors[i].name}
              </Text>
            </View>
          </View>
        </Block>
      </TouchableOpacity>
    )}
  ) 
  return table;
}
    

  render() {
     let { bookingData } = this.state;
    const { navigation } = this.props;
    var {pet} = this.state;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width: width, height: height, zIndex: 1 }}
        >
          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <Block>
              <MaterialIcons name='keyboard-backspace' size={40} style={{left: 10, top: 30, color: 'white', position: 'absolute'}}
                            onPress={() => this.props.navigation.goBack()}/>
            </Block>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                {pet.name}
              </Text>
            </View>
          </ImageBackground>

          <ScrollView style={{marginTop: 10}}>
            <View style={{ marginBottom: 10,marginTop: 10 }}>
              {this.renderCard()}
            </View>

            <Block style={{height: height * 0.2}} />
          </ScrollView>
          
        </ImageBackground>
      </Block>
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
  },
  home: {
    width: width,
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 120,
  },
  row:{
    //textAlign: "left",
    width: "100%",
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
    //justifyContent: 'center'
    //paddingTop: 10,
  },
  lastRow:{
    //textAlign: "left",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
    //justifyContent: 'center'
    //paddingTop: 10,
  },
  detailInfo: {
    width: "100%",
  },
  field:{
    //fontWeight: '500',
    fontFamily: 'opensans',
    fontSize: 15,
    color: 'white'
  },
  value: {
    fontFamily: 'opensans',
    fontWeight: '300',
    marginLeft: 20,
  },
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.9)",
    borderRadius: 15,
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});


