import { View, Pressable, StyleSheet } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#eeeeee',
    fontSize: theme.fontSizes.appBarText,
    fontWeight: 'bold',
  },
  signInContainer: {
    backgroundColor: theme.colors.signInButton,
    width: '30%',
    borderRadius: 7,
    alignItems: 'center',
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    paddingTop: 10,
    color: '#ffffff',
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Pakollinen kenttä'),
  password: yup
    .string()
    .min(5)
    .max(30)
    .required('Pakollinen kenttä'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Pakollinen kenttä')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" />
      <FormikTextInput name="confirmPassword" placeholder="confirm password" />
      <View style={styles.signInContainer}>
        <Pressable testID='signUpButton' onPress={onSubmit}>
          <Text style={styles.signInText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignUpContainer = ({onSubmit}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// wrapper function to contain the side effects of the component
const SignUp = ({onSuccess}) => {
  let navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const args = {
      "user": {
        "username": username,
        "password": password
      }
    };

    try {
      const data = await mutate({ variables: args });
      return data;
    } catch (e) {
      console.log("failed to create user")
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log('Trying to create user');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    try {
      await createUser({ username, password });
      console.log('User created successfully.')
      await signIn({ username, password });
      onSuccess();
      navigate("/");
    } catch (e) {
      // ???
      console.log("Sign up failed!!")
    }

  };

  return (<SignUpContainer onSubmit={onSubmit}/>);
};

export default SignUp;