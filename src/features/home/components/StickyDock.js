import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { layout } from '../constants';
import { colors } from '../../../shared/theme/colors';
import { CategoryPill } from './CategoryPill';
import { FilterBar } from './FilterBar';

const STICK_FADE_DISTANCE = 18;

const buildVisibility = (scrollY, threshold) => {
  if (threshold == null) {
    return {
      opacity: 0,
      transform: [{ translateY: -STICK_FADE_DISTANCE }],
    };
  }

  return {
    opacity: scrollY.interpolate({
      inputRange: [threshold - STICK_FADE_DISTANCE, threshold],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [threshold - STICK_FADE_DISTANCE, threshold],
          outputRange: [-STICK_FADE_DISTANCE, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};

export function StickyDock({ categories, filters, categoryY, filtersY, scrollY }) {
  const [activeState, setActiveState] = useState({ category: false, filters: false });
  const [categoryDockHeight, setCategoryDockHeight] = useState(layout.stickyCategoryHeight);
  const activeRef = useRef(activeState);
  const filterThreshold =
    filtersY == null ? null : filtersY - categoryDockHeight;
  const categoryStyle = buildVisibility(scrollY, categoryY);
  const filtersStyle = buildVisibility(scrollY, filterThreshold);

  useEffect(() => {
    const subscriptionId = scrollY.addListener(({ value }) => {
      const nextState = {
        category: categoryY != null && value >= categoryY - STICK_FADE_DISTANCE,
        filters: filterThreshold != null && value >= filterThreshold - STICK_FADE_DISTANCE,
      };

      if (
        nextState.category !== activeRef.current.category ||
        nextState.filters !== activeRef.current.filters
      ) {
        activeRef.current = nextState;
        setActiveState(nextState);
      }
    });

    return () => scrollY.removeListener(subscriptionId);
  }, [categoryY, filterThreshold, scrollY]);

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <Animated.View
        pointerEvents={activeState.category ? 'auto' : 'none'}
        style={[styles.categoryDock, categoryStyle]}
        onLayout={(event) => {
          const nextHeight = event.nativeEvent.layout.height;
          if (nextHeight > 0 && Math.abs(nextHeight - categoryDockHeight) > 1) {
            setCategoryDockHeight(nextHeight);
          }
        }}
      >
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => <CategoryPill item={item} compact />}
        />
      </Animated.View>
      <Animated.View
        pointerEvents={activeState.filters ? 'auto' : 'none'}
        style={[styles.filterDock, { top: categoryDockHeight }, filtersStyle]}
      >
        <FilterBar filters={filters} compact />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  categoryDock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  categoryList: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
