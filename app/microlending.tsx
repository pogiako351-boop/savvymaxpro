import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const THEME = {
  bg: '#0B0F19',
  surface: '#151D30',
  surfaceCard: '#1E2942',
  innerBg: '#0D1322',
  border: '#2A3754',
  accent: '#F59E0B',     // Micro-Lending Premium Amber Gold
  emerald: '#10B981',    // Success Green
  blue: '#3B82F6',       // Institutional Blue
  textMuted: '#64748B',
  textSecondary: '#94A3B8',
  textLight: '#F8FAFC'
};

const PRINCIPAL_TIERS = [5000, 10000, 20000, 50000]; // Scaled up to maximum 50k tier

export default function MicroLendingScreen() {
  const router = useRouter();
  const [selectedPrincipal, setSelectedPrincipal] = useState(10000);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Dynamic calculations based on local PH structural formulas
  const loanPrograms = [
    {
      id: 'sss-salary',
      title: 'SSS Salary Loan',
      type: 'Government Institutional',
      icon: '🛡️',
      portalUrl: 'https://member.sss.gov.ph/members/',
      calculatePayment: (principal: number) => {
        // Stated Rate: 10% p.a. over 24 Months straight-line benchmark computation
        const totalInterest = principal * 0.10 * 2;
        return Math.round((principal + totalInterest) / 24);
      },
      subtitle: 'Stated Rate: 10% p.a. over 24 Months'
    },
    {
      id: 'pagibig-mp',
      title: 'Pag-IBIG Multi-Purpose Loan',
      type: 'Government Institutional',
      icon: '🏠',
      portalUrl: 'https://www.virtualpagibig.com.ph/',
      calculatePayment: (principal: number) => {
        // Stated Rate: 5.95% p.a. over 36 Months benchmark computation
        const totalInterest = principal * 0.0595 * 3;
        return Math.round((principal + totalInterest) / 36);
      },
      subtitle: 'Stated Rate: 5.95% p.a. over 36 Months'
    },
    {
      id: 'traditional-micro',
      title: 'Traditional Micro-Financing',
      type: 'Private Commercial Tier',
      icon: '💳',
      portalUrl: 'https://www.sec.gov.ph/', // Pointing to safety/regulatory compliance validation
      calculatePayment: (principal: number) => {
        // Stated Rate: 3% monthly over 6 Months structural formula
        const totalInterest = principal * 0.03 * 6;
        return Math.round((principal + totalInterest) / 6);
      },
      subtitle: 'Stated Rate: 3% monthly over 6 Months'
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* PREMIUM HEADER HERO */}
      <View style={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24 }}>
        <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 14 }}>
          <Text style={{ color: THEME.accent, fontWeight: '600', fontSize: 14 }}>← Back to Dashboard</Text>
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: '800', color: THEME.textLight, letterSpacing: -0.5 }}>Personal Credit Matrix</Text>
        <Text style={{ fontSize: 14, color: THEME.textSecondary, marginTop: 4 }}>Compare short-term credit facility benchmarks with formal lending setups.</Text>
      </View>

      {/* DYNAMIC PRINCIPAL TIER SELECTOR */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <Text style={{ color: THEME.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 }}>
          Micro-Loan Principal Capital
        </Text>
        
        <View style={{ gap: 12 }}>
          {/* HUGE CALLOUT DISPLAY */}
          <View style={{ backgroundColor: THEME.surface, padding: 18, borderRadius: 16, borderWidth: 1, borderColor: THEME.border, alignItems: 'center' }}>
            <Text style={{ color: THEME.accent, fontSize: 32, fontWeight: '800' }}>
              ₱{selectedPrincipal.toLocaleString()}
            </Text>
            <Text style={{ color: THEME.textMuted, fontSize: 11, marginTop: 2 }}>Selected Evaluation Base</Text>
          </View>

          {/* CHIP SELECTOR LAYOUT */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {PRINCIPAL_TIERS.map((tier) => {
              const isSelected = selectedPrincipal === tier;
              return (
                <Pressable
                  key={tier}
                  onPress={() => setSelectedPrincipal(tier)}
                  style={{
                    flex: 1,
                    backgroundColor: isSelected ? THEME.accent : THEME.surface,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isSelected ? THEME.accent : THEME.border,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: isSelected ? THEME.bg : THEME.textLight, fontSize: 13, fontWeight: '700' }}>
                    ₱{tier.toLocaleString()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* CREDIT COMPARISON MATRICES ENGINE */}
      <View style={{ paddingHorizontal: 20, gap: 16 }}>
        {loanPrograms.map((program) => {
          const isExpanded = expandedCard === program.id;
          const estimatedMonthly = program.calculatePayment(selectedPrincipal);

          return (
            <Pressable
              key={program.id}
              onPress={() => setExpandedCard(isExpanded ? null : program.id)}
              style={{
                backgroundColor: THEME.surface,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isExpanded ? THEME.accent : THEME.border,
                padding: 16,
                overflow: 'hidden'
              }}
            >
              {/* CARD CONTAINER TOP HALF */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 14 }}>{program.icon}</Text>
                    <View style={{ backgroundColor: THEME.surfaceCard, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: THEME.border }}>
                      <Text style={{ color: THEME.textLight, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 }}>
                        {program.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ color: THEME.textLight, fontSize: 18, fontWeight: '700', marginTop: 8 }}>
                    {program.title}
                  </Text>
                  <Text style={{ color: THEME.textSecondary, fontSize: 11, marginTop: 2 }}>
                    {program.subtitle}
                  </Text>
                </View>
              </View>

              {/* ESTIMATED INSTALLMENT BILLING BOX */}
              <View style={{ backgroundColor: THEME.innerBg, padding: 14, borderRadius: 12, marginTop: 14, borderWidth: 1, borderColor: THEME.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>Estimated Repayment:</Text>
                <Text style={{ color: THEME.accent, fontSize: 18, fontWeight: '800' }}>
                  ₱{estimatedMonthly.toLocaleString()}<Text style={{ fontSize: 11, color: THEME.textMuted, fontWeight: '400' }}> / mo</Text>
                </Text>
              </View>

              {/* COLLAPSIBLE PREMIUM LONG-FORM CONTENT & PORTAL ACTION */}
              {isExpanded && (
                <View style={{ marginTop: 14, pt: 4, borderTopWidth: 1, borderTopColor: THEME.border, gap: 12 }}>
                  <Text style={{ color: THEME.textSecondary, fontSize: 11, lineHeight: 16 }}>
                    This model assumes your member history qualifies for maximum allocation capacity. Always audit individual verification statements on the official government or lender terminal before initiating debt contracts.
                  </Text>
                  
                  <Pressable
                    onPress={() => Linking.openURL(program.portalUrl).catch(() => {})}
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
                    <Text style={{ color: THEME.bg, fontSize: 13, fontWeight: '700', letterSpacing: 0.3 }}>
                      Access Official Secure Portal →
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
