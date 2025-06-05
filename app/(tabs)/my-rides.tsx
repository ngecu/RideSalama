import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Ride = {
  id: string;
  passenger: string;
  pickup: string;
  dropoff: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Cancelled' | 'Pending';
};

const initialRides: Ride[] = [
  {
    id: '1',
    passenger: 'Alice W.',
    pickup: 'Nairobi CBD',
    dropoff: 'Westlands',
    date: '2025-06-04 09:15',
    amount: 350,
    status: 'Completed',
  },
  {
    id: '2',
    passenger: 'Bob K.',
    pickup: 'Kilimani',
    dropoff: 'Karen',
    date: '2025-06-03 15:30',
    amount: 450,
    status: 'Cancelled',
  },
  {
    id: '3',
    passenger: 'Cindy L.',
    pickup: 'Ngong Rd',
    dropoff: 'Langata',
    date: '2025-06-02 18:20',
    amount: 400,
    status: 'Pending',
  },
];

export default function MyRides() {
  const [rides, setRides] = useState(initialRides);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate fetching updated rides from server (replace with your API call)
    setTimeout(() => {
      // Here you would update rides with new data from server
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderStatusBadge = (status: Ride['status']) => {
    let bgColor = '#2196f3'; // default: blue (pending)
    if (status === 'Completed') bgColor = '#4caf50'; // green
    else if (status === 'Cancelled') bgColor = '#f44336'; // red

    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderRide = ({ item }: { item: Ride }) => (
    <TouchableOpacity style={styles.rideCard} activeOpacity={0.7}>
      <View style={styles.rideLeft}>
        <Text style={styles.passengerName}>{item.passenger}</Text>
        <Text style={styles.rideRoute}>
          <MaterialIcons name="place" size={16} color="#555" /> {item.pickup} → {item.dropoff}
        </Text>
        <Text style={styles.rideDate}>{item.date}</Text>
      </View>

      <View style={styles.rideRight}>
        <Text style={styles.amount}>Ksh {item.amount}</Text>
        {renderStatusBadge(item.status)}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Rides</Text>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="directions-bike" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No rides found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  rideLeft: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  rideRoute: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    flexShrink: 1,
  },
  rideDate: {
    fontSize: 13,
    color: '#999',
    marginTop: 6,
  },
  rideRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    marginTop: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 18,
    color: '#999',
  },
});
