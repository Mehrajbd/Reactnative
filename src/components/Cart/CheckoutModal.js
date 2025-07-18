import React from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CheckoutModal = ({
  visible,
  onClose,
  shippingAddress,
  setShippingAddress,
  paymentMethod,
  setPaymentMethod,
  placingOrder,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Checkout</Text>

          <TextInput
            placeholder="Shipping Address"
            style={styles.input}
            value={shippingAddress}
            onChangeText={setShippingAddress}
          />

          <View style={styles.paymentOptions}>
            {['card', 'COD'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentOption,
                  paymentMethod === method && styles.selectedPayment,
                ]}
                onPress={() => setPaymentMethod(method)}
              >
                <Text style={{ color: paymentMethod === method ? 'white' : 'black' }}>
                  {method.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: 'gray' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
              disabled={placingOrder}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {placingOrder ? 'Placing...' : 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#2e86de',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmBtn: {
    backgroundColor: '#2e86de',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});

export default CheckoutModal;
