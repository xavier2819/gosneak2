import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Star, Share, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react-native';
import { mockProducts, Product } from '@/data/mockData';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      if (foundProduct?.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size before adding to cart.');
      return;
    }
    
    Alert.alert(
      'Added to Cart',
      `${product?.name} (Size: ${selectedSize}) has been added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size before purchasing.');
      return;
    }
    
    Alert.alert(
      'Purchase',
      `Proceeding to checkout for ${product?.name} (Size: ${selectedSize})`,
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const productImages = [
    product.image,
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2',
    'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Star 
              size={24} 
              color={isFavorite ? '#FFD700' : '#1D1D1F'} 
              fill={isFavorite ? '#FFD700' : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={24} color="#1D1D1F" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {productImages.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.productImage}
              />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicators}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {discountPercentage && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercentage}%</Text>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <View style={styles.brandRatingContainer}>
            <Text style={styles.brand}>{product.brand}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>(124 reviews)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          <View style={styles.stockContainer}>
            <View style={styles.stockIndicator} />
            <Text style={styles.stockText}>In Stock - Ready to Ship</Text>
          </View>

          <Text style={styles.description}>
            {product.description || 'Experience premium comfort and style with this exceptional footwear. Crafted with attention to detail and designed for both performance and everyday wear.'}
          </Text>

          <View style={styles.materialInfo}>
            <Text style={styles.sectionTitle}>Material Composition</Text>
            <Text style={styles.materialText}>
              • Upper: Premium synthetic leather and mesh
              • Sole: Durable rubber compound
              • Lining: Breathable textile material
              • Insole: Cushioned EVA foam
            </Text>
          </View>

          {product.colors && product.colors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Colors</Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorOption,
                      selectedColor === color && styles.selectedColorOption
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={[
                      styles.colorText,
                      selectedColor === color && styles.selectedColorText
                    ]}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.selectedSizeOption
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Truck size={20} color="#007AFF" />
              <Text style={styles.featureText}>Free shipping on orders over $75</Text>
            </View>
            <View style={styles.feature}>
              <Shield size={20} color="#34C759" />
              <Text style={styles.featureText}>1-year warranty included</Text>
            </View>
            <View style={styles.feature}>
              <RotateCcw size={20} color="#FF9500" />
              <Text style={styles.featureText}>30-day return policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color="#007AFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 400,
  },
  productImage: {
    width: width,
    height: 400,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 20,
  },
  brandRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 12,
    lineHeight: 34,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  originalPrice: {
    fontSize: 20,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  stockText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#1D1D1F',
    lineHeight: 24,
    marginBottom: 24,
  },
  materialInfo: {
    marginBottom: 24,
  },
  materialText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  colorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  selectedColorText: {
    color: '#FFFFFF',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeOption: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 50,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSizeOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#1D1D1F',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#1D1D1F',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});