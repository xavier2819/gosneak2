import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

export default function FavoritesScreen() {
  const [favorites] = useState(mockProducts.slice(0, 6)); // Mock favorites

  const renderProduct = ({ item }) => (
    <ProductCard product={item} showFavoriteIcon={false} />
  );

  const EmptyFavorites = () => (
    <View style={styles.emptyContainer}>
      <Star size={64} color="#E5E5EA" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start browsing and tap the star icon to save your favorite sneakers and crocs
      </Text>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>{favorites.length} saved items</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={favorites}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  cartButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  clearAllText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});