import { PrimaryButton } from "@/components/primary-button";
import { colors, spacing } from "@/constants/bookingTheme";
import { StyleSheet, Text, View } from "react-native";

export function MissingBraider({ onBrowse }: { onBrowse: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Braider unavailable</Text>
      <Text style={styles.body}>
        We could not find this braider. Browse the list to choose another one.
      </Text>
      <PrimaryButton label="Browse braiders" onPress={onBrowse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: spacing.lg },
  title: { color: colors.ink, fontSize: 24, fontWeight: "800" },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
