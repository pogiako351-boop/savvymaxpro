import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';

const UI_COLORS = {
  bg: '#0F172A',         
  surface: '#1E293B',    
  innerBg: '#111827',     
  textPrimary: '#F8FAFC', 
  textSecondary: '#94A3B8', 
  emerald: '#10B981',    
  border: '#334155',     
};

const BANK_DATA = [
  { id: 'seabank', name: 'SeaBank', rate: 0.06, color: '#FF6600', compounding: 'Daily', url: 'https://www.seabank.ph' },
  { id: 'tonik', name: 'Tonik Bank', rate: 0.06, color: '#FF007A', compounding: 'Daily', url: 'https://tonikbank.com' },
  { id: 'cimb', name: 'CIMB Bank', rate: 0.05, color: '#DC241F', compounding: 'Daily', url: 'https://www.cimbbank.com.ph' },
  { id: 'gotyme', name: 'GoTyme Bank', rate: 0.04, color: '#00B050', compounding: 'Monthly', url: 'https://www.gotyme.com.ph' },
  { id: 'maya', name: 'Maya Bank', rate: 0.035, color: '#00E676', compounding: 'Daily', url: 'https://www.mayabank.ph' }
];

export default function BanksScreen() {
  const [selectedAmount, setSelectedAmount] = useState(1000000);
  const [activeBankId, setActiveBankId] = useState<string | null>(null);
  const router = useRouter();

  const getCalculatedEarnings = (principal: number, annualRate: number, months: number) => {
    const grossInterest = principal * annualRate * (months / 12);
    return grossInterest - (grossInterest * 0.20); 
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: UI_COLORS.bg }} contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
      {/* Back Button Link Layout */}
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 20, paddingVertical: 8 }}>
        <Text style={{ color: UI_COLORS.emerald, fontSize: 14, fontWeight: '600' }}>← Back to Dashboard</Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: '700', color: UI_COLORS.textPrimary, marginBottom: 20 }}>PH High-Yield Savings</Text>

      {/* Amount Preset Selectors Layout */}
      <View style={{ backgroundColor: UI_COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 12, color: UI_COLORS.textSecondary, textTransform: 'uppercase', marginBottom: 4 }}>Principal Capital</Text>
        <Text style={{ fontSize: 32, fontWeight: '800', color: UI_COLORS.emerald, marginBottom: 12 }}>
          ₱{selectedAmount.toLocaleString()}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {[50000, 100000, 500000, 1000000].map((amt) => (
            <Pressable key={amt} onPress={() => setSelectedAmount(amt)} style={{ padding: 10, borderRadius: 8, backgroundColor: selectedAmount === amt ? UI_COLORS.emerald : UI_COLORS.innerBg }}>
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>₱{amt.toLocaleString()}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Banks Output Dynamic View Cards */}
      <View style={{ gap: 12 }}>
        {BANK_DATA.map((bank) => {
          const isExpanded = activeBankId === bank.id;
          const earn1yr = getCalculatedEarnings(selectedAmount, bank.rate, 12);

          return (
            <Pressable key={bank.id} onPress={() => setActiveBankId(isExpanded ? null : bank.id)} style={{ backgroundColor: UI_COLORS.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: isExpanded ? bank.color : UI_COLORS.border }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: UI_COLORS.textPrimary }}>{bank.name}</Text>
              <Text style={{ fontSize: 22, fontWeight: '800', color: bank.color, marginVertical: 6 }}>{(bank.rate * 100).toFixed(2)}% p.a.</Text>
              <Text style={{ fontSize: 13, color: UI_COLORS.emerald, fontWeight: '600' }}>1-Yr Net Profit (Post-Tax): ₱{Math.round(earn1yr).toLocaleString()}</Text>

              {isExpanded && (
                <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: UI_COLORS.border }}>
                  <Text style={{ color: UI_COLORS.textSecondary, fontSize: 12, marginBottom: 8 }}>Compounding calculation: {bank.compounding}</Text>
                  <Pressable onPress={() => Linking.openURL(bank.url).catch(() => {})} style={{ backgroundColor: bank.color, padding: 10, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 12 }}>Go to Website</Text>
                  </Pressable>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
