import { View, Pressable, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';

const initialValues = {
  ownerName: '',
  rating: null,
  repositoryName: '',
  text: '',
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
    width: '100%',
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
  ownerName: yup
    .string()
    .required('Pakollinen kenttä'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required()
    .integer(),
  repositoryName: yup
    .string()
    .required('Pakollinen kenttä'),
  text: yup
    .string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="ownerName" />
      <FormikTextInput name="rating" placeholder="rating" />
      <FormikTextInput name="repositoryName" placeholder="repositoryName" />
      <FormikTextInput name="text" placeholder="text" multiline={true} />
      <View style={styles.signInContainer}>
        <Pressable testID='createReviewButton' onPress={onSubmit}>
          <Text style={styles.signInText}>Create review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const CreateReviewContainer = ({onSubmit}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

// wrapper function to contain the side effects of the component
const CreateReview = ({handleSetId}) => {
  let navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);
  
  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const args = {
      "review": {
        "ownerName": ownerName,
        "rating": Number(rating),
        "repositoryName": repositoryName,
        "text": text
      }
    };

    try {
      const data = await mutate({ variables: args });
      return data;
    } catch (e) {
      // console.log(JSON.stringify(e, null, 2));
    }
  };

  const onCreateSuccess = id => {
    handleSetId(id)
    navigate("/item")
  }

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    console.log('Trying to create review');
    console.log(`ownerName: ${ownerName}`);
    console.log(`rating: ${rating}`);
    console.log(`repositoryName: ${repositoryName}`);
    console.log(`text: ${text}`);

    try {
      const { data } = await createReview({ ownerName, rating, repositoryName, text});
      console.log('Review created successfully.')
      console.log(data);
      onCreateSuccess(data.createReview.repositoryId);
    } catch (e) {
      // ???
    }

  };

  return (<CreateReviewContainer onSubmit={onSubmit}/>);
};

export default CreateReview;