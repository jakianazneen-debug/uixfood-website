import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Plus, Heart } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface FullMenuProps {
  onBack: () => void;
  categories: { id: string; name: string; icon: string }[];
  foodItems: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
  onFoodClick: (item: FoodItem) => void;
}

export function FullMenu({ onBack, categories, foodItems, onAddToCart, onFoodClick }: FullMenuProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-[#6366f1] font-medium transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Complete Menu</h1>
            <p className="text-gray-500 mt-2">Explore our wide variety of delicious dishes.</p>
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all bg-white shadow-sm" 
              placeholder="Search for food..." 
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 border shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-lg shadow-[#6366f1]/25'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#6366f1]/50 hover:text-[#6366f1]'
            }`}
          >
            <span>🍽️</span>
            <span>All Items</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 border shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-lg shadow-[#6366f1]/25'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#6366f1]/50 hover:text-[#6366f1]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Food Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#6366f1]/30 hover:shadow-xl hover:shadow-[#6366f1]/10 transition-all duration-300 cursor-pointer"
                onClick={() => onFoodClick(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Add to wishlist logic */ }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                    <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 leading-tight group-hover:text-[#6366f1] transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">Delicious {item.category} prepared with fresh ingredients and perfect seasoning.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-[#6366f1]">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="w-10 h-10 bg-[#6366f1]/10 text-[#6366f1] rounded-full flex items-center justify-center hover:bg-[#6366f1] hover:text-white transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No food items found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
