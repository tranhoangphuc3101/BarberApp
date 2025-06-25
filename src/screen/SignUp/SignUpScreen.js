import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Image
              source={require('../../img/Barber-shop-logo.webp')}
              style={styles.image}
            />
            <Text style={styles.home_text}>Welcome to Barber</Text>
          </View>
          <View style={styles.input}>
            <View>
              <View style={{ marginTop: height_window / 50 }}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Email"
                  placeholderTextColor="#000"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.signInbutton}
            >
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpButtonText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  heading: {
    marginTop: height_window / 10,
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
    width: width_window / 2.5,
    height: height_window / 4.5,
    resizeMode: 'contain',
    marginBottom: height_window / 20,
    alignSelf: 'center',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailInput: {
    height: height_window / 15,
    width: width_window / 1.2,
    backgroundColor: '#fffafa',
    borderRadius: 10,
    paddingLeft: 10,
  },
  passwordInput: {
    height: height_window / 15,
    width: width_window / 1.2,
    backgroundColor: '#fffafa',
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonView: {
    marginTop: height_window / 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInbutton: {
    backgroundColor: '#fffafa',
    height: height_window / 15,
    width: width_window / 1.2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#000',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#fffafa',
    fontWeight: 'bold',
  },
  signUpButton: {
    marginTop: height_window / 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    color: '#fffafa',
    fontWeight: 'bold',
  },
});
