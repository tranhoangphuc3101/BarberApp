import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: width_window } = Dimensions.get('window');

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ['', '', '', ''],
    };
  }

  handleCodeChange = (text, idx) => {
    const newCode = [...this.state.code];
    newCode[idx] = text.replace(/[^0-9]/g, '').slice(0, 1);
    this.setState({ code: newCode }, () => {
      // Nếu nhập số thì chuyển sang ô tiếp theo
      if (text && idx < 3) {
        this['input' + (idx + 1)].focus();
      }
      // Nếu xoá thì lùi về ô trước
      if (!text && idx > 0) {
        this['input' + (idx - 1)].focus();
      }
    });
  };

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
          <Text style={styles.title}>Authentication</Text>
          <Text style={styles.subtitle}>
            Please enter the authentication code that we have sent to your email
          </Text>
          <View style={styles.codeRow}>
            {[0, 1, 2, 3].map(idx => (
              <TextInput
                key={idx}
                ref={ref => (this['input' + idx] = ref)}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                value={this.state.code[idx]}
                onChangeText={text => this.handleCodeChange(text, idx)}
                returnKeyType="next"
              />
            ))}
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.resendText}>Have not receive code?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    paddingBottom: 40,
    marginTop: 110, // tăng để phần nhập cao lên
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
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
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A1E3F8',
    backgroundColor: '#F9FAFB',
    fontSize: 22,
    color: '#363062',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#363062',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    width: '100%',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resendText: {
    color: '#363062',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
