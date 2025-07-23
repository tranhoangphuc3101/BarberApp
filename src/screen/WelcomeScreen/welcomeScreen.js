import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { API_ENDPOINT } from '../../API/API_ENDPOINT';
import getToken from '../../apiKey/getApiKey';
import saveToken from '../../apiKey/saveApiKey';
import axios from 'axios';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const value = await getToken();
    console.log(value);
    try {
      await axios
        .get(API_ENDPOINT + 'user/me', {
          headers: {
            Authorization: `Bearer ${value[0]}`,
          },
        })
        .then(res => {
          console.log(res.data);
          this.props.navigation.navigate('Home', {
            API_KEY: value[0],
          });
        })
        .catch(async err => {
          console.error(err.response.data);
          if (err.response.status == 401) {
            console.log('Please Nigga Login Again');
            await this.AttempLogin();
          }
        });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  async AttempLogin() {
    const value = await getToken();
    console.log('Attempting login...');
    console.log(value[2]);
    await axios
      .post(API_ENDPOINT + 'user/login/username', {
        username: value[1],
        password: value[2],
      })
      .then(async res => {
        console.log(res.data.token);
        this.props.navigation.navigate('Home', {
          API_KEY: res.data.token,
        });
        await saveToken(res.data.token, res.data.username, value[2]);
        console.log('Nigga');
      })
      .catch(err => {
        console.error(err);
        Alert.alert(
          'Login Failed',
          'Please check your credentials and try again.',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('SignIn'),
            },
          ],
        );
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../../img/logoApp.png')}
            style={styles.image}
          />
          <Text style={styles.home_text}>Nigga Barber</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363062',
  },
  heading: {
    marginTop: height_window / 2.5,
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
    justifyContent: 'center',
  },
});
