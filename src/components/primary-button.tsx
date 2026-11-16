import { colors } from "@/constants/bookingTheme";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = { label: string; onPress: () => void; disabled?: boolean };

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderRadius: 14,
    minHeight: 54,
    paddingHorizontal: 20,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
  label: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
