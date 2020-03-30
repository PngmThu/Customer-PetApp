import React from "react";
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

          <ScrollView flex={0.8} style={{width: "100%", marginBottom: 100 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
              <Block center style={{width: width, paddingBottom: 50}}>
              <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{ flexDirection: 'row', backgroundColor: "purple", marginTop: 20, marginLeft: 40, width: 40, height: 40, borderRadius: 20 }}>
                        <Icon
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      </View>
                      <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', paddingTop: 12, paddingLeft: 10, paddingRight: 10}}>
                          Your booking for Tom Holland on 20/03/2020 is successful
                      </Text>
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
    marginLeft: 5,
    marginTop: 5,
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
