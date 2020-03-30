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
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import { Avatar } from "react-native-elements";
import UserProfileAPI from '../api/UserProfileAPI';

const { width, height } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    popUpDialog: false,
    services: [{
            name: "Brownie",
            animal: "Dog",
            avatar_url: 'https://www.thesprucepets.com/thmb/etEd67tJ5QzX77hFJUeA9LiXnyA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg'
        },
        {
            name: "Doodles",
            animal: "Cat",
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYCgrmzr7ZChYsacLvx1748v2NFeWdF2COCab38XRGR_cU973g'
        },
        {
            name: "Ruby",
            animal: "Rabbit",
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUNQSyqHMMSSsaJqoSWXZHb9qsEuJx05db8MxPkjnQAtjdqFad'
        }
    ]
  }

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
  }

  componentDidMount(){
    this.userProfileAPI = new UserProfileAPI();
    this.userProfileAPI.getUserById('5e7e21a3b2d11d00172337de', (res) => {
      console.log(res);
    });
  }

  renderCard(){
    var table = [];
    this.state.services.forEach((item, index) => {
        if(index % 2 == 0 && index + 1 < this.state.services.length){
            table.push(
              <Block key={index} style={styles.container}>
                    <TouchableOpacity style={{...styles.cardService, marginRight: 10}} onPress={() => this.props.navigation.navigate('PetProfile')}>
                        <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                        <Text style={styles.priceTxt}>{item.animal}</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{...styles.cardService}}  onPress={() => this.props.navigation.navigate('PetProfile')} >
                            <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                            <Text style={styles.priceTxt}>{item.animal}</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                </TouchableOpacity>
                </Block>
            )
        }
        else if(index % 2 == 0){
            table.push(
                <Block key={index} style={styles.container}>
                    <View style={{...styles.cardService}}>
                    <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                        <Text style={styles.priceTxt}> {item.animal} </Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                    </View>
                </Block>
            )
        }
    })
    return table
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        
            <Block middle >
            <ImageBackground source={require("../assets/imgs/headerForgetPassword.png")} resizeMode='contain' style={styles.headerImage}/>
            <Text color="#ffffff" size={40} style={{ marginRight: 80, marginTop: 40, fontFamily: 'ITCKRIST'}}>
                Home
            </Text>
            </Block>

            <View style={{marginBottom: 10 }}>
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
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  container:{
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
  petIcon:{
    marginTop: 30,
    color: '#885DDA'
  },
  cardFooter:{
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


// import React, {Component} from 'react';
// import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';
// import { Text, View, ImageBackground, FlatList, TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   ActivityIndicator,StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Block, theme } from 'galio-framework';

// import { Card } from '../components';
// import articles from '../constants/articles';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// const { width } = Dimensions.get('screen');


// class Home extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {   
//       loading: false,
//       listData: [
//         { name: 'Brownie', type: 'Dog', avatar_url: 'https://www.thesprucepets.com/thmb/etEd67tJ5QzX77hFJUeA9LiXnyA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg', page: 'PetProfile' },
//         { name: 'Doodles', type: 'Cat', avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYCgrmzr7ZChYsacLvx1748v2NFeWdF2COCab38XRGR_cU973g', page: 'OtherScreen' },
//         { name: 'Ruby', type: 'Rabbit', avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUNQSyqHMMSSsaJqoSWXZHb9qsEuJx05db8MxPkjnQAtjdqFad', page: 'OtherScreen2' },
//       ],
//       error: null,
//     };
    
//   }

//   renderSeperator = () => {
//     return (
//       <View
//       style={{
//         height: 1,
//         width: '100%',
//         //backgroundColor: '#8ee5ee',
//       }}
//       />
//     );
//   };

//   // renderHeader = () => {
//   //   return <SearchBar placeholder='Search pet...' LightTheme round />;
//   // };

//   render() {
//     let { listData } = this.state;
//     const { navigation } = this.props;

//     return (
//       <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
//       <ScrollView
//       showsVerticalScrollIndicator={true}>
//       <View style={styles.container}>
//         <FlatList
//           keyExtractor={item => item.name}
//           style={{ marginTop: 10}}
//           data={listData}
//           renderItem={({ item }) => {
//             return (
//               <View>
//               <ListItem containerStyle={{backgroundColor: '#FFFFFF', borderRadius: 50, marginBottom: 10}}
//               round
//               roundAvatar
//               leftAvatar={{ source: { uri: item.avatar_url }, borderColor: '#fea87d', borderWidth: 2 }}
//               title={item.name}
//               titleStyle={{color:'#000000'}}
//               subtitle={item.type}
//               subtitleStyle={{color:'#808080'}}
//               // bottomDivider='true'
//               // rightElement={<Icon type="font-awesome" color="#ffc110" size={28} name="chevron-circle-right" onPress={() => this.props.navigation.navigate('PetProfile')} />}
//               chevron={{ color: '#bf3eff', size: 40 }}
//               onPress={() => this.props.navigation.navigate(item.page)}
//               />
//               </View>
//             );
//           }}
//           ItemSeparatorComponent={this.renderSeperator}
//           // ListHeaderComponent={this.renderHeader}
//         />
//         <View style = {{alignSelf: 'flex-end', height: 270, marginTop:15}}>
//          <Icon
//          reverse
//           raised
//           name='plus'
//           type='font-awesome'
//           color='#8dc63f'
//           onPress={() => this.props.navigation.navigate('AddPet')} 
//           />
//           </View>
//       </View>
//       </ScrollView>
//       </ImageBackground>
//     );
//   }
// }

//   // renderArticles = () => {
//   //   return (
//   //     <ScrollView
//   //       showsVerticalScrollIndicator={false}
//   //       contentContainerStyle={styles.articles}>
//   //       <Block flex>
//   //         <Card item={articles[0]} horizontal  />
//   //         <Block flex row>
//   //           <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
//   //           <Card item={articles[2]} />
//   //         </Block>
//   //         <Card item={articles[3]} horizontal />
//   //         <Card item={articles[4]} full />
//   //       </Block>
//   //     </ScrollView>
//   //   )
//   // }

// //   render() {
// //     return (
// //       <Block flex center style={styles.home}>
// //         {this.renderArticles()}
// //       </Block>
// //     );
// //   }
// // }

// const styles = StyleSheet.create({
//   home: {
//     width: width,    
//   },
//   articles: {
//     width: width - theme.SIZES.BASE * 2,
//     paddingVertical: theme.SIZES.BASE,
//   },
//   container: {
//     flex: 1,
//     //borderBottomColor: '#cbd2d9',
//     paddingTop: 20,
//     paddingLeft: 20,
//     paddingRight: 20,
//     //backgroundColor: '#bada55',
// },
// });

// export default Home;

