
import React from 'react';
import { Product } from '../types';
import { Star } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button 
            onClick={() => onQuickView(product)}
            className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-white transition-colors"
          >
            Quick View
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < Math.floor(product.rating)} />
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
        </div>
        
        <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
