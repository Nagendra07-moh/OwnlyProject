import { FlatList, StyleSheet, View } from 'react-native';
import { RestaurantMiniCard } from './RestaurantMiniCard';
import { SectionTitle } from './SectionTitle';

export function ReorderSection({ section }) {
  if (!section?.restaurants?.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <SectionTitle title={section.title} />
      <FlatList
        data={section.restaurants}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <RestaurantMiniCard restaurant={item} />}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 26,
  },
  list: {
    paddingLeft: 20,
    paddingRight: 6,
  },
});
