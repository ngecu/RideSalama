import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const recentLocations = [
  { id: '1', title: 'Zaporiz’ke Hwy, 40', subtitle: 'Dnipro, Dnipropetrovs’ka oblast' },
  { id: '2', title: 'Mechnykova St, 19', subtitle: 'Dnipro, Dnipropetrovs’ka oblast' },
];

export default function Dashboard() {
  const [rideMode, setRideMode] = useState(false);
  const [destination, setDestination] = useState('');

  const renderLocation = ({ id, title, subtitle }: typeof recentLocations[0]) => (
    <View key={id} style={styles.locationItem}>
      <View>
        <Text style={styles.locationTitle}>{title}</Text>
        <Text style={styles.locationSubtitle}>{subtitle}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#fff" />
    </View>
  );

  if (rideMode) {
    return (
      <SafeAreaView style={styles.rideScreen}>
        {/* Top bar with close button */}
        <View style={styles.rideHeader}>
          <TouchableOpacity onPress={() => setRideMode(false)}>
            <MaterialIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.rideTitle}>Request a Ride</Text>
        </View>

        <View style={styles.rideBox}>
          <Text style={styles.rideLabel}>Your location</Text>
          <View style={styles.rideField}>
            <MaterialIcons name="my-location" size={20} color="#888" />
            <Text style={styles.currentLocation}>Current Location</Text>
          </View>

          <Text style={[styles.rideLabel, { marginTop: 16 }]}>Enter destination</Text>
          <View style={styles.searchBox}>
            <MaterialIcons name="location-on" size={20} color="#888" />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor="#888"
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi there 👋</Text>
            <Text style={styles.name}>Stanislav Kashchishen</Text>
          </View>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccess}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setRideMode(true)}
          >
            <MaterialIcons name="directions-car" size={28} color="#000" />
            <Text style={styles.quickLabel}>Ride</Text>
          </TouchableOpacity>
          <QuickButton icon="account-balance-wallet" label="Wallet" />
          <QuickButton icon="schedule" label="Trips" />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <CategoryCard icon="help-outline" label="Help" promo />
          <CategoryCard icon="local-shipping" label="Delivery" />
        </View>

        {/* Where To */}
        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Where to?</Text>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TouchableOpacity style={styles.nowButton}>
              <Text style={styles.nowButtonText}>Now</Text>
              <MaterialIcons name="expand-more" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Locations */}
        {recentLocations.map(renderLocation)}
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickButton({ icon, label }: { icon: string; label: string }) {
  return (
    <TouchableOpacity style={styles.quickButton}>
      <MaterialIcons name={icon} size={28} color="#000" />
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function CategoryCard({
  icon,
  label,
  promo = false,
}: {
  icon: string;
  label: string;
  promo?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <MaterialIcons name={icon} size={36} color="#fff" />
      <Text style={styles.categoryLabel}>{label}</Text>
      {promo && <Text style={styles.promoBadge}>Promo</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 20, color: '#fff' },
  name: { fontSize: 16, color: '#ccc' },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickButton: {
    backgroundColor: '#FFB066',
    paddingVertical: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
  },
  quickLabel: { fontWeight: 'bold', marginTop: 6 },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#1e1e1e',
    width: '47%',
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  categoryLabel: { color: '#fff', marginTop: 8 },
  promoBadge: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: '#FFB066',
    color: '#000',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: 'bold',
  },

  searchSection: { marginBottom: 20 },
  searchLabel: { color: '#fff', fontSize: 16, marginBottom: 8 },
  searchBox: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
  },
  nowButton: {
    backgroundColor: '#FFB066',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  nowButtonText: { color: '#000', fontWeight: 'bold', marginRight: 4 },

  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  locationTitle: { color: '#fff', fontSize: 16 },
  locationSubtitle: { color: '#888', fontSize: 12, marginTop: 2 },

  rideScreen: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  rideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rideTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  rideBox: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
  },
  rideLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  rideField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  currentLocation: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
