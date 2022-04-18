import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  text: {
    color: '#eeeeee',
    fontSize: theme.fontSizes.appBarText,
    fontWeight: 'bold',
  }
});

const AppBarTab = ({ id, nimi, destination, handleStateChange, selectedTab }) => {
  const bgcolor = id == selectedTab ? theme.colors.appBarSelectedTab : theme.colors.appBarBG
  const handlePress = () => { handleStateChange(id) }

  return (
    <View style={[styles.container, {backgroundColor: bgcolor}]}>
      <Link to={destination} onPress={handlePress}>
        <Text style={styles.text}>{nimi}</Text>
      </Link>
    </View>
  );

};

export default AppBarTab;