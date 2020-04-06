import React from "react";
import { StyleSheet } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

class CalendarComponent extends React.Component {

    state= {
        markedDate: {},
        chosenDay: null,
    }

    constructor(props){
        super(props);
        this.setDate = this.setDate.bind(this);
        this.processDate = this.processDate.bind(this);
        this.todayDate = this.todayDate.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    componentDidMount(){
    }

    processDate(){
        //var bookedDate = this.props.bookedDate;
        var unavailableDate = this.props.unavailableDate;
        var markedDate = {}

        // for(var i = 0; i < bookedDate.length; i ++){
        //     markedDate[bookedDate[i]] = {selected: true, customStyles: bookedDay};
        // }
        //markedDate["2020-04-18"] = {selected: true, customStyles: chosenDay};

        for(var i = 0; i < unavailableDate.length; i ++ ){
            markedDate[unavailableDate[i]] = {selected: true, customStyles: unavailable};
        }

        markedDate[this.todayDate()] = {selected: true, customStyles: today}
        console.log(this.todayDate());
        this.setState({markedDate})
    }

    updateDate(clickedDate){
        console.log("clickedDate: " + clickedDate);
        var markedDate = {...this.state.markedDate};
        const {chosenDay} = this.state;

        if (chosenDay) {
            delete markedDate[chosenDay]
        }
        markedDate[clickedDate] = {selected: true, customStyles: chosenStyle};

        // if(this.state.markedDate[clickedDate] && this.state.markedDate[clickedDate].customStyles == unavailable){
        //     delete markedDate[clickedDate]
        // }
        // else{
        //     markedDate[clickedDate] = {selected: true, customStyles: unavailable};
        // }
        this.setState({markedDate: markedDate, chosenDay: clickedDate});
    }

    setDate(day){
        if(!this.state.markedDate[day.dateString] || this.state.markedDate[day.dateString].customStyles != unavailable){
            this.props.toggleDateStatus(false, day.dateString);
        }
        else{
            this.props.toggleDateStatus(true, day.dateString);
        }
    }

    todayDate(){
        let currentDate = new Date();
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth() + 1;
        if(month < 10){
            month = "0" + month;
        }
        let day = currentDate.getDate();
        if(day < 10){
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

    scrollTo(day){
        this.props.scrollTo(day.dateString);
    }

    render() {
        const theme={
            calendarBackground: '#rgba(45, 45, 45, 0.8)',
            textSectionTitleColor: 'white',
            dayTextColor: 'white',
            todayTextColor: '#c20300',
            selectedDayTextColor: 'white',
            monthTextColor: '#999999',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            textDayFontFamily: 'opensans',
            textMonthFontFamily: 'opensans',
            textDayHeaderFontFamily: 'opensans',
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
                week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }
            }
        }
        const calendarStyles = styles;
        
        return (
            <Calendar
                style={calendarStyles.calendar}
                theme={theme}
                markedDates={this.state.markedDate}
                markingType={'custom'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {this.setDate(day)}}
                // Handler which gets executed on day long press. Default = undefined
                //onDayLongPress={(day) => {this.setDate(day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MMMM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Hide month navigation arrows. Default = false
                hideArrows={false}

                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                disableArrowLeft={false}
                // Disable right arrow. Default = false
                disableArrowRight={false}
            />
        );
    }
}

const today = {
    container: {
        backgroundColor: '#bd4902',
        elevation: 2
      },
      text: {
        color: '#ffffff',
        fontWeight:'bold'
      }
}

const chosenStyle = {
    container: {
        backgroundColor: '#ffecd9',
        elevation: 2
      },
      text: {
        color: '#333333',
        fontFamily: 'opensans',
        fontWeight: '600'
      }
}

const unavailable = {
    container: {
        backgroundColor: '#f00000',
        elevation: 2
      },
      text: {
        color: 'white',
        fontFamily: 'opensans',
        fontWeight: '600'
      }
}

const styles = StyleSheet.create({
    calendar: {
        width: "95%",
        borderRadius: 10
    },
  });
export default CalendarComponent;
