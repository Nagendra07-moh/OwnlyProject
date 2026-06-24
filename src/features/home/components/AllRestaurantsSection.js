import { StyleSheet, View } from 'react-native';
import { FilterBar } from './FilterBar';
import { RestaurantFeedCard } from './RestaurantFeedCard';
import { SectionTitle } from './SectionTitle';

export function AllRestaurantsSection({ section, onLayout, onFiltersLayout, searchText }) {
  if (!section?.restaurants?.length) {
    return null;
  }

  const filteredRestaurants = section.restaurants.filter((restaurant) => {
    if (!searchText) return true;
    return restaurant.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.section} onLayout={onLayout}>
      <SectionTitle title={section.title} />
      <View onLayout={onFiltersLayout}>
        <FilterBar filters={section.filters} />
      </View>
      <View style={styles.list}>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantFeedCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 30,
  },
  list: {
    gap: 0,
  },
});
