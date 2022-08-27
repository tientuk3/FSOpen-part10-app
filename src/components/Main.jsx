import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBG,
  },
});

const Main = () => {
  
  const [selectedTab, setSelectedTab] = useState('1');
  const setDefaultTab = () => {
    setSelectedTab('1');
  }
  const stateChangeHandler = id => {
    setSelectedTab(id)
  }

  return (
    <View style={styles.container}>
      <AppBar selectedTab={selectedTab} handleStateChange={stateChangeHandler} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn signInCallback={setDefaultTab} />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;