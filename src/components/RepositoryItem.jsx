import { Image, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: { // not used
    height: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.repoBG,
  },
  item: {
  },
  tekstit: {
    paddingHorizontal: 6,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  kuva: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  kieli: {
    fontWeight: 'bold',
    paddingTop: 4,
    color: '#391a3b',
  },
  otsikko: {
    fontWeight: 'bold',
    paddingBottom: 4,
    fontSize: 16,
  },
  otsikkokenttä: {
    paddingLeft: 12,
    width: '90%',
  },
  lukumaara: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});

const SubItem = ({ name, count }) => {
  let lkm = `${count}`
  if (count >= 1000) {
    lkm = `${(count/1000).toFixed(1)}k`
  }
  return (
    <View style={{alignItems: 'center', paddingHorizontal: 12}}>
      <Text style={styles.lukumaara}>{lkm}</Text>
      <Text style={{color: '#616161', fontSize: 14}}>{name}</Text>
    </View>
  )
}

const RepositoryItem = (props) => {
  const item = props.item
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.kuva}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.otsikkokenttä}>
          <Text style={styles.otsikko}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.kieli}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.tekstit}>
        <SubItem name='Stars' count={item.stargazersCount} />
        <SubItem name='Forks' count={item.forksCount} />
        <SubItem name='Reviews' count={item.reviewCount} />
        <SubItem name='Rating' count={item.ratingAverage} />
      </View>
      
    </View>
  )
}

export default RepositoryItem