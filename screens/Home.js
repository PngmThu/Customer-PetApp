import React, {Component} from 'react';
import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';
import { Text, View, ImageBackground, FlatList, TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import { TouchableHighlight } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {   
      loading: false,
      listData: [
        { name: 'Brownie', type: 'Dog', avatar_url: 'https://www.thesprucepets.com/thmb/etEd67tJ5QzX77hFJUeA9LiXnyA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg' },
        { name: 'Doodles', type: 'Cat', avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYCgrmzr7ZChYsacLvx1748v2NFeWdF2COCab38XRGR_cU973g' },
        { name: 'Ruby', type: 'Rabbit', avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUNQSyqHMMSSsaJqoSWXZHb9qsEuJx05db8MxPkjnQAtjdqFad' },
      ],
      error: null,
    };
    
  }

  renderSeperator = () => {
    return (
      <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#8ee5ee',
      }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder='Search pet...' LightTheme round />;
  };

  render() {
    let { listData } = this.state;
    const { navigation } = this.props;

    return (
      <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{flex: 1, width: '100%', height: '100%'}}>
      <ScrollView
      showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.name}
          style={{ marginTop: 0}}
          data={listData}
          renderItem={({ item }) => {
            return (
              <View>
              <ListItem containerStyle={{backgroundColor: '#333333'}}
              roundAvatar
              leftAvatar={{ source: { uri: item.avatar_url }, borderColor: '#fea87d', borderWidth: 2 }}
              title={item.name}
              titleStyle={{color:'#bf3eff'}}
              subtitle={item.type}
              subtitleStyle={{color:'#c795ec'}}
              bottomDivider='true'
              rightElement={<Icon type="font-awesome" color="#ffc110" size={28} name="chevron-circle-right" onPress={() => this.props.navigation.navigate('PetProfile')} />}
              />
              </View>
            );
          }}
          ItemSeparatorComponent={this.renderSeperator}
          ListHeaderComponent={this.renderHeader}
        />
        <View style = {{alignSelf: 'flex-end', height: 270, marginTop:15}}>
         <Icon
         reverse
          raised
          name='plus'
          type='font-awesome'
          color='#8dc63f'
          onPress={() => this.props.navigation.navigate('AddPet')} 
          />
          </View>
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

  // renderArticles = () => {
  //   return (
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={styles.articles}>
  //       <Block flex>
  //         <Card item={articles[0]} horizontal  />
  //         <Block flex row>
  //           <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
  //           <Card item={articles[2]} />
  //         </Block>
  //         <Card item={articles[3]} horizontal />
  //         <Card item={articles[4]} full />
  //       </Block>
  //     </ScrollView>
  //   )
  // }

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderArticles()}
//       </Block>
//     );
//   }
// }

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    flex: 1,
    //borderBottomColor: '#cbd2d9',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    //backgroundColor: '#bada55',
},
});

export default Home;
