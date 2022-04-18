import { Text, Pressable, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  text: {
    color: '#eeeeee',
    fontSize: theme.fontSizes.appBarText,
    fontWeight: 'bold',
  }
});

const AppBarTab = (props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text style={styles.text}>{props.nimi}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;