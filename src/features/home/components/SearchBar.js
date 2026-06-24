import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import LowestPriceToggle from './LowestPriceToggle';
import { useState } from 'react';

export function SearchBar({ searchText, onSearchChange }) {
  const [lowestPriceToggle,setLowestPriceToggle] = useState(false)
  return (
    <View style={styles.row}>
      <View style={styles.search}>
        <Text style={styles.icon}>⌕</Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={colors.subtleInk}
          value={searchText}
          onChangeText={onSearchChange}
        />
      </View>
      <LowestPriceToggle value={lowestPriceToggle} onChange={() => setLowestPriceToggle(!lowestPriceToggle)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  search: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 8,
  },
  icon: {
    color: colors.subtleInk,
    fontSize: 18,
    fontWeight: '800',
  },
  input: {
    flex: 1,
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  priceMode: {
    width: 76,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: colors.secondaryInk,
    fontSize: 9,
    fontWeight: '900',
  },
  offText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '800',
  },
});
