import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {
  Home,
  MyGroups,
  Login,
  Signup,
  Welcome,
  CreateGroup,
  AddPlace,
  Group,
  Search,
  PlaceDetails,
} from './index';

const AuthStack = createStackNavigator({
  Home: Home,
  Login: Login,
  Signup: Signup,
});

const HomeStack = createStackNavigator({
  Welcome: Welcome,
});

const MyGroupsStack = createStackNavigator({
  Groups: MyGroups,
  CreateGroup: CreateGroup,
  AddPlace: AddPlace,
  Group: Group,
  Search: Search,
  PlaceDetails: PlaceDetails,
});

const CreateGroupStack = createStackNavigator({
  CreateGroup: CreateGroup,
  AddPlace: AddPlace,
  Group: Group,
  Search: Search,
  PlaceDetails: PlaceDetails,
});

const TabNavigator = createBottomTabNavigator(
  {
    'Create Group': CreateGroupStack,
    Home: HomeStack,
    Groups: MyGroupsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let size;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          size = 25;
        } else if (routeName === 'Groups') {
          iconName = 'ios-people';
          size = 25;
        } else if (routeName === 'Create Group') {
          iconName = 'ios-person-add';
          size = 25;
        }
        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#eb4d4b',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

// const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
