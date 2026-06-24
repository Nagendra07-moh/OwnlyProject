import { FlatList, StyleSheet } from 'react-native';
import { FilterChip } from './FilterChip';

export function FilterBar({ filters, compact = false }) {
  return (
    <FlatList
      data={filters}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.filters, compact && styles.compactFilters]}
      renderItem={({ item }) => <FilterChip label={item} compact={compact} />}
    />
  );
}

const styles = StyleSheet.create({
  filters: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 18,
  },
  compactFilters: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
