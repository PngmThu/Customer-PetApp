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
    //this.scheduleDetail = this.scheduleDetail.bind(this);
    this.dateStatusChoice = this.dateStatusChoice.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    //this.scrollTo = this.scrollTo.bind(this);
    //this.scrollPos = [];
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    unavailableDate: [],
    //bookedDate: [],
    //bookingData: [],
    servicesData: [],
    //loading: true,
    loading: false,
    warningDialogVisible: false,
  }

  componentDidMount(){
    // this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({loading: true}, () => {
        this.retrieveData();
      })
    //})
    //this.retrieveData();
  }

  componentWillUnmount(){
    //this.didFocus.remove();
  }

  // scheduleDetail(index){
  //   this.props.navigation.navigate("ScheduleDetails", {data: this.state.bookingData[index]});
  // }

  toggleDateStatus(marked, date){

    this.setState({clickedDate: date});

    // if(!marked){
    //   this.setState({question: "Do you want to mark " + date + " as unavailable?"});
    // }
    // else{
    //   this.setState({question: "Do you want to unmark " + date + " ?"});
    // }
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
    //let vendorId = await this.authAPI.retrieveVendorId();
    let vendorId = this.props.vendor.vendorId;
    let vendor = new VendorModel({_id: vendorId});
    
    this.serviceAPI.getServiceByVendor(vendorId, (services) => {
      this.setState({servicesData: services});
      //console.log("this.state.servicesData: " + this.state.servicesData);
      this.scheduleAPI.getUnavailableDateByVendor(vendor, async (unavailable) => {
        let unavailableDate = [];
        //console.log("unavailable: " + JSON.stringify(unavailable));
        await unavailable.forEach(v => {
          var date =  new Date(v.date);
          const offset = date.getTimezoneOffset();
          date = new Date(date.getTime() + (offset * 60 * 1000));
          var dateString = date.toISOString().split("T")[0];

          unavailableDate.push(dateString);
        });
        
        this.setState({unavailableDate: unavailableDate, 
          //bookedDate: bookedDate, bookingData: bookings
        }, () => {
          this.calendarRef.current.processDate();
          this.setState({loading: false})
          //console.log("this.state.unavailableDate: " + this.state.unavailableDate);
        })  

        // this.bookingAPI.getBookingByVendorId(vendorId, (bookings) => {
        //   let bookedDate = [];
  
        //   bookings.forEach(v => {
        //     let time = new Date(v.time);
        //     v.time = time;
        //     let month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
        //     let date = time.getDate() < 9 ? "0" + (time.getDate() + 1) : (time.getDate() + 1);
        //     let parsedDate = time.getFullYear() + "-" + month + "-" + date;
            
        //     if(!bookedDate.includes(parsedDate)){
        //       bookedDate.push(parsedDate);
        //     }
        //   }) 
  
        //   //bookings.sort((a, b) => { return a.time - b.time});
        //   this.setState({unavailableDate: unavailableDate, bookedDate: bookedDate, bookingData: bookings}, () => {
        //     this.calendarRef.current.processDate();
        //     this.setState({loading: false})
        //   })   
        // })
      })
    })
  }

  // renderTimeSchedule(index){
  //   let table = [];
  //   let lastDate = this.state.bookingData[index].time;

  //   for(var i = index; i < this.state.bookingData.length; i++){
  //     let time = this.state.bookingData[i].time;
      
  //     if(!this.compareDate(lastDate, time)){
  //       break;
  //     }

  //     table.push(
  //       <TouchableOpacity key={i} style={styles.leftDetail} onPress={this.scheduleDetail.bind(this, i)}>
  //         <Text style={styles.time}>{time.getHours()}:{time.getMinutes()}</Text>
  //         <Text style={styles.service}>{this.state.servicesData.find( v => { return v._id == this.state.bookingData[i].serviceId}).name}</Text>
  //         <MaterialCommunityIcons name={iconStatus[this.state.bookingData[i].status]} 
  //           size={22} style={{...styles.statusIcon}} color={iconColor[this.state.bookingData[i].status]}/>
  //       </TouchableOpacity>
  //     )
  //   }

  //   return table
  // }

  // renderDaySchedule(month){
  //   let table = [];
  //   let lastDate = new Date('0000-01-01');
  //   let counter = 0;

  //   for(var i = 0; i < this.state.bookingData.length; i++){

  //     if(!this.compareDate(lastDate, this.state.bookingData[i].time)){
  //       lastDate = this.state.bookingData[i].time;
  //       table.push(
  //         <View key={counter} style={styles.agenda}
  //           onLayout={event => {
  //             const layout = event.nativeEvent.layout;
  //             this.scrollPos.push(layout.y);
  //           }}
  //         >
  //           <View style={styles.dayBackground}> 
  //             <Text style={styles.day}>{lastDate.getDate() + 1}</Text>
  //           </View>

  //           <View style={styles.month}>
  //             <Text style={styles.monthTxt}>{monthName[lastDate.getMonth()]}</Text>
  //           </View>

  //           {this.renderTimeSchedule(i)}
  //         </View>
  //       )
        
  //       counter += 1;
  //     }
  //   }

  //   return table
  // }

  compareDate(date1, date2){
    if(date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()){
      return true;
    }

    return false;
  }

  // scrollTo(day){
  //   let counter = 0;

  //   for(var i = 0; i < this.state.bookedDate.length; i++){
  //     if(day == this.state.bookedDate[i]){
  //       break;
  //     }
  //     counter += 1;
  //   }

  //   this.scrollview_ref.scrollTo({ x: 0, y: this.scrollPos[counter], animated: true })
  // }

  render() {
    const { navigation } = this.props;

    if(this.state.loading){
      var loader = <Loader />
    }

    return (
      <Block 
        //flex 
        center style={styles.home}
      >
        <ImageBackground
          //source={require("../assets/imgs/background2.gif")}
          style={{ width, 
            //height: height * 0.5, 
            zIndex: 1 }}
        >
          {loader}
          <Popup visible={this.state.popUpDialog} choice={this.dateStatusChoice} question={this.state.question}/>
          {/* <Block style={{position: 'absolute', top: 0}}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <View style={{width: width, alignContent: 'center', alignItems: 'center', top: 15}}>
                <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST'}}>
                  Service Info
                </Text>
              </View>
          </Block> */}

          <View style={{flex: 1,
                        //marginTop: 90     
          }}>
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
                        //bookedDate={this.state.bookedDate} 
                        markDate={this.state.clickedDate} toggleDateStatus={this.toggleDateStatus}/>
            </Block>

            {/* <Block flex={0.46} center style={{width: width, paddingBottom: 50}}>
              <ScrollView scrollToOverflowEnabled={true} bounces={true} style={{width: "100%", marginBottom: 50}}  
                      ref={ref => {this.scrollview_ref = ref;}}>
                {this.renderDaySchedule()}
              </ScrollView>
            </Block> */}
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
