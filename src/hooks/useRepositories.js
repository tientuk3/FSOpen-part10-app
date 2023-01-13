import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderDirection, orderBy, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(true);


  const result = useQuery(GET_REPOSITORIES, {
    variables: {
      "orderDirection": orderDirection,
      "orderBy": orderBy,
      "searchKeyword": searchKeyword
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {setRepositoryData(data)}
  });
  
  const setRepositoryData = (data) => {
  
    const json = data.repositories;

    setLoading(false);
    setRepositories(json);
  };

  return { repositories, loading, refetch: () => { setLoading(true); result.refetch; }};
};

export default useRepositories;