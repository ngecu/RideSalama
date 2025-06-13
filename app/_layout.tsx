import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Image
} from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';


const StepIndicator = ({ current, total = 4 }) => (
  <View style={styles.stepContainer}>
    {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
      <View key={step} style={styles.stepWrapper}>
        <View style={[styles.stepCircle, current === step && styles.stepCircleActive]}>
          <Text style={[styles.stepText, current === step && styles.stepTextActive]}>{step}</Text>
        </View>
        {step < total && <View style={styles.stepLine} />}
      </View>
    ))}
  </View>
);

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxBox}>
    {value && <Text style={styles.checkboxCheck}>✓</Text>}
  </TouchableOpacity>
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  
// Inside your component
const [passportPhoto, setPassportPhoto] = useState(null);
const [logbookDoc, setLogbookDoc] = useState(null);
const [chama, setChama] = useState('');
const [memberId, setMemberId] = useState('');
const chamaOptions = ['Select Chama/SACCO', 'Watu Credit', 'Ziada Riders', 'City Chama'];

const pickPassportPhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setPassportPhoto(result.assets[0].uri);
  }
};

const pickLogbookDoc = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*'],
  });

  if (result.type === 'success') {
    setLogbookDoc(result.uri);
  }
};
  // General
  const [screen, setScreen] = useState<
    | 'landing' | 'signup'
    | 'customerPhone' | 'customerOTP' | 'customerProfile'
    | 'riderPhone' | 'riderOTP' | 'riderDetails' | 'riderDocs' | 'riderComplete'
    | 'main'
  >('landing');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Rider-specific
  const [nationalId, setNationalId] = useState('');
  const [dob, setDob] = useState('');
  const [plate, setPlate] = useState('');
  const [zone, setZone] = useState('');
  const [insurance, setInsurance] = useState('');
  const [username, setUsername] = useState('');

  if (!loaded) return null;

  const renderCard = (title: string, subtitle: string, children: React.ReactNode, step?: number) => (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.centered}>
        <View style={styles.card}>
          <Image source={require('../assets/images/Logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle !== '' && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
          {step && <StepIndicator current={step} total={step > 2 ? 4 : 3} />}
          {children}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );

  // --- Landing ---
  if (screen === 'landing') {
    return renderCard(
      'Welcome to Salama Ride',
      'Let’s get you started.',
      <>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('main')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => setScreen('signup')}>
          <Text style={styles.buttonTextOutline}>Sign Up</Text>
        </TouchableOpacity>
      </>
    );
  }

  // --- Choose role ---
  if (screen === 'signup') {
    return renderCard(
      'Sign Up As',
      '',
      <>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('customerPhone')}>
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => setScreen('riderPhone')}>
          <Text style={styles.buttonTextOutline}>Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backText} onPress={() => setScreen('landing')}>
          <Text style={styles.backTextInner}>Back</Text>
        </TouchableOpacity>
      </>
    );
  }

  // --- Customer Flow ---
  if (screen === 'customerPhone') {
    return renderCard(
      'Enter your phone number',
      'We’ll send you a code.',
      <>
        <TextInput placeholder="+254712345678" placeholderTextColor="#999" style={styles.input}
          keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('customerOTP')}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </>, 1
    );
  }

  if (screen === 'customerOTP') {
    return renderCard(
      'Enter OTP Code',
      `We sent code to ${phone}`,
      <>
        <TextInput placeholder="4‑digit code" placeholderTextColor="#999" style={styles.input}
          keyboardType="number-pad" value={otp} onChangeText={setOtp} />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('customerProfile')}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </>, 2
    );
  }

  if (screen === 'customerProfile') {
    return renderCard(
      'Create Profile',
      'Fill your details.',
      <>
        <TextInput placeholder="Full Name" placeholderTextColor="#999" style={styles.input}
          value={fullName} onChangeText={setFullName} />
        <TextInput placeholder="Email (optional)" placeholderTextColor="#999" style={styles.input}
          value={email} onChangeText={setEmail} />
        <View style={styles.checkboxRow}>
          <CustomCheckbox value={agreed} onValueChange={setAgreed} />
          <Text style={styles.checkboxText}>Agree to Terms</Text>
        </View>
        <TouchableOpacity style={[styles.button, { opacity: agreed ? 1 : 0.5 }]}
          disabled={!agreed} onPress={() => setScreen('main')}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </>, 3
    );
  }

  // --- Rider Flow ---
  if (screen === 'riderPhone') {
    return renderCard(
      'Enter Rider Phone',
      'We’ll send you a code.',
      <>
        <TextInput placeholder="+254712345678" placeholderTextColor="#999" style={styles.input}
          keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('riderOTP')}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </>, 1
    );
  }

  if (screen === 'riderOTP') {
    return renderCard(
      'Enter OTP Code',
      `We sent code to ${phone}`,
      <>
        <TextInput placeholder="4‑digit code" placeholderTextColor="#999" style={styles.input}
          keyboardType="number-pad" value={otp} onChangeText={setOtp} />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('riderDetails')}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </>, 2
    );
  }

  if (screen === 'riderDetails') {
    return renderCard(
      'Personal & Bike Details',
      'Please fill required info.',
      <>
        <TextInput placeholder="Full Name" placeholderTextColor="#999" style={styles.input}
          value={fullName} onChangeText={setFullName} />
        <TextInput placeholder="National ID Number" placeholderTextColor="#999" style={styles.input}
          value={nationalId} onChangeText={setNationalId} />
        <TextInput placeholder="Date of Birth" placeholderTextColor="#999" style={styles.input}
          value={dob} onChangeText={setDob} />
        <TextInput placeholder="Plate Number" placeholderTextColor="#999" style={styles.input}
          value={plate} onChangeText={setPlate} />
        <TextInput placeholder="Operating Zone" placeholderTextColor="#999" style={styles.input}
          value={zone} onChangeText={setZone} />
        <TextInput placeholder="Insurance + Expiry" placeholderTextColor="#999" style={styles.input}
          value={insurance} onChangeText={setInsurance} />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('riderDocs')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </>, 3
    );
  }

