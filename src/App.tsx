import { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Star, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Menu,
  X,
  Heart,
  Award,
  UtensilsCrossed
} from 'lucide-react';
import { FoodDetailsModal } from './components/FoodDetailsModal';
import { AccountModal } from './components/AccountModal';
import { FullMenu } from './components/FullMenu';
import { CartDrawer } from './components/CartDrawer';
import { PlayCircle } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

const categories = [
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'soup', name: 'Soup', icon: '🍲' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'seafood', name: 'Seafood', icon: '🦐' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'grill', name: 'Grill', icon: '🥩' },
  { id: 'accompaniment', name: 'Accompaniment', icon: '🥖' },
];

const foodItems: FoodItem[] = [
  // Salads
  { id: 1, name: 'Caesar Salad', price: 12.50, rating: 4.8, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', category: 'salads' },
  { id: 2, name: 'Greek Salad', price: 11.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', category: 'salads' },
  { id: 3, name: 'Garden Salad', price: 9.50, rating: 4.5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', category: 'salads' },
  { id: 4, name: 'Cobb Salad', price: 14.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400', category: 'salads' },
  // Soup
  { id: 5, name: 'Tomato Soup', price: 7.50, rating: 4.6, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'soup' },
  { id: 6, name: 'Mushroom Soup', price: 8.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'soup' },
  { id: 7, name: 'Chicken Soup', price: 9.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'soup' },
  { id: 8, name: 'Seafood Soup', price: 12.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'soup' },
  // Pasta
  { id: 9, name: 'Spaghetti Carbonara', price: 15.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', category: 'pasta' },
  { id: 10, name: 'Fettuccine Alfredo', price: 14.50, rating: 4.7, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400', category: 'pasta' },
  { id: 11, name: 'Penne Arrabbiata', price: 13.00, rating: 4.6, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', category: 'pasta' },
  { id: 12, name: 'Lasagna', price: 16.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1574868235872-1663edcb4569?w=400', category: 'pasta' },
  // Pizza
  { id: 13, name: 'Margherita Pizza', price: 14.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', category: 'pizza' },
  { id: 14, name: 'Pepperoni Pizza', price: 16.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', category: 'pizza' },
  { id: 15, name: 'BBQ Chicken Pizza', price: 17.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', category: 'pizza' },
  { id: 16, name: 'Vegetarian Pizza', price: 15.00, rating: 4.6, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400', category: 'pizza' },
  // Seafood
  { id: 17, name: 'Grilled Salmon', price: 22.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', category: 'seafood' },
  { id: 18, name: 'Shrimp Scampi', price: 19.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', category: 'seafood' },
  { id: 19, name: 'Fish & Chips', price: 16.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400', category: 'seafood' },
  { id: 20, name: 'Lobster Tail', price: 32.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1553163147-621957516919?w=400', category: 'seafood' },
  // Desserts
  { id: 21, name: 'Tiramisu', price: 8.50, rating: 4.9, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', category: 'desserts' },
  { id: 22, name: 'Chocolate Cake', price: 9.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', category: 'desserts' },
  { id: 23, name: 'Cheesecake', price: 8.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400', category: 'desserts' },
  { id: 24, name: 'Ice Cream Sundae', price: 7.50, rating: 4.6, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', category: 'desserts' },
  // Grill
  { id: 25, name: 'Ribeye Steak', price: 28.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400', category: 'grill' },
  { id: 26, name: 'BBQ Ribs', price: 24.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', category: 'grill' },
  { id: 27, name: 'Grilled Chicken', price: 18.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', category: 'grill' },
  { id: 28, name: 'Lamb Chops', price: 26.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400', category: 'grill' },
  // Accompaniment
  { id: 29, name: 'Garlic Bread', price: 5.00, rating: 4.6, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400', category: 'accompaniment' },
  { id: 30, name: 'French Fries', price: 4.50, rating: 4.5, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', category: 'accompaniment' },
  { id: 31, name: 'Mashed Potatoes', price: 5.50, rating: 4.7, image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400', category: 'accompaniment' },
  { id: 32, name: 'Steamed Vegetables', price: 6.00, rating: 4.4, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', category: 'accompaniment' },
];

const chefs = [
  { name: 'Dianne Russell', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1583394293214-28ez8ac94e4a?w=400' },
  { name: 'Guy Hawkins', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400' },
  { name: 'Ronald Richards', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400' },
];

const testimonials = [
  { name: 'Sarah Johnson', text: 'The best restaurant experience I\'ve ever had! The food was absolutely delicious.', rating: 5 },
  { name: 'Michael Chen', text: 'Amazing flavors and excellent service. Will definitely come back!', rating: 5 },
  { name: 'Emily Davis', text: 'Perfect place for family dinners. The kids loved it too!', rating: 4 },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('salads');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // New States
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeCartItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = foodItems.filter(item => item.category === activeCategory);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredItems.length));
  };

  useEffect(() => {
    setVisibleCount(4);
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  if (showFullMenu) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        {/* Simplified Nav for Full Menu */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowFullMenu(false)}>
                <div className="w-8 h-8 bg-[#ea4235] rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">UIXSHUVO</span>
              </div>
              <button onClick={() => setIsCartOpen(true)} className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ea4235] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        <FullMenu 
          onBack={() => setShowFullMenu(false)} 
          categories={categories}
          foodItems={foodItems}
          onAddToCart={addToCart}
          onFoodClick={setSelectedFood}
        />

        <FoodDetailsModal 
          item={selectedFood}
          isOpen={selectedFood !== null}
          onClose={() => setSelectedFood(null)}
          onAddToCart={addToCart}
        />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeCartItem}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Modals */}
      <FoodDetailsModal 
        item={selectedFood}
        isOpen={selectedFood !== null}
        onClose={() => setSelectedFood(null)}
        onAddToCart={addToCart}
      />
      <AccountModal 
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ea4235] rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UIXSHUVO</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Our Menu', 'About Us', 'Contact Us'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index === 0 ? 'home' : index === 1 ? 'menu' : index === 2 ? 'about' : 'contact')}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    index === 0 
                      ? 'bg-[#ea4235] text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ea4235] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
              >
                <User className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              {['Home', 'Our Menu', 'About Us', 'Contact Us'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index === 0 ? 'home' : index === 1 ? 'menu' : index === 2 ? 'about' : 'contact')}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    index === 0 
                      ? 'bg-[#ea4235] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="w-8 h-[2px] bg-[#ea4235]"></span>
                <span className="tracking-[0.2em] uppercase text-xs font-bold text-[#ea4235]">( SOME BEYOND THE ORDINARY )</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight font-serif">
                Flavors that<br /> speak louder<br /> than words!
              </h1>
              
              <p className="text-gray-500 text-base md:text-lg mb-10 max-w-lg leading-relaxed font-medium">
                Creative and expressive way of conveying the idea that the taste and experience of the food at a particular restaurant are so exceptional, distinctive, and satisfying.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-16">
                <button className="px-8 py-3.5 bg-[#ea4235] text-white rounded-full font-bold hover:bg-[#d63a2e] transition-all shadow-xl shadow-[#ea4235]/30 hover:-translate-y-1 text-sm tracking-wide">
                  Order Now
                </button>
                <button className="flex items-center gap-3 text-gray-800 font-bold hover:text-[#ea4235] transition-colors group">
                  <PlayCircle className="w-12 h-12 text-[#ea4235] group-hover:scale-110 transition-transform" />
                  Order Process
                </button>
              </div>
              
              {/* Stats - Redesigned to match reference */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 w-full pt-10 border-t border-gray-200/50">
                {[
                  { number: '06', text: 'Achieved National and International awards' },
                  { number: '10', text: 'We have 10 International chef who give you best' },
                  { number: '20', text: 'We have 20 branches all over the world' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-4 text-left">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center bg-transparent shrink-0">
                      <span className="text-lg font-bold text-gray-900">{stat.number}</span>
                    </div>
                    <p className="text-xs text-gray-500 max-w-[140px] leading-relaxed font-medium">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Image - Clean & Authentic */}
            <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                {/* Main Image Container Without Weird Distortions */}
                <div className="relative z-10 animate-float-slow">
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop" 
                    alt="Delicious Pizza"
                    className="w-full h-auto object-cover rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white/50"
                    style={{ aspectRatio: '1/1' }}
                  />
                  {/* Subtle Basil Leaves around it */}
                  <img src="https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=100&auto=format&fit=crop" className="absolute -top-4 right-10 w-16 h-16 rounded-full object-cover shadow-lg opacity-90 animate-float delay-100" alt="Basil" />
                  <img src="https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=100&auto=format&fit=crop" className="absolute bottom-10 -left-6 w-20 h-20 rounded-full object-cover shadow-lg opacity-80 animate-float delay-300" alt="Basil" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#ea4235]/10 text-[#ea4235] rounded-full text-sm font-medium mb-4">
              Our Menu
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Our Best Sellers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The flavors of the dishes are so rich, vibrant, and memorable that they leave a lasting impression on the diners.
            </p>
          </div>

          {/* Category Tabs - Fixed Design */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? 'bg-[#ea4235] text-white border-[#ea4235] shadow-lg shadow-[#ea4235]/25'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#ea4235]/50 hover:text-[#ea4235]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedFood(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#6366f1]/30 hover:shadow-xl hover:shadow-[#6366f1]/10 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                    <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#ea4235]">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="w-9 h-9 bg-[#ea4235] text-white rounded-full flex items-center justify-center hover:bg-[#d63a2e] transition-all shadow-md shadow-[#ea4235]/25 hover:shadow-lg hover:shadow-[#ea4235]/30 hover:-translate-y-0.5"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-10 text-center">
            {hasMore ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-[#ea4235] text-white rounded-full font-medium hover:bg-[#d63a2e] transition-all shadow-lg shadow-[#ea4235]/25 hover:shadow-xl hover:shadow-[#ea4235]/30"
                >
                  Load More
                </button>
                <button 
                  onClick={() => setShowFullMenu(true)}
                  className="px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  View Full Menu
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowFullMenu(true)}
                className="px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                View Full Menu
              </button>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 to-purple-500/10 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800" 
                alt="About Us"
                className="relative z-10 w-full h-auto rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#6366f1] rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">15+</p>
                    <p className="text-sm text-gray-500">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                We crafted delectable and flavorful food using organic ingredients.
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality starts with sourcing the finest organic ingredients from local farmers. Every dish is prepared with passion and attention to detail, ensuring an unforgettable dining experience.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: MapPin, text: '123 Restaurant St, City' },
                  { icon: Phone, text: '+1 234 567 890' },
                  { icon: Mail, text: 'hello@uixshuvo.com' },
                  { icon: Clock, text: 'Mon-Sun: 9AM - 10PM' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <item.icon className="w-5 h-5 text-[#6366f1]" />
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <button className="px-8 py-3.5 bg-[#6366f1] text-white rounded-full font-medium hover:bg-[#5558e0] transition-all shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Chefs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our talented team of culinary experts brings passion and creativity to every dish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={chef.image} 
                    alt={chef.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{chef.name}</h3>
                <p className="text-[#6366f1] font-medium">{chef.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#6366f1]/20 hover:shadow-lg hover:shadow-[#6366f1]/5 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                      fill="currentColor" 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-[#6366f1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Get the latest updates on new dishes, special offers, and events delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="px-8 py-3.5 bg-white text-[#6366f1] rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UIXSHUVO</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Experience the finest culinary delights crafted with passion and the freshest ingredients.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6366f1] transition-all"
                  >
                    <span className="text-xs capitalize">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Our Menu', 'Contact Us', 'Book a Table'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#6366f1] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Categories</h4>
              <ul className="space-y-3">
                {['Salads', 'Soup', 'Pasta', 'Pizza', 'Seafood', 'Desserts'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-gray-400 hover:text-[#6366f1] transition-colors text-sm">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[#6366f1]" />
                  123 Restaurant St, New York
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-[#6366f1]" />
                  +1 234 567 890
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-[#6366f1]" />
                  hello@uixshuvo.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 UIXSHUVO. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#6366f1] transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#6366f1] transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
