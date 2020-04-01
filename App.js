import React, {useEffect} from 'react';
import { Image, NetInfo, Alert, Platform, BackHandler, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import * as Font from 'expo-font';
import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';
import { Notifications } from 'expo';
// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    internetConnection: false,
    userToken: false
  }

  componentDidMount(){
    this.CheckConnectivity();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  CheckConnectivity(){
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          this.setState({internetConnection: true})
        } else {
          Alert.alert('Internet connection', 'Please connect to the Internet!', 
          [{text: 'Ok', onPress: () => {BackHandler.exitApp()}}],
          { cancelable: false });
        }
      });
    }
  };

  render() {
    if(!this.state.isLoadingComplete || !this.state.internetConnection) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GalioProvider theme={argonTheme} >
          <Block flex style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
            <Screens />
          </Block>
        </GalioProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'opensans': require('./assets/font/opensans.ttf'),
      'ITCKRIST': require('./assets/font/ITCKRIST.ttf')
    })
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _handleNotification = notification => {
  };
}
