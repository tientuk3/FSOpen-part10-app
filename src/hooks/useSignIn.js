import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);
    const authStorage = useAuthStorage();
    const client = useApolloClient();
  
    const signIn = async ({ username, password }) => {
      const args = {
        "credentials": {
          "username": username,
          "password": password
        }
      };

      const data = await mutate({ variables: args });

      // debug info
      console.log("DATA:");
      console.log(data.data.authenticate);

      // save token to storage
      await authStorage.setAccessToken(data.data.authenticate.accessToken);
      client.resetStore();
      console.log("Token set successfully.")

      return data;
    };
  
    return [signIn, result];
};

export default useSignIn;