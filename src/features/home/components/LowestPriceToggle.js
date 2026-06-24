import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

const WIDTH = 108;
const HEIGHT = 42;
const THUMB_WIDTH = 76;
const PADDING = 2;
const MAX_TRANSLATE_X = WIDTH - THUMB_WIDTH - PADDING * 2;

const LowestPriceToggle = ({ value, onChange }) => {
  const translateX = useRef(
    new Animated.Value(value ? MAX_TRANSLATE_X : 0),
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? MAX_TRANSLATE_X : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [value, translateX]);

  const handleToggle = useCallback(() => {
    onChange(!value);
  }, [value, onChange]);
  const backgroundColor = translateX.interpolate({
    inputRange: [0, MAX_TRANSLATE_X],
    outputRange: ['#D9D9D9', '#4CAF50'],
  });

  return (
    <Pressable
      style={styles.container}
      onPress={handleToggle}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
          {
            backgroundColor,
          }
        ]}
      >
        <Text style={styles.label}>
          LOWEST{'\n'}PRICE MODE
        </Text>
      </Animated.View>

      <Text
        style={[
          styles.status,
          value ? styles.statusLeft : styles.statusRight,
        ]}
      >
        {value ? 'On' : 'Off'}
      </Text>
    </Pressable>
  );
};

export default memo(LowestPriceToggle);

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  thumb: {
    position: 'absolute',
    left: PADDING,
    width: THUMB_WIDTH,
    height: HEIGHT - PADDING * 2,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },

  label: {
    fontSize: 6,
    fontWeight: '800',
    color: '#666',
    textAlign: 'center',
    lineHeight: 8,
  },

  status: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: '700',
    color: '#666',
  },

  statusRight: {
    right: 10,
  },

  statusLeft: {
    left: 10,
  },
});