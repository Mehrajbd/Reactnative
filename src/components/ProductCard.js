import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Button,
} from 'react-native';

const ProductCard = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePurchase = () => {
    setModalVisible(false);
    alert('Purchase confirmed for ' + product.title);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <TouchableHighlight
        style={styles.button}
        underlayColor="#4682B4"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>PURCHASE</Text>
      </TouchableHighlight>

      {/* Purchase Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirm purchase of {product.title}?</Text>
            <View style={styles.modalButtons}>
              <Button title="Confirm" onPress={handlePurchase} />
              <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 10,
    padding: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'dark gray',
  },
  price: {
    fontSize: 14,
    color: 'green', 
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'dodgerblue', 
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'semi-transparent black', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white', 
    padding: 24,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});


export default ProductCard;
