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
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../../img/Barber-shop-logo.webp')}
            style={styles.image}
          />
          <Text style={styles.home_text}>Welcome to Barber</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  heading: {
    marginTop: height_window / 4.25,
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
    width: width_window / 2.5,
    height: height_window / 4.5,
    resizeMode: 'contain',
    marginBottom: height_window / 20,
    alignSelf: 'center',
  },
});
