import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { FoodDealCard } from './FoodDealCard';

export function MealDealsSection({ section }) {
  if (!section?.items?.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.panel}>
        <View style={styles.header}>
          {section.badgeImageUrl ? (
            <Image source={{ uri: section.badgeImageUrl }} resizeMode="contain" style={styles.badge} />
          ) : (
            <Text style={styles.title}>{section.title}</Text>
          )}
          <Text style={styles.seeAll}>See all ›</Text>
        </View>
        <FlatList
          data={section.items}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FoodDealCard item={item} />}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  panel: {
    borderRadius: 20,
    backgroundColor: '#fff8f1',
    paddingVertical: 16,
    paddingLeft: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    marginBottom: 12,
  },
  badge: {
    width: 120,
    height: 58,
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  seeAll: {
    color: colors.brand,
    fontSize: 13,
    fontWeight: '900',
  },
});
