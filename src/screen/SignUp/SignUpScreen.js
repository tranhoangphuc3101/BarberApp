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
import Icon from 'react-native-vector-icons/FontAwesome';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      isSignUp: false,
    };
  }
  async componentDidMount() {
    console.log('NIgga');
  }
  async handleSignUp() {
    this.props.navigation.navigate('Home');
    this.setState({ isSignUp: true });
    console.log(this.state.isSignUp);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.home_text}>Register Nigga</Text>
            <View
              style={{
                height: height_window / 65,
              }}
            />
            <Text style={styles.home_text_detail}>
              Please enter your data to complete your account registration
              process
            </Text>
          </View>
          <View style={styles.input}>
            <View>
              <View style={{ marginTop: height_window / 50 }}>
                <View>
                  <Text style={styles.nameInput_text}>Name</Text>
                </View>
                <Icon
                  style={styles.searchIcon}
                  name="user"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.emailInput}
                  placeholderTextColor="#000"
                />
              </View>
              <View style={{ marginTop: height_window / 50 }}>
                <View>
                  <Text style={styles.emailInput_text}>Email</Text>
                </View>
                <TextInput
                  style={styles.emailInput}
                  placeholderTextColor="#000"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={styles.emailInput_text}>Phone Number</Text>
                </View>
                <TextInput
                  style={styles.passwordInput}
                  placeholderTextColor="#000"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={styles.passwordInput_text}>Password</Text>
                </View>
                <TextInput
                  style={styles.passwordInput}
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={styles.passwordInput_text}>
                    Confirm Password
                  </Text>
                </View>
                <TextInput
                  style={styles.passwordInput}
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => this.handleSignUp()}
              style={styles.signInbutton}
            >
              <Text style={styles.signInText}>Sign Up</Text>
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
    backgroundColor: '#FFFFFF',
  },
  heading: {
    marginTop: height_window / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_text: {
    marginLeft: width_window / 15,
    fontWeight: 'bold',
    fontSize: height_window / 35,
    color: '#363062',
  },
  home_text_detail: {
    marginLeft: width_window / 15,
    fontSize: height_window / 45,
    color: '#363062',
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
  nameInput_text: {
    fontSize: height_window / 45,
    color: 'black',
    paddingLeft: width_window / 35,
  },
  emailInput_text: {
    fontSize: height_window / 45,
    color: 'black',
    paddingLeft: width_window / 35,
  },
  passwordInput_text: {
    fontSize: height_window / 45,
    color: 'black',
    paddingLeft: width_window / 35,
  },
  phoneInput_text: {
    fontSize: height_window / 45,
    color: 'black',
    paddingLeft: width_window / 35,
  },
});
