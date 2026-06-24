import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

const ToggleSwitch = ({ initialValue = false, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const [translateX] = useState(
    new Animated.Value(initialValue ? 16 : 1)
  );

  const toggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    Animated.spring(translateX, {
      toValue: newValue ? 16 : 1,
      useNativeDriver: true,
    }).start();

    onToggle?.(newValue);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggle}
      style={[
        styles.container,
        {
          backgroundColor: isEnabled ? '#19e600' : '#cfcfcf',
        },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 16,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 2,
  },
});

export default ToggleSwitch;