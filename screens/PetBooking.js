import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatList, Alert, TouchableOpacity } from 'react-native';

import { Input, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Block, Text, theme } from "galio-framework";
import Loader from '../components/Loader';

import AuthAPI from '../api/AuthAPI';
import BookingAPI from '../api/BookingAPI';
import PetAPI from '../api/PetAPI';
import VendorAPI from '../api/VendorAPI';
import ServiceAPI from '../api/ServiceAPI';
import VendorLocationAPI from '../api/VendorLocationAPI';

const { width, height } = Dimensions.get("screen");

export default class PetBooking extends React.Component {

  constructor(props) {
    super(props);
    this.authAPI = new AuthAPI();
    this.bookingAPI = new BookingAPI();
    this.petAPI = new PetAPI();
    this.vendorAPI = new VendorAPI();
    this.serviceAPI = new ServiceAPI();
    this.VendorLocationAPI = new VendorLocationAPI();
    this.retrieveData = this.retrieveData.bind(this);
    this.lastTime = new Date(2030, 1, 1);
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
      loading: true,
    }
  }



  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.lastTime = new Date(2030, 1, 1);
        this.retrieveData(this.lastTime);
      })
    })
  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  retrieveData(fromTime) {
    this.setState({loading: true})
    let petId = this.props.navigation.state.params.pet._id;
    var { vendors, services, dates, times } = this.state;

    this.bookingAPI.getBookingByPetId(petId, fromTime, async (res1) => {

      if(res1.length == 0){
        this.setState({loading: false})
        return;
      }
      let promises = [];
      var i;
      if (res1) {
        var bookings = res1;
        var counter = 0;

        for (i = 0; i < bookings.length; i++) {
          let vendorId = bookings[i].vendorId;
          let serviceId = bookings[i].serviceId;
          promises.push(new Promise(async (resolve) => this.VendorLocationAPI.getClinicByVendorId(vendorId, (res) => { resolve(res) })));
          promises.push(new Promise(async (resolve) => this.serviceAPI.getServiceById(serviceId, (res) => { resolve(res) })));

          var date = new Date(bookings[i].time);
          const offset = date.getTimezoneOffset();
          date = new Date(date.getTime() - (offset * 60 * 1000));
          var datetimepart = date.toISOString().split("T");
          date = datetimepart[0];
          var timePart = datetimepart[1];
          var timeParts = timePart.split(":");
          var time = timeParts[0] + ":" + timeParts[1];

          dates.push(date);
          times.push(time);
        }
      
        this.lastTime = new Date(bookings[bookings.length - 1].time);
        let prev = this.state.bookings.slice();
        let jointData = prev.concat(bookings);

        await Promise.all(promises)
          .then((results) => {
            for (var i = 0; i < results.length; i++) {
              if (results[i].address) {    //vendor
                vendors.push(results[i]);
              } else {                     //service
                services.push(results[i]);
              }
            }
          })
          .catch((e) => {
            // Handle errors here
          }
          );


        this.setState({
          bookings: jointData,
          vendors: vendors,
          services: services,
          dates: dates,
          times: times,
          loading: false,
        });
      }
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderCard() {
    var table = [];
    var { pet, bookings, services, vendors, times, dates } = this.state;

    this.state.bookings.forEach((item, id) => {
      table.push(
        <TouchableOpacity key={id}
          onPress={() => this.props.navigation.navigate('BookingDetails', { bookingId: bookings[id]._id })}
        >
          <Block flex={0.8} center style={styles.booking}>
            <View style={styles.detailInfo}>
              <Text style={{
                fontFamily: 'ITCKRIST', fontSize: 17, color: 'white', alignSelf: 'center',
                paddingTop: 10
              }}>
                {pet.name}
              </Text>
              <View style={styles.row}>
                <MaterialCommunityIcons name='notebook' size={20} color='#7396f5'
                  style={{ paddingRight: 10 }}
                />
                <Text style={styles.field}>
                  {services[id].name}
                </Text>
              </View>

              <View style={styles.row}>
                <Entypo name='back-in-time' size={20} color='#7396f5'
                  style={{ paddingRight: 10 }}
                />
                <Text style={styles.field}>
                  {dates[id]}{" at "}{times[id]}
                </Text>
              </View>

              <View style={styles.row}>
                <MaterialIcons name='location-on' size={20} color='#7396f5'
                  style={{ paddingRight: 10 }}
                />
                <Text style={styles.field}>
                  {vendors[id].name}
                </Text>
              </View>

              <View style={styles.lastRow}>
                <MaterialIcons name='cloud-done' size={20} color='#7396f5'
                  style={{ paddingRight: 10 }}
                />
                <Text style={styles.field}>
                  {this.capitalizeFirstLetter(bookings[id].status)}
                </Text>
              </View>
            </View>
          </Block>
        </TouchableOpacity>
      )
    }
    )
    return table;
  }


  render() {
    let { bookingData } = this.state;
    const { navigation } = this.props;
    var { pet, loading } = this.state;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width: width, height: height, zIndex: 1 }}
        >

          {loader}

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <Block>
              <MaterialIcons name='keyboard-backspace' size={35} style={styles.backArrow}
                onPress={() => this.props.navigation.goBack()} />
            </Block>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
                {"Booking History"}
              </Text>
            </View>
          </ImageBackground>

          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.retrieveData(this.lastTime)
              }
            }}
            scrollEventThrottle={400}
            style={{ marginTop: 10 }}>
            <View style={{ marginTop: -20 }}>
              {this.renderCard()}
            </View>

            <Block style={{ height: height * 0.2 }} />
          </ScrollView>

        </ImageBackground>
      </Block>
    );
  }
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

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
  row: {
    width: width * 0.8,
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  lastRow: {
    width: width * 0.8,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  detailInfo: {
    width: "100%",
  },
  field: {
    fontFamily: 'opensans',
    paddingRight: width * 0.05,
    fontSize: 15,
    color: 'white'
  },
  value: {
    fontFamily: 'opensans',
    fontWeight: '300',
    marginLeft: 20,
  },
  booking: {
    backgroundColor: "rgba(60, 60, 60, 0.9)",
    borderRadius: 15,
    width: width * 0.9,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});


