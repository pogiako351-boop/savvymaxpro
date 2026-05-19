import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function RealEstateScreen() {
  const router = useRouter();
  const segments = [
    { location: 'Metro Manila Condo', avgPrice: 6500000, equity20: 1300000, pagibigMonthly30yr: 33000 },
    { location: 'Cavite / Laguna House & Lot', avgPrice: 3500000, equity20: 700000, pagibigMonthly30yr: 18000 },
    { location: 'Bulacan Rowhouse', avgPrice: 1800000, equity20: 360000, pagibigMonthly30yr: 9500 }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F172A' }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 20 }}><Text style={{ color: '#EA580C', fontWeight: '600' }}>← Dashboard</Text></Pressable>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 20 }}>Real Estate Affordability Index</Text>

      <View style={{ gap: 12 }}>
        {segments.map((s, i) => (
          <View key={i} style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#334155' }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>{s.location}</Text>
            <Text style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Estimated Valuation: ₱{s.avgPrice.toLocaleString()}</Text>
            <View style={{ backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 10, gap: 4 }}>
              <Text style={{ color: '#94A3B8', fontSize: 12 }}>Required Upfront Capital (20%): ₱{s.equity20.toLocaleString()}</Text>
              <Text style={{ color: '#EA580C', fontSize: 14, fontWeight: '700' }}>Pag-IBIG Amortization (30 Yrs): ₱{s.pagibigMonthly30yr.toLocaleString()}/mo</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
