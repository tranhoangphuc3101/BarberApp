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
import auth from '@react-native-firebase/auth';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ['', '', '', '', '', ''],
      timer: 60,
      canResend: false,
      phoneNumber: '+84775984939',
      setConfirm: null,
    };
    this.interval = null;
  }

  async componentDidMount() {
    this.startTimer();
    const confirmation = await auth().signInWithPhoneNumber(
      this.state.phoneNumber,
    );
    this.setState({ setConfirm: confirmation });
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  startTimer = () => {
    this.setState({ timer: 60, canResend: false });
    this.interval = setInterval(() => {
      this.setState(prev => {
        if (prev.timer <= 1) {
          clearInterval(this.interval);
          return { timer: 0, canResend: true };
        }
        return { timer: prev.timer - 1 };
      });
    }, 1000);
  };

  handleResend = () => {
    // TODO: Gọi API gửi lại OTP ở đây
    this.startTimer();
  };

  handleCodeChange = (text, idx) => {
    const newCode = [...this.state.code];
    const value = text.replace(/[^0-9]/g, '').slice(0, 1);
    newCode[idx] = value;
    this.setState({ code: newCode }, () => {
      // Nếu nhập số thì chuyển sang ô tiếp theo
      if (value && idx < 5) {
        this['input' + (idx + 1)].focus();
      }
    });
  };

  handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === 'Backspace' && idx > 0) {
      // Nếu nhấn Backspace thì luôn lùi về ô trước
      this['input' + (idx - 1)].focus();
    }
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
          <Text style={styles.title}>Enter the Code</Text>
          <Text style={styles.subtitle}>
            A verification code has been sent to
          </Text>
          <Text style={styles.phoneText}>+971 1 123 123 1234</Text>
          <View style={styles.codeRow}>
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <View key={idx} style={styles.circleInputWrapper}>
                <TextInput
                  ref={ref => (this['input' + idx] = ref)}
                  style={styles.circleInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={this.state.code[idx]}
                  onChangeText={text => this.handleCodeChange(text, idx)}
                  onKeyPress={e => this.handleKeyPress(e, idx)}
                  returnKeyType="next"
                />
              </View>
            ))}
          </View>
          {this.state.canResend ? (
            <TouchableOpacity onPress={this.handleResend}>
              <Text style={styles.resendActiveText}>Resend the code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendText}>
              You can resend the code in {this.state.timer} seconds
            </Text>
          )}
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Next</Text>
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
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    paddingBottom: 40,
    marginTop: 110,
    shadowColor: '#a8edea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
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
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#363062',
    marginBottom: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },
  phoneText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#363062',
    marginBottom: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    gap: width_window * 0.012,
    paddingHorizontal: 0,
  },
  circleInputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInput: {
    width: width_window * 0.1,
    height: width_window * 0.1,
    borderRadius: width_window * 0.05,
    borderWidth: 1.5,
    borderColor: '#A1E3F8',
    backgroundColor: '#F9FAFB',
    fontSize: width_window * 0.045,
    color: '#363062',
    textAlign: 'center',
    marginHorizontal: width_window * 0.006,
    shadowColor: '#A1E3F8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
  },
  resendText: {
    color: '#363062',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
  },
  resendActiveText: {
    color: '#A1E3F8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#363062',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    width: '100%',
    shadowColor: '#A1E3F8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  resendText: {
    color: '#363062',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
