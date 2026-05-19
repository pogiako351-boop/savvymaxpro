import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const THEME = {
  bg: '#0B0F19',
  surface: '#151D30',
  surfaceCard: '#1E2942',
  innerBg: '#0D1322',
  border: '#2A3754',
  accent: '#0284C7',     // Premium Savings Blue
  emerald: '#10B981',    // Success Green
  amber: '#F59E0B',      // Promo Gold
  textMuted: '#64748B',
  textSecondary: '#94A3B8',
  textLight: '#F8FAFC'
};

const BANK_TYPES = ['All', 'Digital Bank', 'Traditional'];

const BANK_DATA = [
  {
    id: 'maya-savings',
    name: 'Maya Bank',
    type: 'Digital Bank',
    baseRate: '3.5%',
    promoRate: 'Up to 11.0% P.A.',
    icon: '💳',
    officialUrl: 'https://www.maya.ph/save',
    highlight: 'Daily Interest Posting',
    features: ['Accrues daily interest base', 'Boost via partner transactions', 'Fully regulated digital license'],
    calculateYield: (principal: number) => Math.round(principal * 0.045) // Simulated realistic 4.5% avg yield
  },
  {
    id: 'gotyme-savings',
    name: 'GoTyme Bank',
    type: 'Digital Bank',
    baseRate: '4.0%',
    promoRate: '4.0% Constant',
    icon: '⏳',
    officialUrl: 'https://www.gotyme.com.ph/',
    highlight: 'No Complex Missions',
    features: ['Free physical card prints at kiosks', 'Go Rewards points accrual', 'No minimum maintaining deposit'],
    calculateYield: (principal: number) => Math.round(principal * 0.04)
  },
  {
    id: 'cimb-savings',
    name: 'CIMB Bank PH',
    type: 'Digital Bank',
    baseRate: '3.5%',
    promoRate: 'Up to 15.0% P.A.',
    icon: '🦁',
    officialUrl: 'https://www.cimbbank.com.ph/',
    highlight: 'Life Insurance Bundles',
    features: ['Linked directly with GCash via GSave', 'Free life insurance coverage tiers', 'Zero transfer transaction fees'],
    calculateYield: (principal: number) => Math.round(principal * 0.05)
  },
  {
    id: 'seabank-savings',
    name: 'SeaBank Philippines',
    type: 'Digital Bank',
    baseRate: '3.0%',
    promoRate: '3.0% Straight',
    icon: '🌊',
    officialUrl: 'https://www.seabank.ph/',
    highlight: 'Shopee Link Eco-system',
    features: ['Daily interest compounding credits', 'High integration with Shopee Pay', 'Free weekly outward transfers'],
    calculateYield: (principal: number) => Math.round(principal * 0.03)
  },
  {
    id: 'bpi-regular',
    name: 'BPI (Regular Savings)',
    type: 'Traditional',
    baseRate: '0.0625%',
    promoRate: 'Baseline Standard',
    icon: '🏢',
    officialUrl: 'https://www.bpi.com.ph/',
    highlight: 'Deep ATM Footprint',
    features: ['Massive physical branch security', 'Over-the-counter physical checking', 'Standard institutional trust'],
    calculateYield: (principal: number) => Math.round(principal * 0.000625)
  },
  {
    id: 'bdo-savings',
    name: 'BDO Unibank',
    type: 'Traditional',
    baseRate: '0.0625%',
    promoRate: 'Baseline Standard',
    icon: '👑',
    officialUrl: 'https://www.bdo.com.ph/',
    highlight: 'Weekend Branch Operations',
    features: ['Largest footprint across SM malls', 'Robust offline accessibility', 'High capital valuation backing'],
    calculateYield: (principal: number) => Math.round(principal * 0.000625)
  }
];

