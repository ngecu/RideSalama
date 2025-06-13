import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const badgeData = [
  {
    id: '1',
    title: 'First Ride',
    description: 'Completed your first ride.',
    earned: true,
    icon: 'emoji-events',
  },
  {
    id: '2',
    title: 'Five Star Driver',
    description: 'Maintain a 5-star rating for 7 days.',
    earned: false,
    icon: 'star-rate',
  },
  {
    id: '3',
    title: 'Weekly Goal',
    description: 'Completed all weekly ride goals.',
    earned: true,
    icon: 'military-tech',
  },
  {
    id: '4',
    title: 'Consistent Rider',
    description: 'Rode for 30 consecutive days.',
    earned: false,
    icon: 'timer',
  },
];

export default function GamificationScreen() {
  const [badges] = useState(badgeData);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Badges</Text>

      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.badgeCard, !item.earned && styles.lockedBadge]}>
            <MaterialIcons
              name={item.icon}
              size={32}
              color={item.earned ? '#FFD700' : '#aaa'}
              style={{ marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.badgeTitle, !item.earned && styles.lockedText]}>
                {item.title}
              </Text>
              <Text style={[styles.badgeDescription, !item.earned && styles.lockedText]}>
                {item.description}
              </Text>
            </View>
            {!item.earned && (
              <MaterialIcons name="lock" size={20} color="#bbb" />
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No badges yet. Keep riding!</Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreText}>Learn How to Earn More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
  },
  lockedBadge: {
    backgroundColor: '#f0f0f0',
  },
  lockedText: {
    color: '#999',
  },
  learnMoreButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});
