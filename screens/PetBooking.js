import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatList, Alert } from 'react-native';

import { Input, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import AuthAPI from '../api/AuthAPI';
import BookingAPI from '../api/BookingAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class PetBooking extends React.Component {

  constructor(props) {
    super(props);
    this.authAPI = new AuthAPI();
    this.bookingAPI = new BookingAPI();
    this.petAPI = new PetAPI();
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

  async retrieveData(){
    let customerId = await this.authAPI.retrieveCustomerId();
  
        this.bookingAPI.getBookingByPetId(this.petId, (bookings) => {
          let bookingData = [];
          console.log(bookings);
          bookings.forEach(v => {
            let time = new Date(v.time);
            v.time = time;
            let month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
            let date = time.getDate() < 9 ? "0" + (time.getDate() + 1) : (time.getDate() + 1);
            let parsedDate = time.getFullYear() + "-" + month + "-" + date;
            
            if(!bookingData.includes(parsedDate)){
              let location = this.vendorLocationAPI.getLocationByVendorId(bookings.vendorId)
              let service = this.serviceAPI.getServiceByVendorId(bookings.serviceId)
              bookingData.push({bookingId: bookings.Id,time:parsedDate,vendorName:location.name,service:service.name}); 
            }
          }) 
  
          //bookings.sort((a, b) => { return a.time - b.time});
          this.setState({bookingData: bookingData}, () => {
            this.setState({loading: false})
          })   
        })
  }

  // componentWillMount() {
  //   this.getBookingByPetId();
  // }

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

    

  render() {
     let { bookingData } = this.state;
    const { navigation } = this.props;
  return (
    <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
    <ScrollView>
    <View>
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
    <Text bold fontsize={40} style={{marginTop:40, marginLeft: 30, marginBottom: 10, color:'#b4bd00'}}>
        Booking History for Brownie:
      </Text>
    </View>
    <View style={styles.container}>
    <FlatList
          // keyExtractor={item => item.bookingId}
          style={{ marginTop: 0}}
          data={bookingData}
          renderItem={bookingData.forEach( (item) => {
            return (
              <View>
              <ListItem containerStyle={{backgroundColor: '#003d6d', borderRadius: 50, marginBottom: 10}}
              title={item.time}
              titleStyle={{color:'#ffffff', marginLeft: 15}}
              subtitle={item.vendorName}
              subtitleStyle={{color:'#ffffff', marginLeft: 15}}
              leftIcon={<Icon type="font-awesome" color="#ff7343" size={25} name="edit" onPress={this.updateBookingById(item.bookingId)} />}
              rightElement={<Icon type="font-awesome" color="#ff7343" size={25} name="trash" onPress={()=>{
                this.showAlert1(item.bookingId)}} />}
            //   bottomDivider='true'
              />
              </View>
            );
          })}
        //   ItemSeparatorComponent={this.renderSeperator}
        />
        </View>
    </View>
    </ScrollView>
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


