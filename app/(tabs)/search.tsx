import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const brands = ['Nike', 'Adidas', 'Jordan', 'Crocs', 'Vans', 'Converse', 'New Balance'];
  const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
  const recentSearches = ['Air Jordan 1', 'Crocs Classic', 'Nike Air Max', 'Adidas Ultraboost'];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#8E8E93"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchText.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => setSearchText(search)}
              >
                <Search size={16} color="#8E8E93" />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${priceRange[0]} - ${priceRange[1]}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brands</Text>
          <View style={styles.filterGrid}>
            {brands.map((brand, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterChip,
                  selectedBrands.includes(brand) && styles.filterChipSelected
                ]}
                onPress={() => toggleBrand(brand)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedBrands.includes(brand) && styles.filterChipTextSelected
                ]}>
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sizes</Text>
          <View style={styles.filterGrid}>
            {sizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeChip,
                  selectedSizes.includes(size) && styles.sizeChipSelected
                ]}
                onPress={() => toggleSize(size)}
              >
                <Text style={[
                  styles.sizeChipText,
                  selectedSizes.includes(size) && styles.sizeChipTextSelected
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1D1D1F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  priceContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
    textAlign: 'center',
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipSelected: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  sizeChip: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  sizeChipSelected: {
    backgroundColor: '#007AFF',
  },
  sizeChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  sizeChipTextSelected: {
    color: '#FFFFFF',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});