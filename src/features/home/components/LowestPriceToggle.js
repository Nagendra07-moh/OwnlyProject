import React, { memo, useCallback } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LowestPriceToggle = ({ value, onChange }) => {
  const handleToggle = useCallback(() => {
    onChange(!value);
  }, [value, onChange]);

  return (
    <Pressable
      style={styles.container}
      onPress={handleToggle}
    >
      <View style={styles.thumb}>
        <Text style={styles.label}>
          LOWEST{'\n'}PRICE MODE
        </Text>
      </View>

      <Text style={styles.status}>
        {value ? 'On' : 'Off'}
      </Text>
    </Pressable>
  );
};

export default memo(LowestPriceToggle);

const styles = StyleSheet.create({
  container: {
    width: 108,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },

  thumb: {
    width: 74,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },

  label: {
    fontSize: 6,
    fontWeight: '800',
    color: '#666',
    textAlign: 'center',
    lineHeight: 8,
  },

  status: {
    flex: 1,
    textAlign: 'center',
    fontSize: 7,
    fontWeight: '700',
    color: '#666',
  },
});