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
import Icon from 'react-native-vector-icons/Feather'; // hoặc FontAwesome
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
        <View style={styles.topBackground}>
          <Image
            source={require('../../img/loginTheme.png')}
            style={styles.topImage}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.home_text}>
            Welcome back <Text style={styles.wave}>👋</Text>
          </Text>
          <Text style={styles.about_text}>
            Please enter your login information below to access your account
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputRow}>
              <Icon
                name="mail"
                size={20}
                color="#A1A1AA"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Joesamanta@gmail.com"
                placeholderTextColor="#A1A1AA"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Icon
                name="key"
                size={20}
                color="#A1A1AA"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
              <TouchableOpacity>
                <Icon name="eye" size={20} color="#A1A1AA" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.handleSignIn()}
            style={styles.signInbutton}
          >
            <Text style={styles.signInText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signUpRow}>
            <Text style={styles.signUpLabel}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Text style={styles.signUpLink}>Register</Text>
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
    backgroundColor: '#fff',
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
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 18,
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#363062',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A1E3F8',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#363062',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 14,
  },
  signInbutton: {
    backgroundColor: '#363062',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  signUpLabel: {
    color: '#6B7280',
    fontSize: 15,
  },
  signUpLink: {
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
    textDecorationLine: 'underline',
  },
});
