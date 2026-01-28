import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Surface, Text, TextInput } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import UIButton from "./components/common/ui/Button";

const PAYMENT_METHODS = [
  { label: "Cash", icon: "cash" },
  { label: "Card", icon: "credit-card-outline" },
  { label: "Split", icon: "call-split" },
];
const QUICK_AMOUNTS = ["EXACT", "$125", "$130", "$150"];

const formatMoney = (value) => `$${Number(value).toFixed(2)}`;

const CheckoutScreen = () => {
  const router = useRouter();
  const { subtotal, discount, tax, total } = useLocalSearchParams();

  const parsedSubtotal = useMemo(() => Number(subtotal) || 124.5, [subtotal]);
  const parsedDiscount = useMemo(() => Number(discount) || 12.45, [discount]);
  const parsedTax = useMemo(() => Number(tax) || 9.24, [tax]);
  const parsedTotal = useMemo(
    () =>
      total ? Number(total) : parsedSubtotal - parsedDiscount + parsedTax,
    [parsedSubtotal, parsedDiscount, parsedTax, total]
  );

  const [method, setMethod] = useState("Cash");
  const [tendered, setTendered] = useState(parsedTotal.toFixed(2));
  const [splitCash, setSplitCash] = useState(parsedTotal.toFixed(2));
  const [splitCard, setSplitCard] = useState("0.00");
  const totalTendered = useMemo(() => {
    if (method === "Split") {
      const cashValue = Number(splitCash);
      const cardValue = Number(splitCard);
      const safeCash = Number.isNaN(cashValue) ? 0 : cashValue;
      const safeCard = Number.isNaN(cardValue) ? 0 : cardValue;
      return safeCash + safeCard;
    }
    const tenderedValue = Number(tendered);
    return Number.isNaN(tenderedValue) ? 0 : tenderedValue;
  }, [method, splitCash, splitCard, tendered]);
  const changeDue = useMemo(() => {
    return Math.max(totalTendered - parsedTotal, 0);
  }, [parsedTotal, totalTendered]);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Checkout" titleStyle={styles.title} />
        <Text style={styles.stepText}>Step 2 of 2</Text>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Surface elevation={1} style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatMoney(parsedSubtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.discountLabel]}>
              Discount (10% OFF)
            </Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>
              -{formatMoney(parsedDiscount)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (8.25%)</Text>
            <Text style={styles.summaryValue}>{formatMoney(parsedTax)}</Text>
          </View>
          <View style={styles.dashedDivider} />
          <Text style={styles.totalHint}>Total Amount to Pay</Text>
          <Text style={styles.totalValue}>{formatMoney(parsedTotal)}</Text>
        </Surface>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <View style={styles.methodsRow}>
          {PAYMENT_METHODS.map((option, idx) => {
            const active = method === option.label;
            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.methodCard,
                  active && styles.methodCardActive,
                  idx === PAYMENT_METHODS.length - 1 && styles.methodLast,
                ]}
                onPress={() => setMethod(option.label)}
              >
                <View style={styles.methodIconWrap}>
                  <Icon
                    source={option.icon}
                    size={22}
                    color={active ? COLORS.primary : COLORS.muted}
                  />
                </View>
                <Text style={[styles.methodLabel, active && styles.methodLabelActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Surface elevation={1} style={styles.tenderCard}>
          <Text style={styles.sectionLabel}>
            {method === "Split" ? "Split Payment" : "Amount Tendered"}
          </Text>
          {method === "Split" ? (
            <View style={styles.splitGroup}>
              <View style={styles.splitField}>
                <Text style={styles.splitLabel}>Cash Amount</Text>
                <TextInput
                  mode="outlined"
                  value={splitCash}
                  onChangeText={setSplitCash}
                  keyboardType="decimal-pad"
                  left={<TextInput.Affix text="$" />}
                  outlineColor={COLORS.border}
                  activeOutlineColor={COLORS.primary}
                  style={styles.tenderInput}
                  outlineStyle={styles.tenderOutline}
                  theme={{ roundness: 14 }}
                />
              </View>
              <View style={styles.splitField}>
                <Text style={styles.splitLabel}>Card Amount</Text>
                <TextInput
                  mode="outlined"
                  value={splitCard}
                  onChangeText={setSplitCard}
                  keyboardType="decimal-pad"
                  left={<TextInput.Affix text="$" />}
                  outlineColor={COLORS.border}
                  activeOutlineColor={COLORS.primary}
                  style={styles.tenderInput}
                  outlineStyle={styles.tenderOutline}
                  theme={{ roundness: 14 }}
                />
              </View>
            </View>
          ) : (
            <>
              <TextInput
                mode="outlined"
                value={tendered}
                onChangeText={setTendered}
                keyboardType="decimal-pad"
                left={<TextInput.Affix text="$" />}
                outlineColor={COLORS.border}
                activeOutlineColor={COLORS.primary}
                style={styles.tenderInput}
                outlineStyle={styles.tenderOutline}
                theme={{ roundness: 14 }}
              />
              <View style={styles.quickRow}>
                {QUICK_AMOUNTS.map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={styles.quickPill}
                    onPress={() => {
                      if (amt === "EXACT") {
                        setTendered(parsedTotal.toFixed(2));
                      } else {
                        const num = Number(amt.replace("$", ""));
                        setTendered(num.toFixed(2));
                      }
                    }}
                  >
                    <Text style={styles.quickText}>{amt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          <View style={styles.dueRow}>
            <Text style={styles.dueLabel}>Change Due</Text>
            <Text style={styles.dueValue}>{formatMoney(changeDue)}</Text>
          </View>
        </Surface>

      </ScrollView>

      <View style={styles.actionsBar}>
        <UIButton
          variant="primary"
          size="lg"
          icon="check"
          onPress={() =>
            router.push({
              pathname: "/transaction-result",
              params: {
                total: parsedTotal.toFixed(2),
              },
            })
          }
          style={styles.primaryButton}
          labelStyle={styles.primaryLabel}
        >
          Complete Payment & Print
        </UIButton>
        <UIButton
          variant="ghost"
          size="md"
          icon="close"
          onPress={() => router.back()}
          style={styles.cancelButton}
          labelStyle={styles.cancelLabel}
        >
          Cancel
        </UIButton>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontWeight: "700",
  },
  stepText: {
    marginRight: 12,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  content: {
    padding: 20,
    paddingBottom: 200,
  },
  sectionLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  summaryCard: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontWeight: "600",
  },
  summaryValue: {
    color: COLORS.text,
    fontWeight: "700",
  },
  discountLabel: {
    color: COLORS.warningDark,
  },
  discountValue: {
    color: COLORS.warningDark,
    fontWeight: "700",
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    marginVertical: 10,
  },
  totalHint: {
    color: COLORS.muted,
    textAlign: "center",
    fontWeight: "700",
  },
  totalValue: {
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 26,
    marginTop: 4,
  },
  sectionTitle: {
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 10,
  },
  methodsRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  methodCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: 18,
    alignItems: "center",
    marginRight: 10,
  },
  methodIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neutralSoft,
    marginBottom: 6,
  },
  methodLast: {
    marginRight: 0,
  },
  methodCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryTint,
  },
  methodLabel: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  methodLabelActive: {
    color: COLORS.primary,
  },
  tenderCard: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 16,
  },
  tenderInput: {
    backgroundColor: COLORS.neutralSoft,
    fontSize: 20,
    fontWeight: "800",
  },
  tenderOutline: {
    borderRadius: 14,
  },
  quickRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  quickPill: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.neutralSoft,
  },
  quickText: {
    fontWeight: "700",
    color: COLORS.muted,
  },
  splitGroup: {
    gap: 12,
  },
  splitField: {
    marginBottom: 4,
  },
  splitLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: COLORS.muted,
    marginBottom: 6,
  },
  dueRow: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primaryTint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dueLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  dueValue: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 16,
  },
  actionsBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: "800",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelLabel: {
    color: COLORS.primary,
  },
});
