import React from 'react';
import { X, Star, Heart, ShoppingBag, Clock, Flame, Info } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface FoodDetailsModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodDetailsModal({ item, isOpen, onClose, onAddToCart }: FoodDetailsModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md text-gray-800 rounded-full hover:bg-white transition-all z-10 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-xs font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              <Star className="w-3.5 h-3.5" fill="currentColor" />
              <span className="text-xs font-bold">{item.rating}</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
          <div className="text-2xl font-black text-[#6366f1] mb-6">${item.price.toFixed(2)}</div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Experience the delightful flavors of our freshly prepared {item.name.toLowerCase()}. 
            Made with premium, locally sourced ingredients to ensure the highest quality and taste in every bite. 
            A perfect choice for food lovers seeking an unforgettable culinary experience.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-[#6366f1] mb-2" />
              <span className="text-xs font-medium text-gray-500">Prep Time</span>
              <span className="text-sm font-bold text-gray-900">15-20 Min</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
              <Flame className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-xs font-medium text-gray-500">Calories</span>
              <span className="text-sm font-bold text-gray-900">320 kcal</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
              <Info className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-xs font-medium text-gray-500">Portion</span>
              <span className="text-sm font-bold text-gray-900">1 Person</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="w-full py-4 bg-[#6366f1] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#5558e0] transition-all shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart - ${item.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
