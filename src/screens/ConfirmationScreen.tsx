import { PrimaryButton } from "@/components/primary-button";
import { colors, spacing } from "@/constants/bookingTheme";
import { useBooking } from "@/context/booking";
import type { ScreenProps } from "@/navigation/types";
import { formatDuration, formatPrice } from "@/utils/format";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen({
  navigation,
}: ScreenProps<"Confirmation">) {
  const { booking, clearBooking } = useBooking();
  function goHome() {
    clearBooking();
    navigation.reset({ index: 0, routes: [{ name: "BraiderList" }] });
  }

  if (!booking) {
    return (
      <View style={styles.missing}>
        <Text style={styles.title}>No booking to show</Text>
        <Text style={styles.subtitle}>
          Start with a braider to make a demo booking.
        </Text>
        <PrimaryButton label="Browse braiders" onPress={goHome} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.check}>
        <Text style={styles.checkText}>✓</Text>
      </View>
      <Text style={styles.title}>You’re booked!</Text>
      <Text style={styles.subtitle}>Here are your appointment details.</Text>
      <View style={styles.summary}>
        <SummaryRow label="Braider" value={booking.braider.name} />
        <SummaryRow label="Location" value={booking.braider.location} />
        <SummaryRow label="Service" value={booking.service.name} />
        <SummaryRow
          label="Duration"
          value={formatDuration(booking.service.minutes)}
        />
        <SummaryRow label="Time" value={booking.slot} />
        <SummaryRow label="Price" value={formatPrice(booking.service.price)} />
        <SummaryRow label="Name" value={booking.customerName} />
        <SummaryRow label="Phone" value={booking.phone} last />
      </View>
      <Text style={styles.note}>
        Demo confirmation only. Your booking is held in memory and is not sent
        to the braider.
      </Text>
      <PrimaryButton label="Back to braiders" onPress={goHome} />
    </ScrollView>
  );
}

function SummaryRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  missing: { flex: 1, justifyContent: "center", padding: spacing.lg },
  check: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E2F3E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  checkText: { color: colors.success, fontSize: 32, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 28, fontWeight: "800" },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  lastRow: { borderBottomWidth: 0 },
  rowLabel: { color: colors.muted, fontSize: 14 },
  rowValue: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
    flexShrink: 1,
  },
  note: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginVertical: spacing.lg,
  },
});
