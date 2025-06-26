export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
  material?: string;
}

// Generate comprehensive size range from 6 to 20 with half sizes
const generateSizes = (): string[] => {
  const sizes: string[] = [];
  for (let i = 6; i <= 20; i++) {
    sizes.push(i.toString());
    if (i < 20) {
      sizes.push(`${i}.5`);
    }
  }
  return sizes;
};

const allSizes = generateSizes();

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 High OG',
    brand: 'Nike',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634',
    category: 'Sneakers',
    description: 'El legendario Air Jordan 1 en su versión más clásica y codiciada.',
    sizes: allSizes.slice(2, 12),
    colors: ['Chicago', 'Royal Blue', 'Bred'],
    stock: 10
  },
  {
    id: '2',
    name: 'Ultra Boost 21',
    brand: 'Adidas',
    price: 180,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    category: 'Sneakers',
    description: 'La última versión del Ultra Boost con tecnología mejorada.',
    sizes: allSizes.slice(2, 12),
    colors: ['Core Black', 'Cloud White', 'Solar Yellow'],
    stock: 15
  },
  {
    id: '3',
    name: 'RS-X³',
    brand: 'Puma',
    price: 110,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    category: 'Sneakers',
    description: 'Diseño retro-futurista con tecnología Running System.',
    sizes: allSizes.slice(2, 12),
    colors: ['Whisper White', 'Puma Black', 'High Risk Red'],
    stock: 12
  },
  {
    id: '4',
    name: 'Chuck 70 Hi',
    brand: 'Converse',
    price: 85,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    category: 'Sneakers',
    description: 'El clásico Chuck Taylor en su versión premium.',
    sizes: allSizes.slice(2, 12),
    colors: ['Black', 'Parchment', 'Navy'],
    stock: 20
  },
  {
    id: '5',
    name: '990v5',
    brand: 'New Balance',
    price: 175,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578116922645-3976907a7671',
    category: 'Sneakers',
    description: 'El modelo insignia de New Balance, fabricado en USA.',
    sizes: allSizes.slice(2, 12),
    colors: ['Grey', 'Navy', 'Black'],
    stock: 8
  },
  {
    id: '6',
    name: 'Old Skool',
    brand: 'Vans',
    price: 65,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
    category: 'Sneakers',
    description: 'El clásico skate shoe con la icónica franja lateral.',
    sizes: allSizes.slice(2, 12),
    colors: ['Black/White', 'Navy', 'Red'],
    stock: 25
  },
  {
    id: '7',
    name: 'Triple S',
    brand: 'Balenciaga',
    price: 995,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1584735174914-6b1272901297',
    category: 'Sneakers',
    description: 'La zapatilla que definió la tendencia chunky.',
    sizes: allSizes.slice(2, 12),
    colors: ['Triple Black', 'Cream', 'Multi'],
    stock: 5
  },
  {
    id: '8',
    name: 'HOVR Phantom 2',
    brand: 'Under Armour',
    price: 150,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584735174914-6b1272901297',
    category: 'Sneakers',
    description: 'Tecnología HOVR para máximo retorno de energía.',
    sizes: allSizes.slice(2, 12),
    colors: ['Black', 'White', 'Grey'],
    stock: 18
  },
  {
    id: '9',
    name: 'Zig Kinetica II',
    brand: 'Reebok',
    price: 120,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1584735174914-6b1272901297',
    category: 'Sneakers',
    description: 'Diseño innovador con tecnología Zig para mejor amortiguación.',
    sizes: allSizes.slice(2, 12),
    colors: ['Core Black', 'White', 'Orange'],
    stock: 14
  },
  {
    id: '10',
    name: 'Cloud X',
    brand: 'On',
    price: 140,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584735174914-6b1272901297',
    category: 'Sneakers',
    description: 'La zapatilla más versátil de On, perfecta para todo tipo de entrenamiento.',
    sizes: allSizes.slice(2, 12),
    colors: ['Black/White', 'All White', 'Storm/Flash'],
    stock: 10
  }
];