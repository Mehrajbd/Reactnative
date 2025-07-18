import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const HeaderWithThemeSwitch = ({ darkMode, toggleTheme }) => {
  return (
    <View style={styles.headerRow}>
      <Text style={[styles.headerTitle, { color: darkMode ? 'white' : 'black' }]}>
        All Products
      </Text>

      <View style={styles.topRight}>
        <View style={styles.switchContainer}>
          <Text style={{ color: darkMode ? 'white' : 'black', marginRight: 8 }}>
            {darkMode ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={toggleTheme}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderWithThemeSwitch;
