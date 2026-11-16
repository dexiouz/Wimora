import { BraiderCard } from "@/components/braider-card";
import { colors, spacing } from "@/constants/bookingTheme";
import { braiders } from "@/data/braiders";
import type { ScreenProps } from "@/navigation/types";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function BraiderListScreen({
  navigation,
}: ScreenProps<"BraiderList">) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return braiders.filter((braider) =>
      `${braider.name} ${braider.specialty}`.toLocaleLowerCase().includes(term),
    );
  }, [query]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BraiderCard
          braider={item}
          onPress={() =>
            navigation.navigate("BraiderDetail", { braiderId: item.id })
          }
        />
      )}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Find your next braider</Text>
          <Text style={styles.subtitle}>
            Explore trusted artists and book a time that works for you.
          </Text>
          <TextInput
            accessibilityLabel="Search braiders by name or specialty"
            style={styles.search}
            placeholder="Search name or specialty"
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCorrect={false}
          />
          <Text style={styles.count}>
            {results.length} {results.length === 1 ? "braider" : "braiders"}{" "}
            available
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No braiders found</Text>
          <Text style={styles.emptyText}>Try another name or specialty.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: spacing.sm,
  },
  title: { color: colors.ink, fontSize: 32, fontWeight: "800", lineHeight: 38 },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  search: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  count: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  empty: {
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: 18,
  },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: "700" },
  emptyText: { color: colors.muted, fontSize: 14, marginTop: spacing.xs },
});
