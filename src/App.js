import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screen/WelcomeScreen/welcomeScreen';
import SignIn from './screen/SignIn/SignInScreen';
import SignUp from './screen/SignUp/SignUpScreen';
import Home from './screen/Home/Home';
import Booking from './screen/BookingAppointment/BookingScreen';
import onBoard_1 from './screen/WelcomeScreen/onBoard_1';
import onBoard_2 from './screen/WelcomeScreen/onBoard_2';
import onBoard_3 from './screen/WelcomeScreen/onBoard_3';
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log('hehe');
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          options={{ title: '', gestureEnabled: false }}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="Booking"
            component={Booking}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="onBoard_1"
            component={onBoard_1}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="onBoard_2"
            component={onBoard_2}
            option={{ title: '', gestureEnabled: false }}
          />
          <Stack.Screen
            name="onBoard_3"
            component={onBoard_3}
            option={{ title: '', gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
