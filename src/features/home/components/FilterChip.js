import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export function FilterChip({ label, compact = false }) {
  const isRating = label.includes('4+');

  return (
    <View style={[styles.chip, compact && styles.compactChip]}>
      <Text style={[styles.text, compact && styles.compactText, isRating && styles.ratingText]}>
        {label}
      </Text>
      {label === 'Sort by' && <Text style={styles.chevron}>⌄</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 10,
  },
  compactChip: {
    height: 32,
    paddingHorizontal: 12,
  },
  text: {
    color: colors.secondaryInk,
    fontSize: 12,
    fontWeight: '800',
  },
  compactText: {
    fontSize: 11,
  },
  ratingText: {
    color: colors.success,
    fontWeight: '900',
  },
  chevron: {
    color: colors.secondaryInk,
    fontSize: 12,
    fontWeight: '900',
    marginTop: -2,
  },
});
