import { API_ENDPOINT } from './API_ENDPOINT';
import axios from 'axios';
import getToken from '../apiKey/getApiKey';
import saveToken from '../apiKey/saveApiKey';
const checkTokenValidity =  async(usertype) => {
    let isValid = true;
    const value = await getToken();
    await axios
        .get(API_ENDPOINT + usertype + '/me', {
            headers: {
                Authorization: `Bearer ${value[0]}`,
        },
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(async err => {
            await AttempLogin(usertype).then( loginSuccess =>
              {
                console.log('loginsuccess:' + loginSuccess);
                isValid = loginSuccess;
              }
            );
            console.error(err);
        });
    return isValid;
}

async function AttempLogin(usertype) {
    const value = await getToken();
    let loginSuccess = true; 
    console.log('Attempting login...');
    await axios
      .post(API_ENDPOINT + usertype + '/login/username', {
        username: value[1],
        password: value[2],
      })
      .then(async res => {
        console.log(res.data.token);
        await saveToken(res.data.token, res.data.username, value[2]);
      })
      .catch(err => {
        console.error(err.response.data);
        loginSuccess = false
      });
      return loginSuccess;
  }

export default checkTokenValidity;