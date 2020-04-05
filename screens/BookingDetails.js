import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Popup from '../components/Popup';
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Button } from 'galio-framework';
import BookingAPI from '../api/BookingAPI';
import ServiceAPI from '../api/ServiceAPI';
import CustomerAPI from '../api/CustomerAPI';
import PetAPI from '../api/PetAPI';
import VendorLocationAPI from '../api/VendorLocationAPI';
import Loader from '../components/Loader';
import { Dialog } from 'react-native-simple-dialogs';

const { width, height } = Dimensions.get('screen');

class BookingDetails extends React.Component {

  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.bookingAPI = new BookingAPI();
    this.serviceAPI = new ServiceAPI();
    this.customerAPI = new CustomerAPI();
    this.petAPI = new PetAPI();
    this.VendorLocationAPI = new VendorLocationAPI();
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
    btnAction: false,
    vendor: new Object(),
    loading: false,
    successDialogVisible: false,
    canceling: false,
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
    this.bookingId = this.props.navigation.state.params.bookingId;

    this.bookingAPI.getBookingById(this.bookingId, (booking) => {
      if (booking == false) {
        this.props.navigation.goBack();
      }
      let time = new Date(booking.time);
      let now = new Date();
      this.setState({ booking: booking, bookingTime: time, bookingStatus: booking.status })
      this.customerAPI.getCustomerById(booking.customerId, (res) => {
        this.setState({ customer: res })

        this.petAPI.getPetById(booking.petId, (res) => {
          this.setState({ pet: res })

          this.serviceAPI.getServiceById(booking.serviceId, (res) => {
            this.setState({ service: res })
          
            this.VendorLocationAPI.getClinicByVendorId(booking.vendorId, (res) => {
              this.setState({vendor: res, loading: false});
            })
          })
        })
      })
    })
  }

  handleCancel() {
    this.setState({ popUpDialog: true, question: 'Are you sure to cancel this booking', btnAction: false })
  }

  cancelBooking(bool) {
    this.setState({ canceling: true });
    if (bool) {
      let booking = { ...this.state.booking }
      booking.status = "cancelled";

      this.bookingAPI.updateBookingById(booking._id, booking, (res) => {
        this.setState({
          successDialogVisible: true,
          canceling: false,
        });
        setTimeout(() => {
          this.setState({
            bookingStatus: 'cancelled',
            successDialogVisible: false,
          });
        }, 2000);
      })
    }
    this.setState({ popUpDialog: false });
  }

  render() {
    const { navigation } = this.props;

    if (this.state.bookingStatus == 'booked') {
      var bookingCancel = <Button color="warning" size={'small'} onPress={() => { this.handleCancel() }} style={styles.cancelBtn}>Cancel</Button>;
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

    if (this.state.loading || this.state.canceling) {
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >

          {loader}

          <Popup visible={this.state.popUpDialog} choice={this.cancelBooking} question={this.state.question} />

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <Block>
              <MaterialIcons name='keyboard-backspace' size={35} style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}/>
            </Block>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                {"Booking Details"}
              </Text>
            </View>
          </ImageBackground>

          {!this.state.loading && <Block flex={1} style={styles.booking}>
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
                  <Text style={styles.field}>Clinic:
                      <Text style={styles.value}> {this.state.vendor.name}</Text>
                  </Text>
                </View>

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
                  <Text style={styles.field}>Status:
                      <Text style={styles.value}> {this.state.booking.status}</Text>
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {bookingCancel}
              </View>
            </ScrollView>
          </Block>}

          <Dialog
            visible={this.state.successDialogVisible}
            dialogStyle={{
              borderRadius: 15, backgroundColor: "#232124", 
              borderWidth: 4, width: width * 0.7,
              alignSelf: 'center',
            }}
          >
            <Block flex middle style={{flexDirection: 'row'}}>
              <AntDesign name='checkcircleo' size={25} color='#1df232' style={{marginRight: 10, marginBottom: -4 }} />
              <Text bold style={{color: '#E1E1E1', fontSize: 16, marginBottom: -4}}>
                Cancelled successfully
              </Text>
            </Block>
          </Dialog>

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
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.95)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 5,
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
