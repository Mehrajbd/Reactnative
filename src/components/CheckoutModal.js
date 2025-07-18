// src/components/CheckoutModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CheckoutModal = ({ visible, onClose, onSubmit, loading }) => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = () => {
    if (!address.trim()) return alert('Please enter shipping address');
    onSubmit({ shippingAddress: address.trim(), paymentMethod });
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Checkout</Text>

          <Text style={styles.label}>Shipping Address</Text>
          <TextInput
            placeholder="Enter your address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Payment Method</Text>
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
                <Text
                  style={{
                    color: paymentMethod === method ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {method.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitBtn}
              disabled={loading}
            >
              <Text style={styles.submitText}>
                {loading ? 'Placing Order...' : 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  paymentOptions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  paymentOption: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#2e86de',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    marginRight: 12,
  },
  cancelText: {
    color: '#777',
  },
  submitBtn: {
    backgroundColor: '#2e86de',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
