import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
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
    .required('Pakollinen kenttä')
    .min(3, 'Kentän minimipituus on 3'),
  password: yup
    .string()
    .required('Pakollinen kenttä')
    .min(3, 'Kentän minimipituus on 3'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" />
      <View testID='signInButton' style={styles.signInContainer}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.signInText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignInContainer = ({onSubmit}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// wrapper function to contain the side effects of the component
const SignIn = ({signInCallback}) => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log('Signing in...');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    try {
      const { data } = await signIn({ username, password });
      console.log('Sign in success.')
      console.log(data);
      signInCallback(); // useNavigate would not otherwise change the selected tab state
      navigate("/");
    } catch (e) {
      console.log(e);
    }

  };

  return (<SignInContainer onSubmit={onSubmit}/>);
};

export default SignIn;