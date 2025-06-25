import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log({ height_window });
    setTimeout(() => this.props.navigation.navigate('onBoard_1'), 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../../img/logoApp.png')}
            style={styles.image}
          />
          <Text style={styles.home_text}>Nigga Barber</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363062',
  },
  heading: {
    marginTop: height_window / 2.5,
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
    justifyContent: 'center',
  },
});