// Inside your screen logic
if (screen === 'riderDocs') {
  return renderCard(
    'Upload & Chama Info',
    '',
    <>
      <TouchableOpacity onPress={pickPassportPhoto} style={styles.input}>
        <Text style={{ color: '#999' }}>{passportPhoto ? 'Photo Selected ✅' : 'Take Passport Photo'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickLogbookDoc} style={styles.input}>
        <Text style={{ color: '#999' }}>{logbookDoc ? 'Document Uploaded ✅' : 'Upload Logbook Doc (optional)'}</Text>
      </TouchableOpacity>

      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={chama}
          onValueChange={(itemValue) => setChama(itemValue)}
          style={{ height: 50 }}
        >
          {chamaOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Member ID or Join Request"
        placeholderTextColor="#999"
        style={styles.input}
        value={memberId}
        onChangeText={setMemberId}
      />

      <TouchableOpacity style={styles.button} onPress={() => setScreen('riderComplete')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </>, 4
  );
}
  if (screen === 'riderComplete') {
    return renderCard(
      'Finish Rider Profile',
      'Add username & agree to policy.',
      <>
        <TextInput placeholder="Username / Stage Name" placeholderTextColor="#999" style={styles.input}
          value={username} onChangeText={setUsername} />
        <View style={styles.checkboxRow}>
          <CustomCheckbox value={agreed} onValueChange={setAgreed} />
          <Text style={styles.checkboxText}>Agree to Terms & Privacy</Text>
        </View>
        <TouchableOpacity style={[styles.button, { opacity: agreed ? 1 : 0.5 }]}
          disabled={!agreed} onPress={() => setScreen('main')}>
          <Text style={styles.buttonText}>Submit & Go to Dashboard</Text>
        </TouchableOpacity>
      </>, 4
    );
  }

  // --- Main App Entry ---
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#1c1c1e' },
  centered: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: {
    backgroundColor: '#2c2c2e',
    padding: 28,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 10
  },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 24, fontWeight: 'bold', color: '#f2f2f2', marginBottom: 8, textAlign: 'center' },
  cardSubtitle: { fontSize: 14, color: '#b0b0b0', marginBottom: 16, textAlign: 'center' },
  stepContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 12 },
  stepWrapper: { flexDirection: 'row', alignItems: 'center' },
  stepCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#444', justifyContent: 'center', alignItems: 'center' },
  stepCircleActive: { borderColor: '#fca96b', backgroundColor: '#fca96b' },
  stepText: { color: '#b0b0b0', fontWeight: 'bold' },
  stepTextActive: { color: '#1c1c1e' },
  stepLine: { width: 24, height: 2, backgroundColor: '#444', marginHorizontal: 4 },
  input: {
    backgroundColor: '#3a3a3c',
    color: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#5a5a5c',
    borderRadius: 10,
    width: '100%',
    padding: 14,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#fca96b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: { color: '#1c1c1e', fontWeight: 'bold', fontSize: 16 },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#fca96b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonTextOutline: { color: '#fca96b', fontWeight: 'bold', fontSize: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxBox: { width: 24, height: 24, borderWidth: 2, borderColor: '#4f46e5', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkboxCheck: { color: '#fff', fontWeight: 'bold' },
  checkboxText: { marginLeft: 10, fontSize: 14, color: '#f2f2f2' },
  backText: { marginTop: 20 },
  backTextInner: { color: '#999' }
});
