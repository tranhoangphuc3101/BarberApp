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

export default class onBoard extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log({ height_window });
    setTimeout(() => this.props.navigation.navigate('onBoard_2'), 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Image
              source={require('../../img/onBoard_1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.CONTAINERS_onboard}>
            <View>
              <Text style={styles.home_text}>Welcom to Nigga Barber</Text>
            </View>
            <View>
              <Text style={styles.info_text}>
                Find the best grooming experience in your city with just one
                tap! Don't miss out on the haircut or treatment of your dreams.
                Let's start now!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}
            >
              <View style={styles.getStartButton}>
                <View>
                  <Text style={styles.getStartButtonText}>Get Start</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    marginTop: height_window / 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_text: {
    fontWeight: 'bold',
    fontSize: height_window / 35,
    color: '#fffafa',
    marginTop: height_window / 50,
  },
  info_text: {
    color: '#fffafa',
    fontSize: height_window / 45,
  },
  image: {
    justifyContent: 'center',
    height: height_window / 1.6,
    width: width_window / 1,
  },
  getStartButton: {
    alignSelf: 'center',
    backgroundColor: '#363062',
    paddingVertical: height_window / 50,
    paddingHorizontal: width_window / 5,
    borderRadius: 20,
    marginTop: height_window / 20,
    width: width_window / 1.5,
  },
  getStartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: height_window / 55,
  },
  CONTAINERS_onboard: {
    height: height_window / 2.5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderColor: '#F99417',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F99417',
  },
});
