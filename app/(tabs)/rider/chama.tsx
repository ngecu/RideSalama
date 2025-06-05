import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const transactionData = [
  { id: '1', description: 'Weekly Contribution', amount: 200, type: 'credit' },
  { id: '2', description: 'Loan Repayment', amount: -150, type: 'debit' },
  { id: '3', description: 'Bonus Payout', amount: 100, type: 'credit' },
];

export default function ChamaScreen() {
  const [transactions] = useState(transactionData);
  const walletBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chama Wallet</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>Ksh {walletBalance.toFixed(2)}</Text>
      </View>

      <Text style={styles.subHeading}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <MaterialIcons
              name={item.type === 'credit' ? 'arrow-downward' : 'arrow-upward'}
              size={20}
              color={item.type === 'credit' ? 'green' : 'red'}
              style={{ marginRight: 8 }}
            />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === 'credit' ? 'green' : 'red' },
                ]}>
                {item.type === 'credit' ? '+' : '-'}Ksh {Math.abs(item.amount)}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet.</Text>}
      />

      <TouchableOpacity style={styles.contributeButton}>
        <Text style={styles.contributeText}>Make a Contribution</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  balanceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  contributeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  contributeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});
