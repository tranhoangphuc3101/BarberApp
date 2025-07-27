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
import checkTokenValidity from '../../API/yesking';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.navigation.navigate('SignIn');
    // await checkTokenValidity('user').then(async res => {
    //   if (res == false) {
    //     Alert.alert(
    //       'Login Failed',
    //       'Please check your credentials and try again.',
    //       [
    //         {
    //           text: 'OK',
    //           onPress: () => this.props.navigation.navigate('SignIn'),
    //         },
    //       ],
    //     );
    //   } else {
    //     const token = await getToken();
    //     console.log('yesking: ' + token);
    //     this.props.navigation.navigate('SignIn', { API_KEY: token[0] });
    //   }
    // });
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
