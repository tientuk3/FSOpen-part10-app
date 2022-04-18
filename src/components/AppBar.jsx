import { View, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBG,
    flexDirection: 'row',
  },
  text: {
    color: '#000000',
    fontSize: 20,
  }
});

const AppBar = () => {
  const [selectedTab, setSelectedTab] = useState('1')
  const stateChangeHandler = id => {
    setSelectedTab(id)
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab id='1' nimi='Repositories' destination='/' handleStateChange={stateChangeHandler} selectedTab={selectedTab}/>
        <AppBarTab id='2' nimi='Sign in' destination='/signin' handleStateChange={stateChangeHandler} selectedTab={selectedTab}/>
      </ScrollView>
    </View>
  );
};

export default AppBar;