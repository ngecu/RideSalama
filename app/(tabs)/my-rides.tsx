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
    date: '2025-06-06 09:15',
    amount: 350,
    status: 'Pending',
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
    date: '2025-05-28 18:20',
    amount: 400,
    status: 'Completed',
  },
];

export default function MyRides() {
  const [tab, setTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [rides, setRides] = useState(initialRides);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const filteredRides = rides.filter((r) =>
    tab === 'Upcoming' ? r.status === 'Pending' : r.status !== 'Pending'
  );

  const renderStatusBadge = (status: Ride['status']) => {
    let bgColor = '#FFB066';
    if (status === 'Completed') bgColor = '#4caf50';
    else if (status === 'Cancelled') bgColor = '#f44336';

    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderRide = ({ item }: { item: Ride }) => (
    <TouchableOpacity style={styles.rideCard} activeOpacity={0.8}>
      <View style={styles.rideLeft}>
        <Text style={styles.passengerName}>{item.passenger}</Text>
        <Text style={styles.rideRoute}>
          <MaterialIcons name="place" size={16} color="#aaa" />{' '}
          {item.pickup} → {item.dropoff}
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

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'Upcoming' && styles.activeTab]}
          onPress={() => setTab('Upcoming')}
        >
          <Text
            style={[styles.tabText, tab === 'Upcoming' && styles.activeTabText]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'Past' && styles.activeTab]}
          onPress={() => setTab('Past')}
        >
          <Text
            style={[styles.tabText, tab === 'Past' && styles.activeTabText]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="directions-bike" size={64} color="#555" />
            <Text style={styles.emptyText}>No {tab.toLowerCase()} rides</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: '#FFB066',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '700',
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rideLeft: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  rideRoute: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
    flexShrink: 1,
  },
  rideDate: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
  rideRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  statusBadge: {
    marginTop: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  statusText: {
    color: '#000',
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
    color: '#888',
  },
});
