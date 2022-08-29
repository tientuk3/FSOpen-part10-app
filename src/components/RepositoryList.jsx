import { FlatList, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

export const RepositoryListContainer = ({ repositories, handleClickRepo }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={ () => handleClickRepo(item.id) }>
          <RepositoryItem item={item} enableUrlButton={false} />
        </TouchableOpacity>
      )}
    />
  );
};


const RepositoryList = ({ handleSetId }) => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const handleClickRepo = id => {
    handleSetId(id)
    navigate("/item")
  }

  return <RepositoryListContainer repositories={repositories} handleClickRepo={handleClickRepo} />;
};

export default RepositoryList;