export default function BanksScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('All');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Evaluation reference placeholder representing principal baseline account volume
  const principalEvaluationBase = 50000; 

  const filteredBanks = BANK_DATA.filter(b => 
    selectedType === 'All' || b.type === selectedType
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* PREMIUM HEADER HERO */}
      <View style={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24 }}>
        <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 14 }}>
          <Text style={{ color: THEME.accent, fontWeight: '600', fontSize: 14 }}>← Back to Dashboard</Text>
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: '800', color: THEME.textLight, letterSpacing: -0.5 }}>Savings Comparator</Text>
        <Text style={{ fontSize: 14, color: THEME.textSecondary, marginTop: 4 }}>Contrast yield benchmarks between classic institutions and digital alternatives.</Text>
      </View>

      {/* SEGMENTED SEGMENT SELECTOR CONTROLLER */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <Text style={{ color: THEME.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 }}>
          Filter Banking Class System
        </Text>
        <View style={{ flexDirection: 'row', backgroundColor: THEME.surface, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: THEME.border }}>
          {BANK_TYPES.map(type => {
            const isActive = selectedType === type;
            return (
              <Pressable 
                key={type} 
                onPress={() => setSelectedType(type)} 
                style={{ flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: isActive ? THEME.accent : 'transparent', alignItems: 'center' }}
              >
                <Text style={{ color: isActive ? '#FFF' : THEME.textSecondary, fontSize: 13, fontWeight: '700' }}>{type}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* BENCHMARK SIMULATION DISPLAY */}
      <View style={{ marginHorizontal: 20, backgroundColor: THEME.surface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: THEME.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <View>
          <Text style={{ color: THEME.textMuted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>Simulated Evaluation Capital</Text>
          <Text style={{ color: THEME.textLight, fontSize: 13, fontWeight: '500', marginTop: 2 }}>Fixed comparative index value</Text>
        </View>
        <Text style={{ color: THEME.emerald, fontSize: 18, fontWeight: '800' }}>₱{principalEvaluationBase.toLocaleString()}</Text>
      </View>

      {/* MATRIX BANK COMPONENT LIST */}
      <View style={{ paddingHorizontal: 20, gap: 16 }}>
        {filteredBanks.map((bank) => {
          const isExpanded = expandedCard === bank.id;
          const estimatedYearlyInterest = bank.calculateYield(principalEvaluationBase);

          return (
            <Pressable
              key={bank.id}
              onPress={() => setExpandedCard(isExpanded ? null : bank.id)}
              style={{
                backgroundColor: THEME.surface,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isExpanded ? THEME.accent : THEME.border,
                padding: 16,
                overflow: 'hidden'
              }}
            >
              {/* TOP MASTER CARD DETAIL BAR */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 14 }}>{bank.icon}</Text>
                    <View style={{ backgroundColor: THEME.surfaceCard, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: THEME.border }}>
                      <Text style={{ color: THEME.textLight, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 }}>
                        {bank.type.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={{ color: THEME.amber, fontSize: 11, fontWeight: '600' }}>• {bank.highlight}</Text>
                  </View>
                  <Text style={{ color: THEME.textLight, fontSize: 19, fontWeight: '700', marginTop: 8 }}>
                    {bank.name}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: THEME.emerald, fontSize: 18, fontWeight: '800' }}>{bank.baseRate}</Text>
                  <Text style={{ color: THEME.textMuted, fontSize: 9, marginTop: 2, textTransform: 'uppercase' }}>Base P.A.</Text>
                </View>
              </View>

              {/* ESTIMATED RETURN GRID BLOCK */}
              <View style={{ backgroundColor: THEME.innerBg, padding: 12, borderRadius: 12, marginTop: 14, borderWidth: 1, borderColor: THEME.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>Est. Net Return (1 Year):</Text>
                <Text style={{ color: THEME.textLight, fontSize: 15, fontWeight: '700' }}>
                  + ₱{estimatedYearlyInterest.toLocaleString()}
                </Text>
              </View>

              {/* RESPONSIVE ACCORDION COLLAPSE CONTAINER */}
              {isExpanded && (
                <View style={{ marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: THEME.border, gap: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>Promo Target Cap Rate:</Text>
                    <Text style={{ color: THEME.amber, fontSize: 12, fontWeight: '700' }}>{bank.promoRate}</Text>
                  </View>
                  
                  {/* FEATURES SPEC BULLETS */}
                  <View style={{ gap: 4, marginVertical: 4 }}>
                    {bank.features.map((feat, idx) => (
                      <Text key={idx} style={{ color: THEME.textSecondary, fontSize: 12 }}>
                        • {feat}
                      </Text>
                    ))}
                  </View>

                  <Text style={{ color: THEME.textMuted, fontSize: 11, lineHeight: 15 }}>
                    Deposits are secured up to ₱500,000 per single framework entity depositor via structural Philippine Deposit Insurance Corporation (PDIC) insurance guidelines.
                  </Text>

                  {/* ACTIVE DIRECT CONVERSION WEB CTA BUTTON */}
                  <Pressable
                    onPress={() => Linking.openURL(bank.officialUrl).catch(() => {})}
                    style={({ pressed }) => ({
                      backgroundColor: THEME.accent,
                      borderRadius: 12,
                      paddingVertical: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: pressed ? 0.85 : 1,
                      width: '100%'
                    })}
                  >
                    <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '700', letterSpacing: 0.3 }}>
                      Visit {bank.name} Portal →
                    </Text>
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
