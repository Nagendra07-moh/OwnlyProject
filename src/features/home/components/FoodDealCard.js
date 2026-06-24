import { Image, StyleSheet, Text, View } from 'react-native';
import { layout } from '../constants';
import { colors } from '../../../shared/theme/colors';

export function FoodDealCard({ item }) {
  const markerColor = item.vegOrNonVeg === 'veg' ? colors.success : '#e04444';

  return (
    <View style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          fadeDuration={120}
          style={styles.media}
        />
        <View style={styles.addButton}>
          <Text style={styles.addText}>＋</Text>
        </View>
      </View>
      <View style={styles.nameRow}>
        <View style={[styles.foodMarker, { borderColor: markerColor }]}>
          <View style={[styles.foodDot, { backgroundColor: markerColor }]} />
        </View>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {!!item.originalPrice && <Text style={styles.original}>₹{item.originalPrice}</Text>}
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.rating}>● {item.rating}</Text>
        <Text style={styles.meta}>• {item.eta}</Text>
      </View>
      <Text numberOfLines={1} style={styles.restaurant}>
        {item.restaurantName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: layout.foodCardWidth,
    marginRight: 14,
  },
  mediaWrap: {
    height: 112,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.mutedSurface,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 38,
    height: 38,
    borderTopLeftRadius: 18,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 10,
  },
  foodMarker: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  foodDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  name: {
    flex: 1,
    minHeight: 32,
    color: colors.ink,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '900',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  price: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: '900',
  },
  original: {
    color: colors.subtleInk,
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  rating: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '900',
  },
  meta: {
    color: colors.secondaryInk,
    fontSize: 11,
    fontWeight: '700',
  },
  restaurant: {
    color: colors.subtleInk,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
  },
});
