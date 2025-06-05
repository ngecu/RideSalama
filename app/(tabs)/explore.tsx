import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>
        Discover new features, exciting places, and connect with people around you.
      </Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://source.unsplash.com/random/800x600?city' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Urban Hotspots</Text>
        <Text style={styles.cardText}>
          Check out trending locations and ride-friendly routes in your area.
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://source.unsplash.com/random/800x600?event' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Local Events</Text>
        <Text style={styles.cardText}>
          Stay updated on what's happening nearby and get there in style.
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://source.unsplash.com/random/800x600?community' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Meet the Community</Text>
        <Text style={styles.cardText}>
          Connect with fellow riders and build your network.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
