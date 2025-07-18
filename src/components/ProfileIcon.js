import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

const ProfileIcon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setModalVisible(false);
    navigation.replace('Login');
  };

  const handleOrderHistory = () => {
    setModalVisible(false);
    navigation.navigate('OrderHistory');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="user" size={24} color="black" style={{ marginLeft: 15 }} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <TouchableOpacity onPress={handleOrderHistory} style={styles.option}>
              <Text style={styles.text}>View Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.option}>
              <Text style={[styles.text, { color: 'red' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    width: 180,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default ProfileIcon;
