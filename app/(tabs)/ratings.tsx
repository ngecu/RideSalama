import { View, FlatList, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const ratingsData = [
  { id: '1', reviewer: 'John Doe', rating: 5, comment: 'Excellent ride!' },
  { id: '2', reviewer: 'Jane Smith', rating: 4, comment: 'Smooth experience.' },
  { id: '3', reviewer: 'Alex Kim', rating: 3, comment: 'Could be better.' },
];

export default function RatingsScreen() {
  const [ratings] = useState(ratingsData);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Ratings</Text>
      <FlatList
        data={ratings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <MaterialIcons name="person" size={24} color="#555" />
              <Text style={styles.reviewer}>{item.reviewer}</Text>
            </View>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <MaterialIcons
                  key={i}
                  name="star"
                  size={20}
                  color={i < item.rating ? '#FFD700' : '#ccc'}
                />
              ))}
            </View>
            <Text style={styles.comment}>"{item.comment}"</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No ratings available yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reviewer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  comment: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 6,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});
