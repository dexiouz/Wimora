import { MissingBraider } from "@/components/missing-braider";
import { PrimaryButton } from "@/components/primary-button";
import { SectionTitle } from "@/components/section-title";
import { colors, spacing } from "@/constants/bookingTheme";
import { findBraider } from "@/data/braiders";
import type { ScreenProps } from "@/navigation/types";
import { formatDuration, formatPrice } from "@/utils/format";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BraiderDetailScreen({
  navigation,
  route,
}: ScreenProps<"BraiderDetail">) {
  const braider = findBraider(route.params.braiderId);
  if (!braider)
    return <MissingBraider onBrowse={() => navigation.popToTop()} />;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {braider.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </Text>
        </View>
        <Text style={styles.name}>{braider.name}</Text>
        <Text style={styles.specialty}>
          {braider.specialty} · {braider.location}
        </Text>
        <Text style={styles.rating}>★ {braider.rating.toFixed(1)} rating</Text>
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Services"
          subtitle="Choose your service during booking."
        />
        {braider.services.map((service) => (
          <View key={service.name} style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{service.name}</Text>
              <Text style={styles.rowDetail}>
                {formatDuration(service.minutes)}
              </Text>
            </View>
            <Text style={styles.price}>{formatPrice(service.price)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Available times"
          subtitle="Sample weekly availability."
        />
        <View style={styles.slots}>
          {braider.slots.map((slot) => (
            <Text key={slot} style={styles.slot}>
              {slot}
            </Text>
          ))}
        </View>
      </View>

      <PrimaryButton
        label={`Book with ${braider.name.split(" ")[0]}`}
        onPress={() => navigation.navigate("Booking", { braiderId: braider.id })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  hero: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { color: colors.accent, fontSize: 25, fontWeight: "800" },
  name: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
    marginTop: spacing.md,
  },
  specialty: { color: colors.muted, fontSize: 15, marginTop: spacing.xs },
  rating: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.md,
  },
  section: { marginBottom: spacing.xl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: spacing.sm,
  },
  rowText: { flex: 1 },
  rowTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  rowDetail: { color: colors.muted, fontSize: 13, marginTop: spacing.xs },
  price: { color: colors.accent, fontSize: 16, fontWeight: "700" },
  slots: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  slot: {
    color: colors.ink,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
});
