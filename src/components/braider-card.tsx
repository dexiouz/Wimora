import { colors, spacing } from "@/constants/bookingTheme";
import type { Braider } from "@/data/braiders";
import { formatPrice } from "@/utils/format";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function BraiderCard({
  braider,
  onPress,
}: {
  braider: Braider;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${braider.name}, ${braider.specialty}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {braider.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </Text>
        </View>
        <View style={styles.identity}>
          <Text style={styles.name}>{braider.name}</Text>
          <Text style={styles.specialty}>{braider.specialty}</Text>
        </View>
        <Text style={styles.rating}>★ {braider.rating.toFixed(1)}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.location}>{braider.location}</Text>
        <Text style={styles.price}>From {formatPrice(braider.priceFrom)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  pressed: { opacity: 0.75 },
  top: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { color: colors.accent, fontSize: 16, fontWeight: "800" },
  identity: { flex: 1, marginLeft: spacing.md },
  name: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  specialty: { color: colors.muted, fontSize: 14, marginTop: spacing.xs },
  rating: { color: colors.ink, fontSize: 13, fontWeight: "700" },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 16,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: { color: colors.muted, fontSize: 13 },
  price: { color: colors.accent, fontSize: 14, fontWeight: "700" },
});
