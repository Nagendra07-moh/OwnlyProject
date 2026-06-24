import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export function CategoryPill({ item, compact = false }) {
  return (
    <View style={[styles.item, compact && styles.compactItem]}>
      <View style={[styles.imageShell, compact && styles.compactImageShell]}>
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          fadeDuration={120}
          style={[styles.image, compact && styles.compactImage]}
        />
      </View>
      <Text numberOfLines={1} style={[styles.label, compact && styles.compactLabel]}>
        {item.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 82,
    alignItems: 'center',
  },
  compactItem: {
    width: 68,
  },
  imageShell: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.mutedSurface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 64,
    height: 64,
  },
  compactImageShell: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  compactImage: {
    width: 46,
    height: 46,
  },
  label: {
    color: colors.secondaryInk,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 9,
    maxWidth: 78,
  },
  compactLabel: {
    fontSize: 10,
    marginTop: 6,
    maxWidth: 64,
  },
});
