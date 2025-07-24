
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { API_ENDPOINT } from '../../API/API_ENDPOINT';
import axios from 'axios';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;
export default class Home extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    const { API_KEY } = route.params;
    this.state = {
      API_KEY: API_KEY,
    };
  }
  async componentDidMount() {
    console.log('APIKEY: ' + this.state.API_KEY);
    await axios
      .get(API_ENDPOINT + 'user/me', {
        headers: {
          Authorization: `Bearer ${this.state.API_KEY}`,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('APIKEY err: ' + this.state.API_KEY);
        console.error(err.request);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../../img/Barber-shop-logo.webp')}
            style={styles.image}
          />
          <Text style={styles.home_text}>Welcome to Barber</Text>
        </View>
        <View style={styles.buttonView}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Booking')}
          style={styles.signInbutton}
        >
          <Text style={styles.signInText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignIn')}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: height_window / 25,
    color: '#fffafa',
  },
  image: {
    width: width_window / 2,
    height: height_window / 4,
    marginBottom: height_window / 20,
  },
  buttonView: {
    marginTop: height_window / 20,
  },
  signInbutton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height_window / 50,
    paddingHorizontal: width_window / 5,
    borderRadius: 5,
    marginBottom: height_window / 50,
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: height_window / 30,
  },
  signUpButton: {
    backgroundColor: '#f44336',
    paddingVertical: height_window / 50,
    paddingHorizontal: width_window / 5,
    borderRadius: 5,
    marginTop: height_window / 50,
  },
  signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: height_window / 30,
  },
});
