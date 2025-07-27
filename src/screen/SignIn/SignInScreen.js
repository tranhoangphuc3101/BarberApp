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
import { API_ENDPOINT } from '../../API/API_ENDPOINT';
import { TextInput } from 'react-native-gesture-handler';
import saveToken from '../../apiKey/saveApiKey';
import axios from 'axios';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  async componentDidMount() {}
  async handleSignIn() {
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(API_ENDPOINT + 'user/login/username');
    console.log('========== LOGIN REQUEST ==========');
    await axios
      .post(API_ENDPOINT + 'user/login/username', {
        username: this.state.email,
        password: this.state.password,
      })
      .then(async res => {
        console.log(res.data.token);
        this.props.navigation.navigate('Home', {
          API_KEY: res.data.token,
        });
        await saveToken(res.data.token, res.data.username, this.state.password);
      })
      .catch(err => {
        console.error(err.response);
      });
  }
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
                    onChangeText={text => this.setState({ email: text })}
                  />
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                  />
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => this.handleSignIn()}
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
    backgroundColor: '#FFFFFF',
  },
  topBackground: {
    backgroundColor: '#FF9800',
    height: height_window / 1.8, // tăng chiều cao ảnh nền
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: width_window,
    height: height_window / 1.8, // tăng chiều cao ảnh nền
    resizeMode: 'cover',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  card: {
    position: 'absolute',
    top: height_window / 2.2, // tăng giá trị này để card xuống thấp hơn
    left: 0,
    right: 0,
    marginHorizontal: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  home_text: {
    fontWeight: 'bold',
    fontSize: 32, // tăng font cho Welcome back dài ra
    color: '#363062',
    textAlign: 'left',
    marginBottom: 8,
  },
  wave: {
    fontSize: 32, // tăng font cho emoji
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
