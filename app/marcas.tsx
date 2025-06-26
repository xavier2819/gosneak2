import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { mockProducts } from '@/data/mockData';

const brands = [
  { name: 'Nike', logo: '🏃', featured: mockProducts.find(p => p.brand === 'Nike') },
  { name: 'Adidas', logo: '⚡', featured: mockProducts.find(p => p.brand === 'Adidas') },
  { name: 'Puma', logo: '🐆', featured: mockProducts.find(p => p.brand === 'Puma') },
  { name: 'Converse', logo: '👟', featured: mockProducts.find(p => p.brand === 'Converse') },
  { name: 'New Balance', logo: '🔄', featured: mockProducts.find(p => p.brand === 'New Balance') },
  { name: 'Vans', logo: '🛹', featured: mockProducts.find(p => p.brand === 'Vans') },
  { name: 'Balenciaga', logo: '👑', featured: mockProducts.find(p => p.brand === 'Balenciaga') },
  { name: 'Under Armour', logo: '🛡️', featured: mockProducts.find(p => p.brand === 'Under Armour') },
  { name: 'Reebok', logo: '🏃‍♂️', featured: mockProducts.find(p => p.brand === 'Reebok') },
  { name: 'On', logo: '🌟', featured: mockProducts.find(p => p.brand === 'On') },
];

export default function BrandsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Marcas</Text>
        <Text style={styles.subtitle}>Descubre nuestras marcas destacadas</Text>
      </View>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.name}
        renderItem={({ item: brand }) => (
          <TouchableOpacity
            style={styles.brandCard}
            onPress={() => router.push(`/search?brand=${brand.name}`)}
          >
            <View style={styles.brandHeader}>
              <Text style={styles.brandLogo}>{brand.logo}</Text>
              <Text style={styles.brandName}>{brand.name}</Text>
            </View>
            {brand.featured && (
              <View style={styles.featuredProduct}>
                <Image
                  source={{ uri: brand.featured.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{brand.featured.name}</Text>
                  <Text style={styles.productPrice}>${brand.featured.price}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    marginTop: 44,
  },
  backButton: {
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  listContent: {
    padding: 16,
  },
  brandCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    fontSize: 32,
    marginRight: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  featuredProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});