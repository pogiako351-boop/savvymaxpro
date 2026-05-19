import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function AutoScreen() {
  const router = useRouter();
  const [loanAmount] = useState(1200000);
  const cars = [
    { name: 'Toyota Vios 1.3 XLE', price: 900000, downpayment: 180000, monthly36: 23500 },
    { name: 'Mitsubishi Xpander GLS', price: 1200000, downpayment: 240000, monthly36: 31000 },
    { name: 'Honda City 1.5 V', price: 1000000, downpayment: 200000, monthly36: 26000 }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F172A' }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 20 }}><Text style={{ color: '#7C3AED', fontWeight: '600' }}>← Dashboard</Text></Pressable>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 20 }}>Auto Loans Calculator</Text>

      <View style={{ gap: 12 }}>
        {cars.map((c, i) => (
          <View key={i} style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#334155' }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>{c.name}</Text>
            <Text style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>SRP Retail Price: ₱{c.price.toLocaleString()}</Text>
            <View style={{ backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 10, gap: 4 }}>
              <Text style={{ color: '#FFF', fontSize: 12 }}>Downpayment (20%): ₱{c.downpayment.toLocaleString()}</Text>
              <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '700' }}>36 Mos. Installment: ₱{c.monthly36.toLocaleString()}/mo</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
