import fixture from '../../../../docs/homepage-assignment-candidate-fixtures.json';

const restaurantConfig = fixture.feed_config?.data?.restaurant ?? {};
const categoryGroup = restaurantConfig.curatedListGroups?.[0];
const mealForOneConfig = fixture.feed_config?.data?.mealForOne?.curatedListDetailsList?.[0];
const categoryById = new Map(
  (fixture.curated_list_details?.data ?? []).map((item) => [item.id, item])
);

const normalizeRestaurant = (item) => ({
  id: item.entityId,
  name: item.name,
  imageUrl: item.imageUrl,
  brandLogo: item.brandLogo,
  eta: `${item.etaInMinutes} mins`,
  distance: formatDistance(item.distanceInKM),
  rating: formatRating(item.platformRating),
  ratingCount: item.platformRating?.count ?? item.numberOfRatings ?? 0,
  tag: item.displayTags?.[0] ?? item.trustMarkers?.[0]?.name ?? '',
  price: item.price,
  area: item.address?.area ?? '',
  knownFor: item.knownFor ?? [],
});

const formatRating = (rating) =>
  typeof rating?.value === 'number' ? rating.value.toFixed(1) : '4.4';

const formatDistance = (distance) =>
  typeof distance === 'number' ? `${distance.toFixed(distance >= 10 ? 0 : 1)} km` : '';

export const homepageData = {
  serviceability: fixture.serviceability?.data,
  topBanner: restaurantConfig.topBanner?.banners?.[0] ?? null,
  reorder: {
    title: restaurantConfig.reOrderConfig?.name || 'Order Again!',
    restaurants: (fixture.past_orders?.data?.EntityResults ?? []).map(normalizeRestaurant),
  },
  categories: {
    title: categoryGroup?.name ?? "What's on your mind?",
    items: (categoryGroup?.curatedListIds ?? [])
      .map((id) => categoryById.get(id))
      .filter(Boolean)
      .map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
      })),
  },
  mealDeals: {
    title: mealForOneConfig?.name ?? 'Top Deals',
    badgeImageUrl: mealForOneConfig?.imageUrl,
    items: (fixture.curated_feed_Food_item?.data?.FoodItems ?? []).map((item) => ({
      id: item.foodItemId,
      name: item.name,
      restaurantName: item.resName,
      imageUrl: item.imageUrl,
      price: item.displayPrice ?? item.price,
      originalPrice: item.displayMarkupPrice ?? item.markUpDisplayPrice,
      eta: `${item.etaInMinutes} mins`,
      rating: formatRating(item.ResRatingResponse),
      vegOrNonVeg: item.vegOrNonVeg,
    })),
  },
  restaurantCurations: (restaurantConfig.curatedListDetailsList ?? [])
    .slice()
    .sort((first, second) => first.rank - second.rank)
    .map((section) => ({
      id: section.id,
      title: section.name,
      restaurants: (fixture.curated_feed_res_item?.data?.EntityResults ?? []).map(
        normalizeRestaurant
      ),
    })),
  allRestaurants: {
    title: 'All restaurants',
    filters: ['Sort by', '● 4+', 'Under 30 mins', 'Under ₹200'],
    restaurants: (fixture.paginated_restaurant_feed?.data?.EntityResults ?? []).map(
      normalizeRestaurant
    ),
  },
};
