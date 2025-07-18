import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

const CartItemCard = ({
  item,
  loadingProductId,
  removingProductId,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.product.image || 'https://via.placeholder.com/150' }}
        style={styles.backgroundImage}
        blurRadius={1}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.cardTop}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productPrice}>
            ${item.product.price} x {item.quantity}
          </Text>
        </View>

        <View style={styles.quantityRow}>
          {loadingProductId === item.product._id ? (
            <ActivityIndicator size="small" color="gray" style={{ marginRight: 12 }} />
          ) : (
            <>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => onDecrease(item.product._id, item.quantity)}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyDisplay}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => onIncrease(item.product._id, item.quantity)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </>
          )}

          {removingProductId === item.product._id ? (
            <View style={[styles.removeButton, { backgroundColor: '#999' }]}>
              <Text style={styles.removeText}>REMOVING...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() =>
                Alert.alert('Remove Item', 'Are you sure?', [
                  { text: 'Cancel' },
                  {
                    text: 'Remove',
                    onPress: () => onRemove(item.product._id),
                  },
                ])
              }
            >
              <Text style={styles.removeText}>REMOVE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  backgroundImage: {
    width: '100%',
    height: 120,
    opacity: 0.3,
    position: 'absolute',
  },
  overlay: { padding: 16 },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  productPrice: { fontSize: 14, color: '#666' },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },
  qtyText: { fontWeight: 'bold', fontSize: 18 },
  qtyDisplay: { marginHorizontal: 10, fontSize: 16 },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeText: { color: 'white', fontWeight: 'bold' },
});

export default CartItemCard;
