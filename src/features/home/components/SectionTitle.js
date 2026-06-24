import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export function SectionTitle({ title }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
  },
});
