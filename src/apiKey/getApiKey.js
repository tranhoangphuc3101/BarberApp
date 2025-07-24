import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken = async () => {
  try {
    let value = await AsyncStorage.getItem('@token');
    let username = await AsyncStorage.getItem('@username');
    let password = await AsyncStorage.getItem('@password');
    return [value, username, password];
  } catch (error) {
    return '';
  }
};
export default getToken;
