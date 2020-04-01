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
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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
    //console.log(this.props.navigation.state.params);
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

  updatePet(item){
     this.props.navigation.navigate('PetProfile',{pet: item});  
  }


  renderCard() {
    var table = [];
    this.state.petList.forEach((item, index) => {
      if (index % 2 == 0 && index + 1 < this.state.petList.length) {
        var oddItem = this.state.petList[index + 1];
        table.push(
          <Block key={index} style={styles.container}>
            <TouchableOpacity style={{ ...styles.cardService, marginRight: 10 }} onPress={() => {this.updatePet(item)}}>
              <MaterialIcons name='pets' size={40} style={styles.petIcon} />
              <Text style={styles.priceTxt}>{item.animal}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{item.name}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.cardService }} onPress={() => {this.updatePet(oddItem)}} >
              <MaterialIcons name='pets' size={40} style={styles.petIcon} />
              <Text style={styles.priceTxt}>{oddItem.animal}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{oddItem.name}</Text>
              </View>
            </TouchableOpacity>
          </Block>
        )
      }
      else if (index % 2 == 0) {
        table.push(
          
          <Block key={index} style={styles.container}>
            <TouchableOpacity style={{ ...styles.cardService, marginRight: 10 }} onPress={()=> {this.updatePet(item)}}>
              <MaterialIcons name='pets' size={40} style={styles.petIcon} />
              <Text style={styles.priceTxt}>{item.animal}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >

          <Block middle >
            <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='contain' style={styles.headerImage} />
            <Text color="#ffffff" size={40} style={{ marginRight: 80, marginTop: 40, fontFamily: 'ITCKRIST' }}>
              Home
            </Text>
          </Block>

          <View style={{ marginBottom: 10 }}>
            <Block center>
              {this.renderCard()}
            </Block>
          </View>

          <Block>
            <Icon
              reverse
              raised
              name='plus'
              type='font-awesome'
              color='#8dc63f'
              onPress={() => this.props.navigation.navigate('AddPet')}
            />
          </Block>
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
    justifyContent: 'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 50
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
    marginTop: 30,
    color: '#885DDA'
  },
  cardFooter: {
    justifyContent: 'center',
    marginTop: 15,
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
    color: "white",
    fontWeight: "600",
  }
});

export default Home;