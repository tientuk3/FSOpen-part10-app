import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_REVIEWS, GET_ME } from '../graphql/queries';
import { MyReviewItem } from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    minHeight: 230
  },
});

const MyReviewsView = (props) => {
  const id = props.id
  console.log(id)

  const [reviews, setReviews] = useState(null)
  const [currentMe, setCurrentMe] = useState(null)
  const [myReviews, setMyReviews] = useState(null)

  useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {setCurrentMe(data.me)}
  });

  useQuery(GET_ALL_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {setReviews(data)}
  });

  useEffect(() => {
    if (reviews && currentMe) {
      setReviewData(reviews)
    }
  }, [reviews, currentMe])

  const setReviewData = (data) => {
    var temp_reviews = []
    for (const repo_reviews of data.repositories.edges) {
      for (const review of repo_reviews.node.reviews.edges) {
        if (review.node.user.username === currentMe.username) {
          temp_reviews.push(review.node)
        }
      }
    }
    setMyReviews(temp_reviews)
  };

  return (
    <View>
      {reviews &&
          <FlatList
            data={myReviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<MyReviewItem item={item} />)}
          />
      }
    </View>
  )
}

export default MyReviewsView;
