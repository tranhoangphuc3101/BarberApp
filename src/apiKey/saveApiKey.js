import AsyncStorage from '@react-native-async-storage/async-storage';
const saveToken = async (token, username, password) => {
  console.log(token);
  console.log(username);
  console.log(password);
  console.log('Yes King save Token');
  await AsyncStorage.setItem('@token', token);
  await AsyncStorage.setItem('@username', username);
  await AsyncStorage.setItem('@password', password);
};

export default saveToken;
