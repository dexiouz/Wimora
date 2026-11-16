import { colors, spacing } from "@/constants/bookingTheme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  detail?: string;
  selected?: boolean;
  onPress: () => void;
};

export function SelectionCard({
  title,
  detail,
  selected = false,
  onPress,
}: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.dot} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: spacing.sm,
  },
  selected: { borderColor: colors.accent, backgroundColor: "#FFF9F6" },
  pressed: { opacity: 0.8 },
  text: { flex: 1 },
  title: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  detail: { color: colors.muted, fontSize: 13, marginTop: spacing.xs },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.md,
  },
  radioSelected: { borderColor: colors.accent },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
});
