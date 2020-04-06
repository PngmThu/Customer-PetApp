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
  Image,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import Loader from '../components/Loader';
import { Avatar } from "react-native-elements";

import AuthAPI from "../api/AuthAPI";
import PetAPI from "../api/PetAPI";

const { width, height } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    popUpDialog: false,
    petList: [],
    loading: true,
  }

  constructor(props) {
    super(props);
    this.petAPI = new PetAPI();
    this.authAPI = new AuthAPI();
    this.retrieveData = this.retrieveData.bind(this);
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

  async retrieveData() {
    let customerId = await this.authAPI.retrieveCustomerId();
    this.petAPI.getPetByCustomerId(customerId, (pet) => {
      let petList = [];
      pet.forEach(v => {
        petList.push(v)
      });
      this.setState({ petList: pet }, () => {
        this.setState({ loading: false });
      });
    })
  }

  goPetProfile(item){
     this.props.navigation.navigate('PetProfile',{pet: item});  
  }

  goPetBooking(item){
    this.props.navigation.navigate('PetBooking',{pet: item});  
 }


  renderCard() {
    var table = [];
    this.state.petList.forEach((item, index) => {
      if (index % 2 == 0 && index + 1 < this.state.petList.length) {
        var oddItem = this.state.petList[index + 1];
        table.push(
          <Block key={index} style={styles.container}>
            <Block style={{ ...styles.cardService, marginRight: 10 }} >
              <MaterialIcons name='pets' size={50} style={styles.petIcon} />
              <Block style={styles.buttonRow}>
                <Button style={styles.button} onPress={() => {this.goPetProfile(item)}}>
                  <Text bold size={12} color={"black"}>
                    Profile
                  </Text>
                </Button>
                <Button style={styles.button} onPress={() => {this.goPetBooking(item)}}>
                  <Text bold size={12} color={"black"}>
                    History
                  </Text>
                </Button>
              </Block>

              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{item.name}</Text>
              </View>
            </Block>

            <Block style={{ ...styles.cardService }}>
              <MaterialIcons name='pets' size={50} style={styles.petIcon} />
              <Block style={styles.buttonRow}>
                <Button style={styles.button} onPress={() => {this.goPetProfile(oddItem)}}>
                  <Text bold size={12} color={"black"}>
                    Profile
                  </Text>
                </Button>
                <Button style={styles.button} onPress={() => {this.goPetBooking(oddItem)}}>
                  <Text bold size={12} color={"black"}>
                    History
                  </Text>
                </Button>
              </Block>

              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{oddItem.name}</Text>
              </View>
            </Block>
          </Block>
        )
      }
      else if (index % 2 == 0) {
        table.push(
          
          <Block key={index} style={styles.container}>
            <Block style={{ ...styles.cardService, marginRight: 10 }}>
              <MaterialIcons name='pets' size={50} style={styles.petIcon} />
              <Block style={styles.buttonRow}>
                <Button style={styles.button} onPress={() => {this.goPetProfile(item)}}>
                  <Text bold size={12} color={"black"}>
                    Profile
                  </Text>
                </Button>
                <Button style={styles.button} onPress={() => {this.goPetBooking(item)}}>
                  <Text bold size={12} color={"black"}>
                    History
                  </Text>
                </Button>
              </Block>
              {/* <Text style={styles.priceTxt}>{item.animal}</Text> */}
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{item.name}</Text>
              </View>
            </Block>
          </Block>
        )
      }
    })
    return table
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/galaxy_bg.jpg")}
          style={{ width, height, zIndex: 1 }}
        >

          {loader}

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                Your pets
              </Text>
            </View>
          </ImageBackground>

          <ScrollView style={{marginTop: 5}}>
            <View style={{ marginBottom: 10 }}>
              <Block center>
                {this.renderCard()}
              </Block>
            </View>

            <Block style={{height: height * 0.2}} />
          </ScrollView>
          <Ionicons name='ios-add-circle' size={60} color='#511efa' style={styles.addIcon} 
                    onPress={() => this.props.navigation.navigate('AddPet')}/>
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
    height: 80
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardService: {
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    alignItems: "center",
    height: 160,
    alignSelf: "center",
    borderRadius: 10,
    padding: 0,
    flex: 0.5
  },
  petIcon: {
    marginTop: 20,
    color: '#885DDA'
  },
  cardFooter: {
    justifyContent: 'center',
    marginTop: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    width: "100%",
    height: 38
  },
  priceTxt: {
    marginTop: 15,
    fontFamily: "opensans",
    fontSize: 16,
    color: '#fafafa'
  },
  itemTxt: {
    fontFamily: 'opensans',
    color: '#fafafa',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: "#FF9B70",
    position: 'absolute',
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    right: 30,
    bottom: 100
  },
  addIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 120,
    right: 20,
  },
  button: {
    width: 60,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#a0a7fa"
  },
  buttonRow: {
    width: 130, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20
  }
});

export default Home;