import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    paddingBottom: 10,
    color: '#d73a4a',
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#d73a4a",
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const secureTextEntry = (name === 'password' || name === 'confirmPassword') ? true : false

  return (
    <>
      <TextInput style={[styles.input, meta.error && styles.inputError]}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;