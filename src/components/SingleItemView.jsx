import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    height: '50%',
    backgroundColor: theme.colors.mainBG,
  },
});

const SingleItemView = (props) => {
  const id = props.id
  console.log(id)

  const [repository, setRepository] = useState()
  const [reviews, setReviews] = useState()

  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  const linkHandler = () => {
    console.log('clicked button')
    Linking.openURL(repository.url)
  }

  useQuery(GET_SINGLE, {
    variables: { id: id },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {setRepositoryData(data)}
  });

  const setRepositoryData = (data) => {
    const repo = data.repository;
    setRepository(repo);
    setReviews(repo.reviews);
    console.log(repo)
    console.log("--- ARVOSTELUT ---")
    console.log(repo.reviews)
  };

  return (
    <View>
      {repository &&
          <FlatList
            data={[repository]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<RepositoryItem item={item} enableUrlButton={true} linkHandler={linkHandler} />)}
          />
      }
      {reviews &&
          <FlatList
            data={reviewNodes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<ReviewItem item={item} />)}
          />
      }
    </View>
  )
}

export default SingleItemView;
