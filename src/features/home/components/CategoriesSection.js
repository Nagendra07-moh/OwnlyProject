import { FlatList, StyleSheet, View } from 'react-native';
import { CategoryPill } from './CategoryPill';
import { SectionTitle } from './SectionTitle';
import { useCallback } from 'react';


export function CategoriesSection({ section, onSectionLayout, onPillsLayout }) {
  if (!section?.items?.length) {
    return null;``
  }

  const renderCategories = useCallback(
    ({ item }) => <CategoryPill item={item} />,
    []
  );

  return (
    <View style={styles.section} onLayout={onSectionLayout}>
      <SectionTitle title={section.title} />
      <View onLayout={onPillsLayout}>
        <FlatList
          data={section.items}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={renderCategories}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 28,
  },
  list: {
    paddingLeft: 18,
    paddingRight: 10,
  },
  column: {
    gap: 18,
    marginRight: 12,
  },
});
