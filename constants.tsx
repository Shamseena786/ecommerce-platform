
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AeroPulse Wireless Headphones',
    description: 'Next-gen noise cancellation with 40-hour battery life and immersive spatial audio.',
    price: 299.99,
    category: Category.Electronics,
    image: 'https://picsum.photos/seed/headphones/600/600',
    rating: 4.8,
    reviews: 124,
    stock: 15
  },
  {
    id: '2',
    name: 'Luxe Cashmere Overcoat',
    description: 'Sustainable Mongolian cashmere blend, tailored for a timeless silhouette.',
    price: 450.00,
    category: Category.Fashion,
    image: 'https://picsum.photos/seed/coat/600/600',
    rating: 4.9,
    reviews: 56,
    stock: 8
  },
  {
    id: '3',
    name: 'Zenith Smart Watch Pro',
    description: 'Crystal-clear OLED display with advanced health monitoring and GPS tracking.',
    price: 199.50,
    category: Category.Electronics,
    image: 'https://picsum.photos/seed/watch/600/600',
    rating: 4.6,
    reviews: 890,
    stock: 25
  },
  {
    id: '4',
    name: 'Nordic Oak Coffee Table',
    description: 'Minimalist Scandinavian design crafted from solid sustainably sourced white oak.',
    price: 320.00,
    category: Category.Home,
    image: 'https://picsum.photos/seed/table/600/600',
    rating: 4.7,
    reviews: 32,
    stock: 5
  },
  {
    id: '5',
    name: 'Prism Glass Desk Lamp',
    description: 'Architectural lighting with adjustable color temperature and wireless charging base.',
    price: 85.00,
    category: Category.Home,
    image: 'https://picsum.photos/seed/lamp/600/600',
    rating: 4.5,
    reviews: 210,
    stock: 40
  },
  {
    id: '6',
    name: 'Urban Explorer Backpack',
    description: 'Waterproof tech-ready pack with hidden compartments and ergonomic support.',
    price: 120.00,
    category: Category.Lifestyle,
    image: 'https://picsum.photos/seed/backpack/600/600',
    rating: 4.4,
    reviews: 156,
    stock: 12
  },
  {
    id: '7',
    name: 'Serene Ceramic Tea Set',
    description: 'Hand-thrown stoneware with a reactive glaze, including a teapot and four cups.',
    price: 65.00,
    category: Category.Lifestyle,
    image: 'https://picsum.photos/seed/teaset/600/600',
    rating: 4.9,
    reviews: 44,
    stock: 10
  },
  {
    id: '8',
    name: 'Elysium Silk Scarf',
    description: 'Hand-painted 100% mulberry silk with vibrant organic patterns.',
    price: 55.00,
    category: Category.Fashion,
    image: 'https://picsum.photos/seed/scarf/600/600',
    rating: 4.8,
    reviews: 18,
    stock: 20
  }
];

export const SYSTEM_PROMPT = `
You are Lumina, an advanced AI shopping assistant for Lumina Commerce.
Your goal is to provide exceptional, friendly, and helpful shopping advice.

Available Products:
${PRODUCTS.map(p => `- [ID: ${p.id}] ${p.name}: ${p.description} ($${p.price})`).join('\n')}

Guidelines:
1. Always be professional yet conversational.
2. Recommend products based on user needs. 
3. When suggesting products, explain *why* they fit the user's request.
4. You MUST respond with a JSON object if the user is looking for recommendations, otherwise respond with text.
5. If the user asks general questions, just answer them.
`;
