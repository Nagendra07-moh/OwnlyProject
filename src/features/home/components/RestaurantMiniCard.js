import { Image, StyleSheet, Text, View } from 'react-native';
import { layout } from '../constants';
import { colors } from '../../../shared/theme/colors';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function RestaurantMiniCard({ restaurant }) {
  const formatNumber = (num)  => {
    if (num < 1000) return String(num);
  
    if (num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
  
    if (num < 1000000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
  
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  return (
    <View style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          resizeMode="cover"
          fadeDuration={120}
          style={styles.media}
        />
        {!!restaurant.brandLogo && (
          <Image source={{ uri: restaurant.brandLogo }} style={styles.logo} />
        )}
      </View>
      <Text numberOfLines={1} style={styles.name}>
        {restaurant.name}
      </Text>
      <View style={styles.metaRow}>
        <View>
        <Octicons name="feed-star" size={10} color="#17A821" />
        </View>
        <Text style={styles.rating}>
           {restaurant.rating}</Text>
           <Text style={styles.orderCount}>{formatNumber(restaurant?.ratingCount)}</Text>
        <Octicons name="dot-fill" size={12} color={colors.gray}/>
        <View style={{flexDirection:'row'}}>
        <MaterialCommunityIcons name="lightning-bolt-outline" size={12} color={colors.gray} />
        <Text numberOfLines={1} style={styles.meta}>
          {restaurant.eta}
        </Text>
        </View>
       
      </View>
      {!!restaurant.tag && (
        <Text numberOfLines={1} style={styles.tag}>
          {restaurant.tag}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: layout.miniCardWidth,
    marginRight: 14,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  mediaWrap: {
    height: 118,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.mutedSurface,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: colors.surface,
  },
  name: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },
  rating: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  dot: {
    color: colors.gray,
    fontSize: 10,
    fontWeight: '700',
  },
  meta: {
    flex: 1,
    color: colors.secondaryInk,
    fontSize: 11,
    fontWeight: '700',
  },
  tag: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 7,
  },
  orderCount:{
    color: colors.lightGray,
    fontSize:12,
    fontWeight:'600'

  }
});
