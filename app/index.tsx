import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const UI_COLORS = {
  bg: '#0F172A',           
  surface: '#1E293B',      
  innerBg: '#111827',      
  border: '#334155',       
  textPrimary: '#F8FAFC',   
  textSecondary: '#94A3B8', 
  accentGreen: '#10B981',   
  accentBlue: '#0284C7',    
  accentPurple: '#7C3AED',  
  accentOrange: '#EA580C',  
};

const UTILITY_MODULES = [
  {
    id: 'gadgets',
    name: 'Smart Gadgets',
    tagline: 'Budget Matcher',
    route: 'gadgets', 
    color: UI_COLORS.accentGreen,
    icon: '📱',
  },
  {
    id: 'banks',
    name: 'High-Yield Savings',
    tagline: 'Yield Comparator',
    route: 'banks', 
    color: UI_COLORS.accentBlue,
    icon: '💼',
  },
  {
    id: 'auto',
    name: 'Auto Loans',
    tagline: 'True Net Cost',
    route: 'auto',
    color: UI_COLORS.accentPurple,
    icon: '🚗',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    tagline: 'Affordability Index',
    route: 'realestate',
    color: UI_COLORS.accentOrange,
    icon: '🏠',
  },
];

export default function DashboardScreen() {
  const [householdIncome, setHouseholdIncome] = useState(1000000); // Default to 1M on load now
  const router = useRouter();

  // 💰 Expanded preset array up to 1,000,000
  const incomePresets = [45000, 100000, 500000, 1000000];

  const formatCurrency = (val: number) => {
    return '₱' + val.toLocaleString('en-US');
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: UI_COLORS.bg }}
      contentContainerStyle={{ padding: 20, paddingTop: 50 }}
    >
      {/* Top Branding Header Line */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 }}>
            SAVVY<Text style={{ color: UI_COLORS.accentGreen }}>MAX</Text>
          </Text>
          <View style={{ backgroundColor: UI_COLORS.border, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: UI_COLORS.textPrimary }}>PH</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: UI_COLORS.textSecondary, fontWeight: '500' }}>
          Free Financial Utility
        </Text>
      </View>

      {/* Household Income Selector */}
      <View style={{ backgroundColor: UI_COLORS.surface, borderRadius: 20, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: UI_COLORS.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 18 }}>💰</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: UI_COLORS.textSecondary }}>
            Monthly Household Income
          </Text>
        </View>
        
        <Text style={{ fontSize: 36, fontWeight: '800', color: UI_COLORS.accentGreen, marginVertical: 8 }}>
          {formatCurrency(householdIncome)}
        </Text>

        <Text style={{ fontSize: 11, color: UI_COLORS.textSecondary, marginBottom: 14 }}>
          Select profile base target tier:
        </Text>

        {/* Dynamic wrapping grid buttons */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {incomePresets.map((val) => (
            <Pressable
              key={val}
              onPress={() => setHouseholdIncome(val)}
              style={{
                flex: 1,
                minWidth: '45%',
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: householdIncome === val ? UI_COLORS.accentGreen : UI_COLORS.innerBg,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: householdIncome === val ? UI_COLORS.accentGreen : UI_COLORS.border,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: householdIncome === val ? '#FFFFFF' : UI_COLORS.textPrimary }}>
                {formatCurrency(val)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Financial Calculators Navigation Matrix Grid */}
      <Text style={{ fontSize: 14, fontWeight: '700', color: UI_COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>
        Financial Calculators
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
        {UTILITY_MODULES.map((mod) => (
          <Pressable
            key={mod.id}
            onPress={() => router.push(mod.route)} 
            style={{
              width: '47.5%',
              backgroundColor: UI_COLORS.surface,
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: UI_COLORS.border,
              justifyContent: 'space-between',
              minHeight: 150,
            }}
          >
            <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: mod.color + '15', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: mod.color + '30' }}>
              <Text style={{ fontSize: 20 }}>{mod.icon}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: UI_COLORS.textPrimary }}>
                {mod.name}
              </Text>
              <Text style={{ fontSize: 12, color: UI_COLORS.textSecondary, marginTop: 2 }}>
                {mod.tagline}
              </Text>
            </View>

            <View style={{ backgroundColor: mod.color, borderRadius: 8, paddingVertical: 6, alignItems: 'center', marginTop: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>Open Tools</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

              
