import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Calendar from '../components/Calendar';
import Popup from '../components/Popup';
import Loader from '../components/Loader';
import AuthAPI from '../api/AuthAPI';
import ScheduleAPI from '../api/ScheduleAPI';
import BookingAPI from '../api/BookingAPI';
import VendorModel from '../models/VendorModel';
import ServiceAPI from '../api/ServiceAPI';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog } from 'react-native-simple-dialogs';

const { width, height } = Dimensions.get('screen');

class CalendarView extends React.Component {

  constructor(props){
    super(props);
    this.authAPI = new AuthAPI();
    this.scheduleAPI = new ScheduleAPI();
    this.bookingAPI = new BookingAPI();
    this.serviceAPI = new ServiceAPI();
    this.calendarRef = React.createRef();
    this.toggleDateStatus = this.toggleDateStatus.bind(this);
    this.dateStatusChoice = this.dateStatusChoice.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    unavailableDate: [],
    servicesData: [],
    loading: false,
    warningDialogVisible: false,
  }

  componentDidMount(){
    this.setState({loading: true}, () => {
      this.retrieveData();
    })
  }

  toggleDateStatus(marked, date){
    this.setState({clickedDate: date});

    if (!marked) {
      this.setState({question: "Do you want to choose " + date + " ?"});
      this.setState({popUpDialog: true});
    } else {
      this.setState({warningDialogVisible: true});
      setTimeout(() => {
        this.setState({
          warningDialogVisible: false,
        });
      }, 2000);
    }
  }

  dateStatusChoice(bool){

    if(bool){
      this.calendarRef.current.updateDate(this.state.clickedDate);
      this.props.onSelect(this.state.clickedDate);
    }
    this.setState({popUpDialog: false});
  }

  async retrieveData(month){
    let vendorId = this.props.vendor.vendorId;
    let vendor = new VendorModel({_id: vendorId});
    
    this.serviceAPI.getServiceByVendor(vendorId, (services) => {
      this.setState({servicesData: services});
      this.scheduleAPI.getUnavailableDateByVendor(vendor, async (unavailable) => {
        let unavailableDate = [];
        await unavailable.forEach(v => {
          var date =  new Date(v.date);
          const offset = date.getTimezoneOffset();
          date = new Date(date.getTime() + (offset * 60 * 1000));
          var dateString = date.toISOString().split("T")[0];

          unavailableDate.push(dateString);
        });
        
        this.setState({unavailableDate: unavailableDate, 
        }, () => {
          this.calendarRef.current.processDate();
          this.setState({loading: false})
        })  
      })
    })
  }

  compareDate(date1, date2){
    if(date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()){
      return true;
    }

    return false;
  }

  render() {
    const { navigation } = this.props;

    if(this.state.loading){
      var loader = <Loader />
    }

    return (
      <Block center style={styles.home}>
        <ImageBackground
          style={{ width, zIndex: 1 }}
        >
          {loader}
          <Popup visible={this.state.popUpDialog} choice={this.dateStatusChoice} question={this.state.question}/>
          
          <View style={{flex: 1}}>
            <Block flex={0.02} row center style={styles.annotation}>
              <View style={{...styles.circle, backgroundColor: 'red'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Unavailable
              </Text>
              <View style={{...styles.circle, backgroundColor: '#ffecd9'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Chosen
              </Text>
              <View style={{...styles.circle, backgroundColor: '#bd4902'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Today
              </Text>
            </Block>

            <Block flex={0.57} center style={styles.calendar}>
              <Calendar ref={this.calendarRef} unavailableDate={this.state.unavailableDate} 
                        markDate={this.state.clickedDate} toggleDateStatus={this.toggleDateStatus}/>
            </Block>
          </View>

          <Dialog
            visible={this.state.warningDialogVisible}
            dialogStyle={{
              borderRadius: 15, backgroundColor: "#232124", 
              borderWidth: 4, width: width * 0.6,
              alignSelf: 'center',
            }}
            onTouchOutside={() => this.setState({successDialogVisible: false})} >
            <Block flex middle style={{flexDirection: 'row'}}>
              <Text bold style={{color: '#E1E1E1', fontSize: 16, marginBottom: -4}}>
                Unavailable Day!
              </Text>
            </Block>
          </Dialog>  
        </ImageBackground>
      </Block>
    );
  }
}

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
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const styles = StyleSheet.create({
  home: {
    width: width,    
    marginTop: 0,
    //paddingBottom: 40
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  calendar: {
    width: "95%",
    height: "95%",
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 2
  },
  annotation: {
    paddingTop: 10,
    marginBottom: 10
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "80%",
    borderRadius: 12,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10
  },
  service: {
    fontFamily: "opensans",
    fontSize: 16,
    fontWeight: "300",
    color: "white"
  },
  time: {
    fontFamily: "opensans",
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  },
  dayBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#FF9B70",
    alignSelf: "flex-start",
    position: 'absolute',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 5
  },
  day: {
    fontFamily: "opensans",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  },
  statusIcon:{
    fontWeight: "bold",
    position: "absolute",
    alignSelf: 'flex-end',
    right: 20,
    justifyContent: 'center'
  },
  month:{
    position: 'absolute',
    marginLeft: 22,
    alignSelf: 'flex-start',
    marginTop: 45
  },
  monthTxt: {
    color: 'white',
    fontFamily: 'opensans',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center'
  }
});

export default CalendarView;
