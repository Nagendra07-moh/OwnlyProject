import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const formatCount = (count) => {
  if (!count) return '';
  return count > 999 ? `${(count / 1000).toFixed(1)}k+` : `${count}+`;
};

export function RestaurantFeedCard({ restaurant }) {
  const cuisines = restaurant.knownFor
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(', ');

  return (
    <View style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          resizeMode="cover"
          fadeDuration={120}
          style={styles.media}
        />
        {!!restaurant.tag && (
          <View style={styles.tag}>
            <Text numberOfLines={1} style={styles.tagText}>
              {restaurant.tag} 
            </Text>
          </View>
        )}
        <View style={styles.knownFor}>
          <Text numberOfLines={1} style={styles.knownForText}>
            Famous for its {restaurant.knownFor[0] || 'signature'} bowl
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text numberOfLines={2} style={styles.name}>
            {restaurant.name}
          </Text>
          <View style={styles.distanceWrap}>
            <Text style={styles.distance}>{restaurant.distance}</Text>
            <Text numberOfLines={1} style={styles.area}>
              {restaurant.area}
            </Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <MaterialIcons name="stars" size={16} color={colors.success}/>
          <Text style={styles.rating}>
             {restaurant.rating}</Text>
          {!!restaurant.ratingCount && (
            <Text style={styles.meta}>({formatCount(restaurant.ratingCount)} •)</Text>
          )}
          <MaterialCommunityIcons name="lightning-bolt-outline" size={12} color={colors.gray} />
          <Text style={styles.meta}>• {restaurant.eta}</Text>
        </View>
        <Text numberOfLines={1} style={styles.cuisines}>
          ₹{restaurant.price} for one | {cuisines}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  mediaWrap: {
    height: 188,
    backgroundColor: colors.mutedSurface,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    left: 10,
    top: 10,
    maxWidth: 150,
    borderRadius: 12,
    backgroundColor: '#eef7ff',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    color: '#2f78d4',
    fontSize: 11,
    fontWeight: '900',
  },
  knownFor: {
    position: 'absolute',
    left: 0,
    right: 90,
    bottom: 10,
    borderRadius: 32,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,
    backgroundColor: 'rgba(31, 31, 31, 0.72)',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  knownForText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '800',
  },
  body: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    flex: 1,
    color: colors.ink,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
  },
  distanceWrap: {
    width: 84,
    alignItems: 'flex-end',
  },
  distance: {
    color: colors.secondaryInk,
    fontSize: 12,
    fontWeight: '800',
  },
  area: {
    color: colors.subtleInk,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
    maxWidth: 84,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  rating: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  meta: {
    color: colors.secondaryInk,
    fontSize: 12,
    fontWeight: '700',
  },
  cuisines: {
    color: colors.subtleInk,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 7,
  },
});
