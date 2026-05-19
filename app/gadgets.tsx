import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function GadgetsScreen() {
  const router = useRouter();
  const [budget, setBudget] = useState(50000);

  const gadgets = [
    { name: 'iPhone 15 Pro Max', cost: 70000, category: 'Premium phone' },
    { name: 'Samsung Galaxy S24 Ultra', cost: 68000, category: 'Premium phone' },
    { name: 'iPad Air M2', cost: 38000, category: 'Tablet' },
    { name: 'Xiaomi Redmi Note 13', cost: 12000, category: 'Budget phone' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F172A' }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 20 }}><Text style={{ color: '#10B981', fontWeight: '600' }}>← Dashboard</Text></Pressable>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 20 }}>Smart Gadget Matcher</Text>
      
      <View style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 20 }}>
        <Text style={{ color: '#94A3B8', fontSize: 12, textTransform: 'uppercase' }}>Target Budget Limit</Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#10B981', marginVertical: 8 }}>₱{budget.toLocaleString()}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[20000, 50000, 80000].map(b => (
            <Pressable key={b} onPress={() => setBudget(b)} style={{ backgroundColor: budget === b ? '#10B981' : '#111827', padding: 10, borderRadius: 8 }}><Text style={{ color: '#FFF' }}>₱{b.toLocaleString()}</Text></Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        {gadgets.map((g, i) => (
          <View key={i} style={{ backgroundColor: '#1E293B', padding: 16, borderRadius: 12, opacity: g.cost <= budget ? 1 : 0.4, borderWidth: 1, borderColor: g.cost <= budget ? '#10B981' : '#334155' }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>{g.name}</Text>
            <Text style={{ color: '#94A3B8', fontSize: 12 }}>{g.category}</Text>
            <Text style={{ color: g.cost <= budget ? '#10B981' : '#EF4444', fontWeight: '800', marginTop: 8 }}>₱{g.cost.toLocaleString()} {g.cost <= budget ? '(Within Budget)' : '(Over Budget)'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
