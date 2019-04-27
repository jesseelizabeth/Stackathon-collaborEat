import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Welcome from './components/Welcome';
import CreateGroup from './components/CreateGroup';
import MyGroups from './components/MyGroups';
import AddPlace from './components/AddPlace';
import Group from './components/Group';
import Search from './components/Search';
import '../config/firebaseConfig';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Signup: Signup,
    Login: Login,
    Welcome: Welcome,
    CreateGroup: CreateGroup,
    MyGroups: MyGroups,
    AddPlace: AddPlace,
    Group: Group,
    Search: Search,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
