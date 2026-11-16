import { MissingBraider } from "@/components/missing-braider";
import { PrimaryButton } from "@/components/primary-button";
import { SectionTitle } from "@/components/section-title";
import { SelectionCard } from "@/components/selection-card";
import { colors, spacing } from "@/constants/bookingTheme";
import { useBooking } from "@/context/booking";
import { findBraider } from "@/data/braiders";
import type { ScreenProps } from "@/navigation/types";
import { formatDuration, formatPrice } from "@/utils/format";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function BookingScreen({
  navigation,
  route,
}: ScreenProps<"Booking">) {
  const braider = findBraider(route.params.braiderId);
  const { saveBooking } = useBooking();
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!braider)
    return <MissingBraider onBrowse={() => navigation.popToTop()} />;

  function submit() {
    if (!braider) return;
    if (serviceIndex === null || !slot) {
      setError("Choose a service and a time to continue.");
      return;
    }
    if (!customerName.trim()) {
      setError("Enter your name to continue.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setError("Enter a valid phone number with 10 to 15 digits.");
      return;
    }
    setError("");
    saveBooking({
      braider,
      service: braider.services[serviceIndex],
      slot,
      customerName: customerName.trim(),
      phone: phone.trim(),
    });
    navigation.replace("Confirmation");
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>BOOKING WITH</Text>
        <Text style={styles.title}>{braider.name}</Text>
        <Text style={styles.intro}>
          Select a service and time, then add your contact details.
        </Text>

        <View style={styles.section}>
          <SectionTitle title="1. Select a service" />
          {braider.services.map((service, index) => (
            <SelectionCard
              key={service.name}
              title={service.name}
              detail={`${formatDuration(service.minutes)} · ${formatPrice(service.price)}`}
              selected={serviceIndex === index}
              onPress={() => {
                setServiceIndex(index);
                setError("");
              }}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionTitle
            title="2. Select a time"
            subtitle="These are sample weekly time slots."
          />
          {braider.slots.map((availableSlot) => (
            <SelectionCard
              key={availableSlot}
              title={availableSlot}
              selected={slot === availableSlot}
              onPress={() => {
                setSlot(availableSlot);
                setError("");
              }}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionTitle title="3. Your details" />
          <Text style={styles.label}>Full name</Text>
          <TextInput
            accessibilityLabel="Full name"
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={colors.muted}
            autoComplete="name"
            textContentType="name"
            value={customerName}
            onChangeText={(value) => {
              setCustomerName(value);
              setError("");
            }}
          />
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            accessibilityLabel="Phone number"
            style={styles.input}
            placeholder="(555) 123-4567"
            placeholderTextColor={colors.muted}
            autoComplete="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(value) => {
              setPhone(value);
              setError("");
            }}
          />
        </View>

        {error ? (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        ) : null}
        <PrimaryButton label="Confirm booking" onPress={submit} />
        <Text style={styles.note}>
          This is a demo booking. No payment or message is sent.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "800",
    marginTop: spacing.xs,
  },
  intro: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  section: { marginBottom: spacing.lg },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: spacing.lg,
  },
  error: { color: colors.accent, fontSize: 14, marginBottom: spacing.md },
  note: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.md,
  },
});
