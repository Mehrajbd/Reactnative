import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showToggle = false,
  onTogglePress,
  showPassword = false,
  error,
  inputRef,
}) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholderTextColor="gray"
        />

        {showToggle && (
          <TouchableOpacity onPress={onTogglePress} style={styles.icon}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 10,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    padding: 8,
  },
  error: {
    color: 'red',
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 13,
  },
});
