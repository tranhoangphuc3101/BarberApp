import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <ImageBackground
              source={require('../../img/loginTheme.png')}
              style={styles.image}
            />
            <View style={styles.container_login}>
              <View>
                <Text style={styles.home_text}>Welcome back 👋</Text>
                <Text style={styles.about_text}>
                  Please enter your login information below to access your
                  account
                </Text>
              </View>
              <View style={styles.input}>
                <View>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Email"
                    placeholderTextColor="#000"
                  />
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={styles.signInbutton}
                >
                  <Text style={styles.signInText}>Login</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={styles.signUpButton}
                >
                  <Text style={styles.signUpButtonText}>
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F99417',
  },
  heading: {
    marginTop: height_window / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_text: {
    fontWeight: 'bold',
    fontSize: height_window / 30,
    color: '#363062',
    paddingLeft: width_window / 20,
  },
  about_text: {
    fontSize: height_window / 45,
    color: '#6B7280',
    paddingLeft: width_window / 20,
  },
  image: {
    alignSelf: 'center',
    height: height_window / 3,
    width: width_window / 1.3,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height_window / 20,
  },
  emailInput: {
    height: height_window / 15,
    width: width_window / 1.2,
    backgroundColor: '#fffafa',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
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
    backgroundColor: '#363062',
    height: height_window / 15,
    width: width_window / 1.2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#F9FAFB',
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
    color: '#6B7280',
    fontWeight: 'bold',
  },
  container_login: {
    height: height_window / 1.5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderColor: '#F9FAFB',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F9FAFB',
  },
});
