import { FlatList, ProgressViewIOSBase, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';

export const RepositoryListContainer = ({ repositories, handleClickRepo, handleChangeSelected, pickerValue }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Picker style={{}} selectedValue={pickerValue} onValueChange={(itemValue, itemIndex) => handleChangeSelected(itemValue)}>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest rating" value="highest" />
        <Picker.Item label="Lowest rating" value="lowest" />
      </Picker>}
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
  const { repositories } = useRepositories(orderDirection, orderBy);
  const navigate = useNavigate();

  const handleClickRepo = id => {
    handleSetId(id)
    navigate("/item")
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

  return <RepositoryListContainer repositories={repositories} handleClickRepo={handleClickRepo} handleChangeSelected={handleChangeSelected} pickerValue={selectedValueText} />;
};

export default RepositoryList;