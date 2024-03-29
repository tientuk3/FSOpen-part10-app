import { View, ScrollView, StyleSheet } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

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

const AppBar = ({ selectedTab, handleStateChange }) => {
  let navigate = useNavigate();
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [currentMe, setCurrentMe] = useState(null);

  useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {setCurrentMe(data.me)}
  });

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
    navigate("/"); // to default view
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab id='1' nimi='Repositories' destination='/' handleStateChange={handleStateChange} selectedTab={selectedTab}/>
        {currentMe == null &&
          <AppBarTab id='2' nimi='Sign in' destination='/signin' handleStateChange={handleStateChange} selectedTab={selectedTab}/>
        }
        {currentMe &&
          <AppBarTab id='3' nimi='Sign out' destination='/' handleStateChange={signOut} selectedTab={selectedTab}/>
        }
        {currentMe &&
          <AppBarTab id='4' nimi='Create a review' destination='/createreview' handleStateChange={handleStateChange} selectedTab={selectedTab}/>
        }
        {currentMe &&
          <AppBarTab id='5' nimi='My reviews' destination='/myreviews' handleStateChange={handleStateChange} selectedTab={selectedTab}/>
        }
        {!currentMe &&
          <AppBarTab id='6' nimi='Sign up' destination='/signup' handleStateChange={handleStateChange} selectedTab={selectedTab}/>
        }
        </ScrollView>
    </View>
  );
};

export default AppBar;