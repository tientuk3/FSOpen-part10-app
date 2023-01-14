import { Text, View, StyleSheet } from 'react-native';
import dateFormat, { masks } from "dateformat";
import theme from '../theme';

const styles = StyleSheet.create({
  separator: { // not used
    height: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 15,
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
  round: {
    width: 50,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 3,
    marginRight: 10,
    borderRadius: (50 / 2),
    borderColor: '#7023c2',
    alignItems: 'center',
    paddingTop: 10
  },
  arvosana: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#7023c2'
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
  teksti: {
    paddingRight: 15,
  },
  pvm: {
    color: '#7a7a7a',
    paddingBottom: 3
  },
  otsikkokenttä: {
    paddingLeft: 12,
    width: '90%',
  }
});

const ReviewItem = (props) => {
  const item = props.item
  const dateString = item.createdAt
  const formattedDate = dateFormat(dateString, 'mediumDate')
  
  return (
    <View testID="reviewItem" style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.round}>
          <Text style={styles.arvosana}>{item.rating}</Text>
        </View>
        <View style={styles.otsikkokenttä}>
          <Text style={styles.otsikko}>{item.user.username}</Text>
          <Text style={styles.pvm}>{formattedDate}</Text>
          <Text style={styles.teksti}>{item.text}</Text>
        </View>
      </View>
      
    </View>
  )
}

export const MyReviewItem = (props) => {
  const item = props.item
  const dateString = item.createdAt
  const formattedDate = dateFormat(dateString, 'mediumDate')
  
  return (
    <View testID="reviewItem" style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.round}>
          <Text style={styles.arvosana}>{item.rating}</Text>
        </View>
        <View style={styles.otsikkokenttä}>
          <Text style={styles.otsikko}>{item.repository.ownerName}/{item.repository.name}</Text>
          <Text style={styles.pvm}>{formattedDate}</Text>
          <Text style={styles.teksti}>{item.text}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default ReviewItem;