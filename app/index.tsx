import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

// 🎨 Clean Unified Theme Config
const UI_COLORS = {
  bg: '#0F172A',           // Dark slate background
  surface: '#1E293B',      // Card surfaces
  innerBg: '#111827',      // Contrast deep black-blue
  border: '#334155',       // Borders
  textPrimary: '#F8FAFC',   // High-contrast text
  textSecondary: '#94A3B8', // Muted text
  accentGreen: '#10B981',   // Smart Gadgets
  accentBlue: '#0284C7',    // High-Yield Savings
  accentPurple: '#7C3AED',  // Auto Loans
  accentOrange: '#EA580C',  // Real Estate
};

const UTILITY_MODULES = [
  {
    id: 'gadgets',
    name: 'Smart Gadgets',
    tagline: 'Budget Matcher',
    href: '/gadgets' as const,
    color: UI_COLORS.accentGreen,
    icon: '📱',
  },
  {
    id: 'banks',
    name: 'High-Yield Savings',
    tagline: 'Yield Comparator',
    href: '/banks' as const,
    color: UI_COLORS.accentBlue,
    icon: '💼',
  },
  {
    id: 'auto',
    name: 'Auto Loans',
    tagline: 'True Net Cost',
    href: '/auto' as const,
    color: UI_COLORS.accentPurple,
    icon: '🚗',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    tagline: 'Affordability Index',
    href: '/realestate' as const,
    color: UI_COLORS.accentOrange,
    icon: '🏠',
  },
];

export default function DashboardScreen() {
  const [householdIncome, setHouseholdIncome] = useState(45000);

  // Quick preset steps for clear mobile tapping
  const incomePresets = [15000, 45000, 100000, 250000];

  const formatCurrency = (val: number) => {
    return '₱' + val.toLocaleString('en-US');
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: UI_COLORS.bg }}
      contentContainerStyle={{ padding: 20, paddingTop: 50 }}
    >
      {/* 🌟 Top Branding Header Line */}
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

      {/* 💰 Hardcoded Income Input Selector Control */}
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

        {/* Custom Segmented Grid for Rock-Solid Value Adjustment */}
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

      {/* 🎛️ Navigation Grid Matrix */}
      <Text style={{ fontSize: 14, fontWeight: '700', color: UI_COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>
        Financial Calculators
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
        {UTILITY_MODULES.map((mod) => (
          <Link href={mod.href} key={mod.id} asChild>
            <Pressable
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
              {/* Icon / Top Frame Container */}
              <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: mod.color + '15', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: mod.color + '30' }}>
                <Text style={{ fontSize: 20 }}>{mod.icon}</Text>
              </View>

              {/* Labels Stack Frame */}
              <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: UI_COLORS.textPrimary, numberOfLines: 1 }}>
                  {mod.name}
                </Text>
                <Text style={{ fontSize: 12, color: UI_COLORS.textSecondary, marginTop: 2 }}>
                  {mod.tagline}
                </Text>
              </View>

              {/* Action Link Footer Layout */}
              <View style={{ backgroundColor: mod.color, borderRadius: 8, paddingVertical: 6, alignItems: 'center', marginTop: 12 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>Open Tools</Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
