import React from "react";
import axios from 'axios';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Notification extends React.Component {

  constructor(props){
    super(props);
  }
  
  render() {
    const { navigation } = this.props;

    return (
      // <Block flex middle >
      <Block flex middle >
        {/* <StatusBar hidden /> */}
        
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1}}
        >
          {/* <Block flex={0.4} middle > */}
          <Block flex={0.15} style={{justifyContent:'flex-start'}}>
            {/* <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='contain' style={styles.headerImage}> */}
            <ImageBackground source={require("../assets/imgs/headerLogin.png")} resizeMode='stretch' style={styles.headerImage}>
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text color="#E1E1E1" size={32} style={{ marginLeft: 15, fontWeight: 'bold'}}>
                        Notification
                    </Text>
                </View>
                {/* <Block flex middle> */}
                <Block flex>
                    {/* <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -65}} */}
                    <MaterialIcons name='keyboard-backspace' size={40} style={{left: 15, top: 35}}
                                  onPress={() => navigation.goBack()}/>
                </Block>
            </ImageBackground> 
          </Block>
          <ScrollView>
          <Block style={{ marginTop: 160}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/03/2020 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/02/2020 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/01/2020 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/12/2019 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/11/2019 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/10/2019 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/09/2019 is successful
                </Text>
             </Block>
            </Block>

            <Block style={{ marginTop: 10}}>
            <Block style={ styles.item }>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                    Booking Successfully
                </Text>
                <Text style={{ fontSize: 18 }}>
                    Your booking for Tom Holland on 02/08/2019 is successful
                </Text>
             </Block>
            </Block>

            </ScrollView>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height * 0.15,
    //justifyContent:'flex-start',
    borderRadius: 4,
    //elevation: 1,
    //overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12,
  },
  item: {
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 20
  }
});

export default Notification;