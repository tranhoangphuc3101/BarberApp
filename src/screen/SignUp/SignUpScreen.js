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
      showCountryPicker: false,
      countryCode: '+84',
    };
  }
  async componentDidMount() {}
  async handleSignUp() {
    this.props.navigation.navigate('Auth');
    // await axios
    //   .post(API_ENDPOINT + 'user/create', {
    //     username: this.state.username,
    //     display_name: this.state.username,
    //     email: this.state.email,
    //     password: this.state.password,
    //     phone_number: this.state.phoneNumber,
    //   })
    //   .then(async res => {
    //     console.log(res);
    //     this.props.navigation.navigate('Auth');
    //   })
    //   .catch(err => {
    //     console.error(err.response);
    //   });
  }
  render() {
    return (
      <LinearGradient
        colors={['#a8edea', '#fed6e3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.navigate('SignIn')}
        >
          <IconAntDesign name="arrowleft" size={28} color="#363062" />
        </TouchableOpacity>
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
                modal: { borderRadius: 24 },
                countryName: { color: '#363062' },
                dialCode: { color: '#363062' },
              }}
            />
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
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => this.handleSignUp()}
            style={styles.signInbutton}
          >
            <IconAntDesign name="arrowright" size={22} color="#fff" />
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  heading: {
    alignItems: 'center',
    marginTop: 40, // giảm từ 60 xuống 40 cho cao hơn
    marginBottom: 18,
  },
  home_text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#363062',
    marginBottom: 6,
    letterSpacing: 1,
  },
  home_text_detail: {
    fontSize: 16,
    color: '#363062',
    opacity: 0.7,
    marginBottom: 0,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 28,
    marginHorizontal: 18,
    shadowColor: '#a8edea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: '#363062',
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a8edea',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    color: '#a8edea',
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#363062',
    marginRight: 8,
    fontWeight: '500',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#363062',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonView: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInbutton: {
    flexDirection: 'row',
    backgroundColor: '#363062',
    height: 56,
    width: width_window / 1.25,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#363062',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    letterSpacing: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 6,
  },
});
