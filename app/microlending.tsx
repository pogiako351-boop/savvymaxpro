import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function MicroLendingScreen() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(10000);

  const lendingOptions = [
    { provider: 'SSS Salary Loan', interestRate: '10% p.a.', terms: '24 Months', monthly: 458 },
    { provider: 'Pag-IBIG Multi-Purpose', interestRate: '5.95% p.a.', terms: '36 Months', monthly: 304 },
    { provider: 'Traditional Micro-Financing', interestRate: '3% monthly', terms: '6 Months', monthly: 1966 }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F172A' }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 20 }}><Text style={{ color: '#EAB308', fontWeight: '600' }}>← Dashboard</Text></Pressable>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 20 }}>Micro-Lending & Personal Credit</Text>

      <View style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 20 }}>
        <Text style={{ color: '#94A3B8', fontSize: 12 }}>Micro-Loan Principal Capital</Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#EAB308', marginVertical: 8 }}>₱{loanAmount.toLocaleString()}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[5000, 10000, 20000].map(amt => (
            <Pressable key={amt} onPress={() => setLoanAmount(amt)} style={{ backgroundColor: loanAmount === amt ? '#EAB308' : '#111827', padding: 10, borderRadius: 8 }}><Text style={{ color: '#FFF' }}>₱{amt.toLocaleString()}</Text></Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        {lendingOptions.map((l, i) => (
          <View key={i} style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#334155' }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>{l.provider}</Text>
            <Text style={{ color: '#94A3B8', fontSize: 13, marginTop: 2 }}>Stated Rate: {l.interestRate} over {l.terms}</Text>
            <View style={{ backgroundColor: '#111827', padding: 10, borderRadius: 8, marginTop: 10 }}>
              <Text style={{ color: '#EAB308', fontSize: 14, fontWeight: '700' }}>Estimated Payment: ₱{Math.round(l.monthly * (loanAmount / 10000)).toLocaleString()}/mo</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
