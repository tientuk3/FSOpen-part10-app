import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleItemView from './SingleItemView';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

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

  const [selectedSingleId, setSelectedSingleId] = useState(null)
  const setId = id => {
    setSelectedSingleId(id)
    setSelectedTab(1) // ???
  }

  return (
    <View style={styles.container}>
      <AppBar selectedTab={selectedTab} handleStateChange={stateChangeHandler} />
      <Routes>
        <Route path="/" element={<RepositoryList handleSetId={setId}/>} exact />
        <Route path="/signin" element={<SignIn signInCallback={setDefaultTab} />} exact />
        <Route path="/signup" element={<SignUp onSuccess={setDefaultTab} />} exact />
        <Route path="/item" element={<SingleItemView signInCallback={setDefaultTab} id={selectedSingleId} />} exact />
        <Route path="/createreview" element={<CreateReview handleSetId={setId} />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;