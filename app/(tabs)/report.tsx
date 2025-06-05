import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ReportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🚨 Report</Text>
        <Text style={styles.subtitle}>Report an issue or give feedback.</Text>
        <Text style={styles.paragraph}>
          Found something off? Help us improve by submitting reports or ideas. We’re always listening. 🙌
        </Text>
        <Text style={styles.paragraph}>
          From delivery delays to feature suggestions, your feedback fuels our growth and helps us serve you better.
        </Text>
        <Text style={styles.paragraph}>
          Tap the ✉️ icon above or contact us via the support tab for urgent matters.
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
    backgroundColor: '#fefefe',
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
    color: '#e63946',
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
