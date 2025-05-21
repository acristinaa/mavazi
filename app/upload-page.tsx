import { Colors } from "@/constants/Colors";
import { ScrollView, StyleSheet } from "react-native";
import { CategorySection } from "../components/upload-clothes/category-section";
import { SectionDivider } from "../components/upload-clothes/section-divider";
import { UploadOptions } from "../components/upload-clothes/upload-options";

export default function UploadPage() {
  // Handler functions
  const handleCameraUpload = () => console.log("Camera upload");
  const handleLibraryUpload = () => console.log("Library upload");
  const handleFilesUpload = () => console.log("Files upload");
  const handleCategorySelect = (category: string, type?: string) => {
    console.log("Selected:", category, type ? `(${type})` : "");
  };

  // Category data
  const clothingCategories = ["Sweater", "Jacket", "Shoes", "Shirts", "T-Shirt", "Shorts", "Pants", "Suits"];
  const accessoriesCategories = ["Rings", "Belts", "Jewerly"];

  return (
    <ScrollView style={styles.container}>
      <CategorySection 
        title="upload photo" 
        onSelect={() => {}}
        categories={[]}
        customContent={
          <UploadOptions 
            onCameraPress={handleCameraUpload}
            onLibraryPress={handleLibraryUpload}
            onFilesPress={handleFilesUpload}
          />
        }
      />

      <SectionDivider />

      <CategorySection 
        title="category" 
        subtitle="Unisex"
        categories={clothingCategories}
        onSelect={(category) => handleCategorySelect(category, "Unisex")}
      />

      <CategorySection 
        title="women" 
        categories={clothingCategories}
        onSelect={(category) => handleCategorySelect(category, "Women")}
      />

      <CategorySection 
        title="men" 
        categories={clothingCategories}
        onSelect={(category) => handleCategorySelect(category, "Men")}
      />

      <CategorySection 
        title="accessories" 
        categories={accessoriesCategories}
        onSelect={(category) => handleCategorySelect(category, "Accessories")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light.white,
  },
});
