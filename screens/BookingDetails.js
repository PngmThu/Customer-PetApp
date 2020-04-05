import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Popup from '../components/Popup';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'galio-framework';
import BookingAPI from '../api/BookingAPI';
import ServiceAPI from '../api/ServiceAPI';
import CustomerAPI from '../api/CustomerAPI';
import PetAPI from '../api/PetAPI';
const { width, height } = Dimensions.get('screen');

class BookingDetails extends React.Component {

  constructor(props) {
    super(props);
    this.updateBooking = this.updateBooking.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.bookingAPI = new BookingAPI();
    this.serviceAPI = new ServiceAPI();
    this.customerAPI = new CustomerAPI();
    this.petAPI = new PetAPI();
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    service: new Object(),
    bookingStatus: '',
    customer: new Object(),
    pet: new Object(),
    booking: new Object(),
    bookingTime: new Date('2030-01-01'),
    btnAction: false
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.retrieveData();
    })
  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  retrieveData() {
    this.bookingId = this.props.navigation.state.params.data;
    this.bookingAPI.getBookingById(this.bookingId, (res) => {
      let time = new Date(res.time);
      let now = new Date();
      console.log(time);
      console.log(now);
      this.setState({ booking: res, bookingTime: time, bookingStatus: res.status })
      this.customerAPI.getCustomerById(res.customerId, (res) => {
        if (res != false) {
          this.setState({ customer: res })
        }
      })

      this.petAPI.getPetById(res.petId, (res) => {
        if (res != false) {
          this.setState({ pet: res })
        }
      })

      this.serviceAPI.getServiceById(res.serviceId, (res) => {
        this.setState({ service: res })
      })
    })
  }

  handleCancel() {
    this.setState({ popUpDialog: true, question: 'Are you sure to cancel this booking', btnAction: false })
  }

  handleComplete() {
    this.setState({ popUpDialog: true, question: 'Is this booking completed?', btnAction: true })
  }

  updateBooking(bool) {
    if (bool) {
      let booking = { ...this.state.booking }
      if (this.state.btnAction) {
        booking.status = 'completed';
        this.setState({ bookingStatus: 'completed' });
      }
      else {
        booking.status = "cancelled";
        this.setState({ bookingStatus: 'cancelled' });
      }

      this.bookingAPI.updateBookingById(booking._id, booking, (res) => {
        console.log(res);
      })
    }
    this.setState({ popUpDialog: false });
  }

  render() {
    const { navigation } = this.props;

    if (this.state.bookingStatus == 'booked') {
      var bookingCancel = <Button color="warning" size={'small'} onPress={() => { this.handleCancel() }} style={styles.cancelBtn}>Cancel</Button>;
      if (this.state.bookingTime < new Date()) {
        var bookingComplete = <Button color="#6400cf" size={'small'} onPress={() => { this.handleComplete() }} style={styles.cancelBtn}>Complete</Button>;
      }
    }
    else if (this.state.bookingStatus) {
      bookingCancel =
        <View style={{ width: "100%", alignContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name={iconStatus[this.state.bookingStatus]}
            size={35} style={{ textAlign: 'center', alignSelf: 'center' }} color={iconColor[this.state.bookingStatus]} />
        </View>
    }

    if (this.state.pet.dateOfBirth) {
      var dob = new Date(this.state.pet.dateOfBirth);
      var parsedDOB = dob.getDate() + "/" + (dob.getMonth() + 1) + "/" + dob.getFullYear();
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Popup visible={this.state.popUpDialog} choice={this.updateBooking} question={this.state.question} />
          <Block style={{ position: 'absolute', top: 0 }}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage} />
            <View style={{ width: width, alignContent: 'center', alignItems: 'center', top: 15 }}>
              <MaterialIcons name='keyboard-backspace' size={40} style={styles.backBtn}
                onPress={() => navigation.navigate("Home")} />
              <Text color="#ffffff" size={38} style={{ marginLeft: 15, fontFamily: 'ITCKRIST' }}>
                Booking Details
                </Text>
            </View>
          </Block>

          <Block flex={1} style={styles.booking}>
            <ScrollView style={{ marginBottom: 15 }}>
              <Text style={styles.headerTxt}>Customer info</Text>
              <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Name:
                      <Text style={styles.value}> {'Khanh Phung'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Email:
                      <Text style={styles.value}> {'2006@gmail.com'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Phone number:
                      <Text style={styles.value}> {'90865103'}</Text>
                  </Text>
                </View>
              </View>

              <Text style={styles.headerTxt}>Pet info</Text>
              <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Name:
                      <Text style={styles.value}> {'Cookie'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Type:
                      <Text style={styles.value}> {'Dog'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Weight:
                      <Text style={styles.value}> {1.3} kg</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Height:
                      <Text style={styles.value}> {0.5} m</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Date of birth:
                        <Text style={styles.value}> {'2020-03-31'}</Text>
                  </Text>
                </View>
              </View>

              <Text style={styles.headerTxt}>Booking info</Text>
              <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Service:
                      <Text style={styles.value}> {'Grooming'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Time:
                      <Text style={styles.value}> {this.state.bookingTime.getHours() + ":" + this.state.bookingTime.getMinutes() + " " +
                      (this.state.bookingTime.getDate()) + "-" + (this.state.bookingTime.getMonth() + 1) + "-" + this.state.bookingTime.getFullYear()}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Price:
                      <Text style={styles.value}> {'12'} SGD</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>status:
                      <Text style={styles.value}> {'booked'}</Text>
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {bookingComplete}
                {bookingCancel}
              </View>
            </ScrollView>
          </Block>

        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    marginTop: 0,
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent: 'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.95)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 100,
    marginBottom: 120,
    alignSelf: 'center'
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: "400",
    color: 'white',
  },
  row: {
    textAlign: "left",
    width: "100%",
    marginTop: 10,
  },
  detailInfo: {
    width: "100%",
    left: 0
  },
  field: {
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
    top: 10,
    marginLeft: 22,
    alignSelf: 'flex-start',
    color: 'white'
  }
});

const iconStatus = {
  'cancelled': 'cancel',
  'booked': 'chevron-double-right',
  'completed': 'check-circle'
}
const iconColor = {
  'cancelled': 'red',
  'booked': 'orange',
  'completed': 'green'
}
export default BookingDetails;
