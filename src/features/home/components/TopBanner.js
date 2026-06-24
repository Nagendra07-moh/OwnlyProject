import { Image, StyleSheet, View } from 'react-native';

export function TopBanner({ banner }) {
  if (!banner?.imageUrl) {
    return <View style={styles.fallback} />;
  }

  return (
    <Image
      source={{ uri: banner.imageUrl }}
      resizeMode="cover"
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 176,
  },
  fallback: {
    height: 176,
  },
});
