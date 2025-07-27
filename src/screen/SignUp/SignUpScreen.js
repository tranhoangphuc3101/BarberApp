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
import { API_ENDPOINT } from '../../API/API_ENDPOINT';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { CountryPicker } from 'react-native-country-codes-picker';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
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
  async componentDidMount() {}
  async handleSignUp() {
    // let phone_modify = await this.state.phoneNumber.substring(1);
    // await this.setState({ phoneNumber: phone_modify });
    console.log(this.state.username);
    console.log(this.state.email);
    console.log(this.state.phoneNumber);
    console.log(this.state.password);
    await axios
      .post(API_ENDPOINT + 'user/create', {
        username: this.state.username,
        display_name: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone_number: this.state.phoneNumber,
      })
      .then(async res => {
        console.log(res);
        this.props.navigation.navigate('Auth');
      })
      .catch(err => {
        console.error(err.response);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.home_text}>Register</Text>
          <Text style={styles.home_text_detail}>
            Please enter your data to complete your account registration process
          </Text>
        </View>
        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>User Name</Text>
            <View style={styles.inputRow}>
              <Icon name="user" size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="User Name"
                placeholderTextColor="#363062"
                onChangeText={async username =>
                  await this.setState({ username })
                }
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Icon name="envelope" size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="User Email"
                placeholderTextColor="#363062"
                keyboardType="email-address"
                onChangeText={async email => await this.setState({ email })}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputRow}>
              <Icon name="phone" size={22} style={styles.inputIcon} />
              <TouchableOpacity
                onPress={() => this.setState({ showCountryPicker: true })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Text style={styles.countryCode}>{this.state.countryCode}</Text>
                <Icon name="caret-down" size={18} style={styles.inputIcon} />
              </TouchableOpacity>
              <TextInput
                style={[styles.inputField, { flex: 1 }]}
                placeholder="Phone Number"
                placeholderTextColor="#363062"
                keyboardType="phone-pad"
                onChangeText={async phonenumber =>
                  await this.setState({
                    phoneNumber: this.state.countryCode + phonenumber,
                  })
                }
              />
            </View>
            <CountryPicker
              show={this.state.showCountryPicker}
              pickerButtonOnPress={item => {
                this.setState({
                  countryCode: item.dial_code,
                  showCountryPicker: false,
                });
                console.log(item);
              }}
              onBackdropPress={() =>
                this.setState({ showCountryPicker: false })
              }
              style={{
                height: height_window / 65,
              }}
            />
            <Text style={styles.home_text_detail}>
              Please enter your data to complete your account registration
              process
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Icon name="lock" size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                placeholderTextColor="#363062"
                secureTextEntry={true}
                onChangeText={async text =>
                  await this.setState({ password: text })
                }
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputRow}>
              <Icon name="lock" size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Confirm Password"
                placeholderTextColor="#363062"
                secureTextEntry={true}
              />
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
