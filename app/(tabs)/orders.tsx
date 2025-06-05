import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function OrdersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <Text style={styles.subtitle}>Track and manage your recent activity and deliveries.</Text>

      {/* Sample Orders */}
      <View style={styles.orderCard}>
        <Image
          source={{ uri: 'https://source.unsplash.com/600x400/?package,delivery' }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.orderTitle}>Order #12345</Text>
          <Text style={styles.orderStatus}>Status: Delivered</Text>
          <Text style={styles.orderTime}>Delivered on June 2, 2025</Text>
        </View>
      </View>

      <View style={styles.orderCard}>
        <Image
          source={{ uri: 'https://source.unsplash.com/600x400/?parcel,shipping' }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.orderTitle}>Order #12346</Text>
          <Text style={styles.orderStatusPending}>Status: In Transit</Text>
          <Text style={styles.orderTime}>Expected by June 6, 2025</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View All Orders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderStatus: {
    color: 'green',
    fontWeight: '600',
    marginBottom: 2,
  },
  orderStatusPending: {
    color: 'orange',
    fontWeight: '600',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 13,
    color: '#555',
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
