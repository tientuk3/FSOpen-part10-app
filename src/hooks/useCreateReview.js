import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
  
    const createReview = async ({ ownerName, rating, repositoryName, text }) => {
      const args = {
        "review": {
          "ownerName": ownerName,
          "rating": Number(rating),
          "repositoryName": repositoryName,
          "text": text
        }
      };

      try {
        const data = await mutate({ variables: args });
        return data;
      } catch (e) {
        console.log(JSON.stringify(e, null, 2));
      }
    };
  
    return [createReview, result];
};

export default useCreateReview;