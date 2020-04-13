import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import NotificationAPI from '../api/NotificationAPI'
import AuthAPI from '../api/AuthAPI'
import PetAPI from '../api/PetAPI'
import VendorAPI from "../api/VendorAPI";
const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {

  state = {
    notifications: [],
    loading: true,
    notiData: []
  }

  constructor(props) {
    super(props)
    this.state = { address: "", notifications: [] }
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
    this.vendorAPI = new VendorAPI();
    this.notificationAPI = new NotificationAPI();
    this.lastTime = null;
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  async componentDidMount() {

    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
  }

  /**
   * to retrieve the notifications for a customer
   */
  async retrieveData() {
    let customerId = await this.authAPI.retrieveCustomerId();
    let now = new Date();
    this.notificationAPI.getNotificationByCustomerFromTime(customerId, now, (notifs) => {
      if (notifs.length == 0 || !notifs) {
        this.setState({loading: false})
        return;
      }
      this.setState({ notiData: notifs });
      this.handleNotiData(notifs);
    })
  }

  /**
   * to retrieve new notifications
   */
  async loadMoreData() {
    let customerId = await this.authAPI.retrieveCustomerId();
    if (!this.state.loading) {
      this.setState({ loading: true }, () => {
        this.notificationAPI.getNotificationByCustomerFromTime(customerId, this.lastTime, (notifs) => {
          if (notifs.length == 0 || !notifs) {
            this.setState({loading: false})
            return;
          }

          let prevNoti = this.state.notiData.slice();
          let jointData = prevNoti.concat(notifs);
          this.setState({ notiData: jointData })
          this.handleNotiData(notifs);
        })
      })
    }
  }

  /**
   * to retrieve the booking details linked to the notification 
   * @param {var} index - this is the index of the notification data in the array 
   */
  scheduleDetail(index) {
    this.props.navigation.navigate("ScheduleDetails", { data: this.state.notiData[index].bookingId });
  }

  /**
   * to handle the notification data (booking details)
   * @param {var} notifs - this is the array of the notification data
   */
  handleNotiData(notifs) {
    var result = [];
    var count = 0;
    for (var i = 0; i < notifs.length; i++) {
      let notif = notifs[i];
      this.vendorAPI.getVendorById(notif.vendorId, (vendor) => {

        if (vendor == false) {
          return;
        }

        notif.time = new Date(notif.time);
        notif.createdAt = new Date(notif.createdAt);
        result.push(
          <TouchableOpacity style={styles.agenda} key={count + Math.random()}>
            <View style={styles.leftIcon}>
              <Icon
                size={30}
                color={'#ffffff'}
                name="ic_mail_24px"
                family="ArgonExtra"
                style={styles.inputIcons}
              />
            </View>

            <View style={{ width: "90%", justifyContent: 'center' }}>
              <Text style={styles.time}>{notif.createdAt.getHours() + "h" + notif.createdAt.getMinutes() + "'  "
                + notif.createdAt.getDate() + "/" + (notif.createdAt.getMonth() + 1) + "/" + notif.createdAt.getFullYear()}
              </Text>
              <Text style={styles.notiTxt}>
                Your booking with vendor {vendor.name} on {notif.time.getDate()} -
                  {notif.time.getMonth() + 1} - {notif.time.getFullYear()} is {notif.bookingStatus}
              </Text>
            </View>

          </TouchableOpacity>
        );

        count++;
        if (count == notifs.length) {
          let prev = this.state.notifications.slice();
          let jointData = prev.concat(result);
          this.setState({ notifications: jointData, loading: false });
          return
        }

      })
    }

    this.lastTime = new Date(notifs[notifs.length - 1].createdAt) - 1000;
  }

  /**
   * render Notification screen
   */
  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          {loader}

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                Notification
              </Text>
            </View>
          </ImageBackground>

          <ScrollView
            flex={1}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.loadMoreData()
              }
            }}
            scrollEventThrottle={400}
            style={{ width: "100%", marginTop: 5 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block center style={{ width: width, paddingBottom: 50 }}>
                  {this.state.notifications}
                </Block>

              </KeyboardAvoidingView>
            </Block>
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
  home: {
    width: width,
    paddingBottom: 20
  },
  // headerImage: {
  //   width: width,
  //   height: 90,
  //   justifyContent: 'flex-start',
  //   borderRadius: 4,
  //   position: 'absolute',
  // },
  headerImage: {
    width: width,
    height: 80
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
  inputIcons: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  agenda: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 20
  },
  notiTxt: {
    fontWeight: '100',
    fontSize: 17,
    color: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'opensans',
    paddingLeft: 10
  },
  leftIcon: {
    backgroundColor: "#520099",
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 25,
    alignItems: 'center'
  },
  time: {
    fontFamily: 'opensans',
    fontSize: 14,
    color: '#cccccc',
    paddingLeft: 10
  }
});

export default Notification;
