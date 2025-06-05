import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FavoritesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>❤️ Favorites</Text>
        <Text style={styles.subtitle}>Your saved items and preferred selections.</Text>
        <Text style={styles.paragraph}>
          You haven’t saved anything yet. Start browsing and tap the ❤️ icon to keep your favorite items here.
        </Text>
        <Text style={styles.paragraph}>
          Quick tip: Favorites are synced across devices. So, keep discovering and saving what matters most to you!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d62828',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
});
