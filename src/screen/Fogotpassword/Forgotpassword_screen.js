import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { API_ENDPOINT } from '../../API/API_ENDPOINT';
import saveToken from '../../apiKey/saveApiKey';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <LinearGradient
        colors={['#a8edea', '#fed6e3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="arrow-left" size={28} color="#363062" />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>
            Please enter your email for the password reset process
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Icon
                name="mail"
                size={20}
                color="#A1E3F8"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Joesamanta@gmail.com"
                placeholderTextColor="#A1E3F8"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={this.handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // đẩy nội dung lên trên
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    paddingBottom: 40,
    marginTop: 110, // tăng từ 80 lên 110 để card xuống dưới, tránh nút back
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'stretch',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 28,
    zIndex: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#363062',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#363062',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 28,
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
    color: '#A1E3F8',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#363062',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  sendButton: {
    backgroundColor: '#363062',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
