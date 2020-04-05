import * as React from 'react';
import { Button, Text, Dimensions, StyleSheet, Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createAppContainer, 
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import { fadeIn, fromLeft, fromRight } from 'react-navigation-transitions';
// screens
import Home from "../screens/Home";
import MyProfile from "../screens/MyProfile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword"
import Booking from "../screens/Booking"
import AddPet from "../screens/AddPet";
import PetProfile from "../screens/PetProfile";
import ChangePassword from "../screens/ChangePassword";
import Notification from "../screens/Notification";
import PetBooking from "../screens/PetBooking";
import BookingDetails from "../screens/BookingDetails";
const { width, height } = Dimensions.get('screen');
// drawer
import { MaterialIcons } from '@expo/vector-icons';


const PetProfileStack = createStackNavigator(
  {
    PetProfile: {
      screen: PetProfile,
      navigationOptions: {
        header: null,
      }
    },
    PetBooking: {
      screen: PetBooking,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions:{
        header: null
      }
    },
    AddPet: {
      screen: AddPet,
      navigationOptions:{
        header: null
      }
    },
    PetProfile: {
      screen: PetProfile,
      navigationOptions:{
        header: null
      }
    },
    PetBooking: {
      screen: PetBooking,
      navigationOptions: {
        header: null
      }
    },
    BookingDetails: {
      screen: BookingDetails,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const BookingStack = createStackNavigator(
  {
    Booking: {
      screen: Booking,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfile,
      navigationOptions:{
        header: null
      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions:{
        header: null
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const NotificationStack = createStackNavigator(
  {
    Notification: {
      screen: Notification,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const HomeTab = createBottomTabNavigator(
  {
    Home: HomeStack,
    Booking: BookingStack,
    Notification: NotificationStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const route = navigation.state.routeName;
  
      return {
        tabBarIcon: ({ tintColor }) => {
          const name = {
            'Home': 'apps',
            'Profile': 'person',
            'Booking': 'list',
            'Notification': 'mail'
          }[route]
          return <MaterialIcons name={name} color={tintColor} size={22} />
        },
        tabBarOptions: {
          activeBackgroundColor: 'rgb(20,20,20)',
          activeTintColor: 'white',
          inactiveTintColor: '#fafafa',
          style: styles.container,
          tabStyle: styles.tab,
        }
      }
    },
    transitionConfig: () => {
      return fromRight(1000);
    }
  },
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: Register,  
      navigationOptions: {
        header: null,
      }
    },
    ForgetPassword: {
      screen: ForgetPassword,  
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading:{
    screen: AuthLoadingScreen,  
    navigationOptions: {
      header: null,
    }
  },
  Account: {
    screen: LoginStack,
    navigationOptions: {
      header: null
    }
  }, 
  Main : {
    screen: HomeTab,  
    navigationOptions: {
      header: null,
    }
  }, 
  }
));

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45, 45, 45, 0.95)',
    height: 45,
    borderTopWidth: 0
  },
  tab: {
    borderRadius: 0,
  }
});
