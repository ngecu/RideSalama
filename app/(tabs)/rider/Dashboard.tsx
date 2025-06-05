import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const recentLocations = [
  { id: '1', title: 'Kenyatta Avenue', subtitle: 'Nairobi, Kenya' },
  { id: '2', title: 'Moi Avenue', subtitle: 'Mombasa, Kenya' },
  { id: '3', title: 'The Hub Karen', subtitle: 'Dagoretti South, Nairobi' },
  { id: '4', title: 'Westgate Mall', subtitle: 'Westlands, Nairobi' },
  { id: '5', title: 'Jomo Kenyatta International Airport', subtitle: 'Embakasi, Nairobi' },
];

const transactions = [
  { id: '1', type: 'deposit', amount: 1000, date: '2025-06-01', time: '10:00 AM' },
  { id: '2', type: 'withdraw', amount: 500, date: '2025-06-02', time: '2:30 PM' },
  { id: '3', type: 'deposit', amount: 2000, date: '2025-06-04', time: '4:45 PM' },
];

export default function Dashboard() {
  const [rideMode, setRideMode] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Loading...');
  const [walletBalance, setWalletBalance] = useState(3500);
  const [loanLimit, setLoanLimit] = useState(10000);

  // Contribute form state
  const [contribAmount, setContribAmount] = useState('');
  const [contribPhone, setContribPhone] = useState('');
  const [contribMethod, setContribMethod] = useState<'Safaricom' | 'Airtel' | ''>('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location to use ride feature');
        setCurrentLocation('Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(location.coords);
      if (geocode.length > 0) {
        const place = geocode[0];
        const locationString = `${place.name || place.street}, ${place.city || place.region}`;
        setCurrentLocation(locationString);
      } else {
        setCurrentLocation('Unknown Location');
      }
    })();
  }, [rideMode]);

  const validateKenyanPhone = (phone: string) => {
    // Accept formats: 07XXXXXXXX or +2547XXXXXXXX or 2547XXXXXXXX
    const regex = /^(?:\+254|0|254)(7\d{8})$/;
    return regex.test(phone);
  };

  const handleSubmitContribution = () => {
    if (!contribAmount || isNaN(Number(contribAmount)) || Number(contribAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive amount');
      return;
    }
    if (!contribPhone || !validateKenyanPhone(contribPhone)) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid Kenyan phone number (e.g. 07XXXXXXXX or +2547XXXXXXXX)'
      );
      return;
    }
    if (!contribMethod) {
      Alert.alert('No Method Selected', 'Please choose a payment method');
      return;
    }

    Alert.alert(
      'Contribution Submitted',
      `Amount: Ksh ${contribAmount}\nPhone: ${contribPhone}\nMethod: ${contribMethod}`
    );
    setWalletBalance((prev) => prev + Number(contribAmount));
    setContribAmount('');
    setContribPhone('');
    setContribMethod('');
    setShowContributeModal(false);
  };

  const renderLocation = ({ id, title, subtitle }) => (
    <View key={id} style={styles.locationItem}>
      <View>
        <Text style={styles.locationTitle}>{title}</Text>
        <Text style={styles.locationSubtitle}>{subtitle}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#fff" />
    </View>
  );

  const renderTransaction = (tx) => {
    const isDeposit = tx.type === 'deposit';
    return (
      <View key={tx.id} style={styles.transactionItem}>
        <Text style={[styles.transactionType, { color: isDeposit ? '#4CAF50' : '#FF5252' }]}>
          {isDeposit ? 'Deposit' : 'Withdraw'}
        </Text>
        <Text style={styles.transactionAmount}>Ksh {tx.amount}</Text>
        <Text style={styles.transactionDate}>{tx.date} at {tx.time}</Text>
      </View>
    );
  };

  if (rideMode) {
    return (
      <SafeAreaView style={styles.rideScreen}>
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
            <Text style={styles.currentLocation}>{currentLocation}</Text>
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

  if (showWallet) {
    return (
      <SafeAreaView style={styles.rideScreen}>
        <View style={styles.rideHeader}>
          <TouchableOpacity onPress={() => setShowWallet(false)}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.rideTitle}>Chama Wallet</Text>
        </View>

        <ScrollView style={{ padding: 16 }}>
          {/* Wallet Summary */}
          <View style={styles.walletSummary}>
            <View style={styles.walletBox}>
              <Text style={styles.walletLabel}>Account Balance</Text>
              <Text style={styles.walletValue}>Ksh {walletBalance}</Text>
            </View>
            <View style={styles.walletBox}>
              <Text style={styles.walletLabel}>Loan Limit</Text>
              <Text style={styles.walletValue}>Ksh {loanLimit}</Text>
            </View>
          </View>

          {/* Contribute Button */}
          <TouchableOpacity
            style={styles.contributeButton}
            onPress={() => setShowContributeModal(true)}
          >
            <Text style={styles.contributeButtonText}>Contribute</Text>
          </TouchableOpacity>

          {/* Transactions */}
          <Text style={styles.transactionHeader}>Transactions</Text>
          {transactions.map(renderTransaction)}
        </ScrollView>

        {/* Contribute Modal */}
        <Modal
          visible={showContributeModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowContributeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Make a Contribution</Text>

              <Text style={styles.modalLabel}>Amount (Ksh)</Text>
              <TextInput
                placeholder="e.g. 1000"
                placeholderTextColor="#888"
                value={contribAmount}
                onChangeText={setContribAmount}
                keyboardType="numeric"
                style={styles.modalInput}
              />

              <Text style={[styles.modalLabel, { marginTop: 12 }]}>Phone Number</Text>
              <TextInput
                placeholder="e.g. 0712345678"
                placeholderTextColor="#888"
                value={contribPhone}
                onChangeText={setContribPhone}
                keyboardType="phone-pad"
                style={styles.modalInput}
                maxLength={12}
              />

              <Text style={[styles.modalLabel, { marginTop: 12 }]}>Payment Method</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    contribMethod === 'Safaricom'
                      ? { backgroundColor: '#007E32' }
                      : { backgroundColor: '#2e2e2e' },
                  ]}
                  onPress={() => setContribMethod('Safaricom')}
                >
                  <Text
                    style={[
                      styles.methodText,
                      contribMethod === 'Safaricom' && styles.methodTextSelected,
                    ]}
                  >
                    Safaricom
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    contribMethod === 'Airtel'
                      ? { backgroundColor: '#E60000' }
                      : { backgroundColor: '#2e2e2e' },
                  ]}
                  onPress={() => setContribMethod('Airtel')}
                >
                  <Text
                    style={[
                      styles.methodText,
                      contribMethod === 'Airtel' && styles.methodTextSelected,
                    ]}
                  >
                    Airtel
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowContributeModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSubmitContribution}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi there 👋</Text>
            <Text style={styles.name}>Ken</Text>
          </View>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
        </View>

        <View style={styles.quickAccess}>
          <TouchableOpacity style={styles.quickButton} onPress={() => setRideMode(true)}>
            <MaterialIcons name="directions-car" size={28} color="#000" />
            <Text style={styles.quickLabel}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => setShowWallet(true)}>
            <MaterialIcons name="account-balance-wallet" size={28} color="#000" />
            <Text style={styles.quickLabel}>Chama Wallet</Text>
          </TouchableOpacity>
          <QuickButton icon="schedule" label="Trips" />
        </View>

        <View style={styles.categories}>
          <CategoryCard icon="help-outline" label="Help" promo />
          <CategoryCard icon="local-shipping" label="Delivery" />
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Where to?</Text>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={20} color="#888" />
            <TextInput placeholder="Search destination" placeholderTextColor="#888" style={styles.input} />
            <TouchableOpacity style={styles.nowButton}>
              <Text style={styles.nowButtonText}>Now</Text>
              <MaterialIcons name="expand-more" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {recentLocations.map(renderLocation)}
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.quickButton}>
      <MaterialIcons name={icon} size={28} color="#000" />
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function CategoryCard({ icon, label, promo = false }) {
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

  walletSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  walletBox: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
  },
  walletLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  walletValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  contributeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  contributeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  transactionHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionAmount: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: '#2e2e2e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  methodText: {
    color: '#fff',
    fontSize: 14,
  },
  methodTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
