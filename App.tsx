
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { ShoppingCart, Menu, Search, X, Bot } from './components/Icons';
import ProductCard from './components/ProductCard';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback could be added here
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">L</div>
            LUMINA
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl flex-1 max-w-md mx-8">
            <Search className="w-5 h-5 ml-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-full py-2 px-3 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-3 py-2 rounded-xl hover:bg-blue-50 transition-all"
            >
              <Bot className="w-5 h-5" />
              <span className="hidden sm:inline">Ask Lumina</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-slate-700">
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            <Bot className="w-3 h-3" /> AI-Powered Discovery
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Curated Quality. <br />
            <span className="text-blue-500">Intelligently Selected.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mb-10 text-lg leading-relaxed">
            Experience the future of commerce. Our AI assistant Lumina helps you find exactly what you need from our collection of premium, sustainable goods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Start Personal Styling
            </button>
            <button className="bg-white/5 backdrop-blur text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10">
              Browse New Arrivals
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              {(['All', ...Object.values(Category)] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Showing <span className="text-slate-900">{filteredProducts.length}</span> results
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onQuickView={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">L</div>
              LUMINA
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed">
              We're redefining the shopping experience with intelligent curation and sustainable luxury. Join us in building a more thoughtful marketplace.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Lifestyle</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-4">
          <p className="text-slate-400 text-sm">© 2024 Lumina Commerce. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <span>Built with Gemini Flash</span>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Your Cart ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1 leading-tight">{item.name}</h4>
                        <p className="text-sm text-slate-500 mb-3">${item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-slate-50 transition-colors">-</button>
                            <span className="px-3 py-1 text-sm font-bold border-x border-slate-200">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-slate-50 transition-colors">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="font-bold">Your cart is empty</p>
                    <p className="text-sm">Add some amazing products to get started!</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] mt-1 tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-600/10 active:scale-95"
                >
                  Checkout Now
                </button>
                <button onClick={() => setIsCartOpen(false)} className="w-full text-slate-500 text-sm font-medium hover:underline">Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-sm"
            >
              <X />
            </button>
            <div className="md:w-1/2 bg-slate-100 h-64 md:h-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-black text-slate-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-2xl font-bold text-blue-600">${selectedProduct.price.toFixed(2)}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-slate-200'}>★</span>
                    ))}
                  </div>
                  <span>{selectedProduct.reviews} reviews</span>
                </div>
                <div className={`text-sm font-bold ${selectedProduct.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {selectedProduct.stock < 10 ? `Only ${selectedProduct.stock} left in stock!` : 'In Stock'}
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setIsCartOpen(true); }}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                  Free 2-day delivery & easy returns
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <AIChatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(!isChatOpen)} 
        onSelectProduct={(p) => { setSelectedProduct(p); setIsChatOpen(false); }}
      />
    </div>
  );
};

export default App;
