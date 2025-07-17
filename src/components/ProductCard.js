import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoSection}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',  
    margin: 6,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 10,
  },
  infoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    color: 'green',
    fontSize: 13,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'dodgerblue', 
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',  
    fontWeight: '600',
  },
});

export default ProductCard;
