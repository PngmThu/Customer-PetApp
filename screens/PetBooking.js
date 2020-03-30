import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatList, Alert } from 'react-native';

import { Input, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import BookingAPI from '../api/BookingAPI';

const { width, height } = Dimensions.get("screen");

export default class PetProfile extends React.Component {

  constructor(props) {
    super(props);
    this.bookingAPI = new BookingAPI();
    this.state = {   
      loading: false,
      // listData = this.getBookingByPetId(),
      listData: [
        { bookingID: '1', dateandtime: '10-2-2020  1.30pm', venue:'Animal World Vet Clinic' },
        { bookingID: '2', dateandtime: '3-1-2020  10.00am', venue:'Stars Vet Clinic' },
      ],
      error: null,
    };
  }
   
  async getBookingByPetId(){
    this.bookingAPI.getBookingByPetId(this.state.petId, (res) => {
          console.log("res.data: " + JSON.stringify(res.data));
          this.setState({
              loading: false,
              listData: res.data
          })
      })
      .catch(error => {
          console.log(error);
      });
  }

  componentWillMount() {
    this.getBookingByPetId();
  }

  deleteBookingById(){
    this.bookingAPI.deleteBookingById(this.state.bookingId, (res) => {
          console.log("res.data: " + JSON.stringify(res.data));
          this.setState({
              loading: false,
              listData: res.data
          })
      })
      .catch(error => {
          console.log(error);
      });
  }

  updateBookingById(){
    this.bookingAPI.deleteBookingById(this.state.bookingId,this.state.booking, (res) => {
          console.log("res.data: " + JSON.stringify(res.data));
          this.setState({
              loading: false,
              listData: res.data
          })
      })
      .catch(error => {
          console.log(error);
      });
  }

  showAlert1() {  
    Alert.alert(  
        'Delete Booking',  
        'Do you want to delete this booking?',  
        [  
          {  
            text: 'Cancel',  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
        },  
        {text: 'OK', onPress: this.deleteBookingById},  
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
     let { listData } = this.state;
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
          keyExtractor={item => item.bookingId}
          style={{ marginTop: 0}}
          data={listData}
          renderItem={({ item }) => {
            return (
              <View>
              <ListItem containerStyle={{backgroundColor: '#003d6d', borderRadius: 50, marginBottom: 10}}
              title={item.time}
              titleStyle={{color:'#ffffff', marginLeft: 15}}
              subtitle={item.vendorId}
              subtitleStyle={{color:'#ffffff', marginLeft: 15}}
              leftIcon={<Icon type="font-awesome" color="#ff7343" size={25} name="edit" onPress={this.updateBookingById} />}
              rightElement={<Icon type="font-awesome" color="#ff7343" size={25} name="trash" onPress={this.showAlert1} />}
            //   bottomDivider='true'
              />
              </View>
            );
          }}
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


