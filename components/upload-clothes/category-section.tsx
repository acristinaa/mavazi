import { StyleSheet, Text, View } from "react-native";
import { CategoryButton } from "./category-buttons";

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  categories: string[];
  onSelect: (category: string) => void;
  customContent?: React.ReactNode;
}

export const CategorySection = ({ 
  title, 
  subtitle, 
  categories, 
  onSelect,
  customContent 
}: CategorySectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle && <Text style={styles.categoryTitle}>{subtitle}</Text>}
    
    {customContent || (
      <View style={styles.categoryButtonsContainer}>
        {categories.map((category, index) => (
          <CategoryButton 
            key={`${title}-${category}-${index}`}
            name={category}
            onPress={() => onSelect(category)}
          />
        ))}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  categoryButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
});