import React from "react";
import axios from 'axios';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {

  constructor(props){
    super(props);
  }
  
  state = {address: ""}

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        <Block flex={0.2} middle >
          <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
          <Text color="#ffffff" size={40} style={{ marginLeft: 15 }}>
            Notification
          </Text>
        </Block>

          <ScrollView flex={0.8} style={{width: "100%", marginBottom: 50 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
              <Block center style={{width: width, paddingBottom: 50}}>
              <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ backgroundColor: "purple", width: 40, height: 40, borderRadius: 20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'flex-end'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{ justifyContent: 'center' }}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon 
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'flex-end'}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                          </Text>
                      </View>
                    </View>
                  </View>
              </Block>

              </KeyboardAvoidingView>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  inputIcons: {
    marginTop: 10,
    marginRight: 12,
    alignSelf: 'center',
    textAlign: 'center'
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: 'row'
  },
});

export default Notification;
