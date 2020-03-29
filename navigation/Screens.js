import * as React from 'react';
import { Button, Text, View, StyleSheet, Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator
} from "react-navigation";

import { Block } from "galio-framework";
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import MyProfile from "../screens/MyProfile";
import Login from "../screens/Login";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword"
import Booking from "../screens/Booking"
import Notifications from "../screens/Notifications";
import AddPet from "../screens/AddPet";
import Settings from "../screens/Settings";
import Logout from "../screens/Logout";
import PetProfile from "../screens/PetProfile";
import AccountSettings from "../screens/AccountSettings";
import ChangePassword from "../screens/ChangePassword";
import EditProfile from "../screens/EditProfile";
import Notification from "../screens/Notification";
import PetBooking from "../screens/PetBooking";


// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

// const BookingStack = createStackNavigator({
//   Elements: {
//     screen: Booking,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header title="Booking" navigation={navigation} />
//     })
//   }
// },{
//   cardStyle: {
//     backgroundColor: "#F8F9FE"
//   },
//   transitionConfig
// });

const NotificationsStack = createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Notifications" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const AddPetStack = createStackNavigator({
  AddPet: {
    screen: AddPet,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="AddPet" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: null,
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null,
      }
    },
      Notification: {
        screen: Notification,
        navigationOptions: {
          header: null,
        }
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Settings" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const LogoutStack = createStackNavigator(
  {
    Profile: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Logout" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const AccountSettingsStack = createStackNavigator(
  {
    Profile: {
      screen: AccountSettings,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Account Settings" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

// const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: ({ navigation }) => ({
//         header: <Header search options title="Home" navigation={navigation} />
//       })
//     },
//     AddPet: {
//       screen: AddPet,
//       navigationOptions: ({ navigation }) => ({
//         header: (
//           <Header left={<Block />} white transparent title="Add a pet!" navigation={navigation} />
//         ),
//         headerTransparent: true
//       })
//     }
//   },
//     Pro: {
//       screen: Pro,
//       navigationOptions: ({ navigation }) => ({
//         header: (
//           <Header left={<Block />} white transparent title="" navigation={navigation} />
//         ),
//         headerTransparent: true
//       })
//     }
//   },
//   {
//     cardStyle: {
//       backgroundColor: "#F8F9FE"
//     },
//     transitionConfig
//   }
// );

const PetProfileStack = createMaterialTopTabNavigator(
  {
    PetProfile: {
      screen: PetProfile,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        // header: (
        //   <Header navigation={navigation} />
        // ),
        // headerTransparent: true
      })
    },
    PetBooking: {
      screen: PetBooking,
      navigationOptions: ({ navigation }) => ({
        title: 'Bookings',
        // header: (
        //   <Header navigation={navigation} />
        // ),
        // headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        // header: <Header title="Home" navigation={navigation} />
      })
    },
    AddPet: {
      screen: AddPet,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header navigation={navigation} />
        // ),
        // headerTransparent: true
      })
    },
    PetProfile: {
      screen: PetProfileStack,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header navigation={navigation} />
        // ),
        // headerTransparent: true
      })
    }
  },
  { headerMode: 'none' },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const HomeTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />,
        title: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    size={20}
                    color={tintColor} />
            ),
      })
    },
    Booking: {
      screen: Booking,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Booking" navigation={navigation} />,
        title: "Booking",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="calendar-alt"
                    size={20}
                    color={tintColor} />
            )
      })
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Notifications" navigation={navigation} />,
        title: "Notifcations",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="bullhorn"
                    size={19}
                    color={tintColor} />
            )
      })
    },
    Profile: {
      screen: MyProfile,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Profile" navigation={navigation} />,
        title: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="user-alt"
                    size={19}
                    color={tintColor} />
            )
      })
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
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
    },
    ChangePassword: {
      screen: ChangePassword,  
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    cardStyle: { backgroundColor: "#454545" },
    transitionConfig
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
    cardStyle: { backgroundColor: "#454545" },
    transitionConfig
  }
);

// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
// const AppStack = createDrawerNavigator(
//   {
//     Account: {
//       screen: LoginStack,
//       navigationOptions: navOpt => ({
//         drawerLabel: ({ focused }) => (
//           <DrawerItem focused={focused} screen="AccountSettings" title="Account Settings" />
//         )
//       })
//     },
    // Home: {
    //   screen: HomeStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} title="Home" />
    //     )
    //   })
    // },
    // Home: {
    //   screen: HomeTab,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} title="Home" />
    //     )
    //   })
    // },
    // Account: {
    //   screen: LoginStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Login" title="Account" />
    //     )
    //   })
    // },
    // Account: {
    //   screen: LoginStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Login" title="Log Out" />
    //     )
    //   })
    // },

    // Settings: {
    //   screen: SettingsStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Settings" title="Settings" />
    //     )
    //   })
    // },
    // Logout: {
    //   screen: LogoutStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Logout" title="Logout" />
    //     )
    //   })
    // },
    // Profile: {
    //   screen: ProfileStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Profile" title="Profile" />
    //     )
    //   })
    // },
    // Elements: {
    //   screen: ElementsStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Elements" title="Elements" />
    //     )
    //   })
    // },
    // Articles: {
    //   screen: ArticlesStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Articles" title="Articles" />
    //     )
    //   })
    // },
    // Bookings: {
    //   screen: BookingsStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Bookings" title="Bookings" />
    //     )
    //   })
    // },
    // Notifications: {
    //   screen: NotificationsStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Notifications" title="Notifications" />
    // Booking: {
    //   screen: BookingStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Articles" title="Articles" />
    //     )
    //   })
    // },
//   },
//   Menu
// );

// const AppContainer = createAppContainer(AppStack);

const AppContainer = createAppContainer(createStackNavigator({
  Login: {
    screen: LoginStack,
    navigationOptions: {
      header: null
    }
  }, 
  Home : {
    screen: HomeTab,  
    navigationOptions: {
      header: null,
    }
  }, 
  }
));

export default AppContainer;


