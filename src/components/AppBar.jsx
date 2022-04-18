import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBG,
  },
  text: {
    color: '#000000',
    fontSize: 20,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab nimi='Repositories' />
    </View>
  );
};

export default AppBar;