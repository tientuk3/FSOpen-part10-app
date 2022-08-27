import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
        const value = await AsyncStorage.getItem(`${this.namespace}:token`)
        if(value !== null) {
          console.log("Fetched access token: ");
          console.log(value);
          return value;
        }
    } catch(e) {
        console.log(e);
        return;
      }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:token`,
        accessToken,
      )
    } catch(e) {
      console.log(e);
    }
    console.log("Set access token successfully.");
  }

  async removeAccessToken() {
    try {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch(e) {
        console.log(e);
    }
    console.log("Removed access token successfully.");
  }
}

export default AuthStorage;