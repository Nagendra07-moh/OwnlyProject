import { useMemo, useRef, useState } from 'react';
import { Animated, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../shared/theme/colors';
import { AllRestaurantsSection } from './components/AllRestaurantsSection';
import { CategoriesSection } from './components/CategoriesSection';
import { HomeHeader } from './components/HomeHeader';
import { MealDealsSection } from './components/MealDealsSection';
import { RestaurantCuratedSection } from './components/RestaurantCuratedSection';
import { ReorderSection } from './components/ReorderSection';
import { SearchBar } from './components/SearchBar';
import { StickyDock } from './components/StickyDock';
import { TopBanner } from './components/TopBanner';
import { homepageData } from './data/homepageData';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [categorySectionY, setCategorySectionY] = useState(null);
  const [categoryPillsLocalY, setCategoryPillsLocalY] = useState(null);
  const categoryY =
    categorySectionY != null && categoryPillsLocalY != null
      ? categorySectionY + categoryPillsLocalY
      : null;
  const [restaurantsY, setRestaurantsY] = useState(null);
  const [filtersLocalY, setFiltersLocalY] = useState(null);
  const filtersY =
    restaurantsY == null || filtersLocalY == null ? null : restaurantsY + filtersLocalY;
  const [searchText, setSearchText] = useState('');
  const scrollHandler = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: false,
      }),
    [scrollY]
  );

  if (!homepageData.serviceability?.isServiceable) {
    return (
      <SafeAreaView style={styles.stateScreen}>
        <Text style={styles.stateTitle}>We are not there yet</Text>
        <Text style={styles.stateCopy}>{homepageData.serviceability?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.statusBarSpacer, { height: insets.top }]} />
      <View style={styles.main}>
        <Animated.ScrollView
          bounces
          showsVerticalScrollIndicator={false}
          style={styles.scroller}
          contentContainerStyle={[styles.content, { paddingBottom: 32 + insets.bottom }]}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          <View style={styles.hero}>
            <HomeHeader />
            <SearchBar searchText={searchText} onSearchChange={setSearchText} />
            <TopBanner banner={homepageData.topBanner} />
          </View>
          <ReorderSection section={homepageData.reorder} />
          <CategoriesSection
            section={homepageData.categories}
            onSectionLayout={(event) => setCategorySectionY(event.nativeEvent.layout.y)}
            onPillsLayout={(event) => setCategoryPillsLocalY(event.nativeEvent.layout.y)}
          />
          <MealDealsSection section={homepageData.mealDeals} />
          {homepageData.restaurantCurations.map((section) => (
            <RestaurantCuratedSection key={section.id} section={section} />
          ))}
          <AllRestaurantsSection
            section={homepageData.allRestaurants}
            onLayout={(event) => setRestaurantsY(event.nativeEvent.layout.y)}
            onFiltersLayout={(event) => setFiltersLocalY(event.nativeEvent.layout.y)}
            searchText={searchText}
          />
        </Animated.ScrollView>
        <StickyDock
          categories={homepageData.categories.items}
          filters={homepageData.allRestaurants.filters}
          categoryY={categoryY}
          filtersY={filtersY}
          scrollY={scrollY}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusBarSpacer: {
    backgroundColor: colors.brand,
  },
  main: {
    flex: 1,
  },
  scroller: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {},
  hero: {
    backgroundColor: colors.brand,
  },
  stateScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  stateTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
  },
  stateCopy: {
    color: colors.secondaryInk,
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
});
