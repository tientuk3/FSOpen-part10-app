import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const HeaderComponent = ({ pickerValue, handleChangeSelected, searchText, onSearchTextChange }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onSearchTextChange}
        value={searchText}
      />
      <Picker style={{}} selectedValue={pickerValue} onValueChange={(itemValue, itemIndex) => handleChangeSelected(itemValue)}>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest rating" value="highest" />
        <Picker.Item label="Lowest rating" value="lowest" />
      </Picker> 
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, handleClickRepo, handleChangeSelected, pickerValue, searchText, onSearchTextChange }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<HeaderComponent pickerValue={pickerValue} handleChangeSelected={handleChangeSelected} searchText={searchText} onSearchTextChange={onSearchTextChange} /> }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={ () => handleClickRepo(item.id) }>
          <RepositoryItem item={item} enableUrlButton={false} />
        </TouchableOpacity>
      )}
    />
  );
};


const RepositoryList = ({ handleSetId }) => {
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [selectedValueText, setSelectedValueText] = useState("Latest")
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSeachQuery] = useDebounce(searchQuery, 300);
  const { repositories } = useRepositories(orderDirection, orderBy, debouncedSeachQuery);
  const navigate = useNavigate();

  const handleClickRepo = id => {
    handleSetId(id)
    navigate("/item")
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    console.log(value)
  }

  const handleChangeSelected = (value) => {
    switch (value) {
      case "latest":
        setOrderBy("CREATED_AT")
        setSelectedValueText(value)
        break
      case "highest":
        setOrderBy("RATING_AVERAGE")
        setOrderDirection("DESC")
        setSelectedValueText(value)
        break
      case "lowest":
        setOrderBy("RATING_AVERAGE")
        setOrderDirection("ASC")
        setSelectedValueText(value)
        break
      default:
        console.log("picker error! invalid val", value)
    }
  }

  return <RepositoryListContainer repositories={repositories}
                                  handleClickRepo={handleClickRepo}
                                  handleChangeSelected={handleChangeSelected}
                                  pickerValue={selectedValueText}
                                  searchText={searchQuery} 
                                  onSearchTextChange={handleSearchChange} />;
};

export default RepositoryList;