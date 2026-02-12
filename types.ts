
export enum Category {
  Electronics = 'Electronics',
  Fashion = 'Fashion',
  Home = 'Home',
  Lifestyle = 'Lifestyle'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  suggestedProducts?: string[]; // IDs
}

export interface UIState {
  isCartOpen: boolean;
  isChatOpen: boolean;
  activeCategory: Category | 'All';
  searchQuery: string;
}
