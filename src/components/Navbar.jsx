import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { BrandLogo } from './BrandLogo.jsx';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  PackageCheck,
  Search,
  Truck,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  User,
  Target,
  Sun,
  Palette,
  Hammer
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    cart,
    cartTotalKSh,
    setIsCartOpen,
    setIsAiModalOpen,
    setIsProfileModalOpen,
    wishlist,
    orders,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    formatMoney,
    userProfile
  } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryNav = (cat) => {
    setSelectedCategoryFilter(cat);
    setActiveTab('shop');
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-xs">
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 sm:px-8 border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="hidden sm:inline text-amber-400 font-bold">✨ TABAKA DIRECT:</span>
            <span className="text-stone-300">
              Fair Trade Steatite Sculptures & African Fine Art • Free Delivery over KSh 5,000
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Currency selector */}
            <button
              id="currency-switch-btn"
              onClick={() => setCurrency(currency === 'KSh' ? 'USD' : 'KSh')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black transition-all cursor-pointer font-mono font-bold"
              title="Toggle Currency"
            >
              <span>{currency === 'KSh' ? '🇰🇪 KSh (KES)' : '🇺🇸 USD ($)'}</span>
            </button>

            <span className="text-white/20 hidden md:inline">|</span>

            {/* Quick Order Tracking link */}
            <button
              onClick={() => setActiveTab('orders')}
              className="hidden md:flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <PackageCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Orders ({orders.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND & SEARCH HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            className="cursor-pointer shrink-0"
            onClick={() => {
              setSelectedCategoryFilter('All');
              setActiveTab('shop');
            }}
          >
            <BrandLogo size="md" />
          </div>

          {/* Centered Search Bar with Instant Query */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'shop' && activeTab !== 'marketplace') {
                    setActiveTab('shop');
                  }
                }}
                placeholder="Search hand-chiseled sculptures, bowls, chess sets, master carvers..."
                className="w-full pl-11 pr-10 py-2.5 bg-white rounded-2xl border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] outline-hidden shadow-2xs transition-all font-sans"
              />
              <Search className="w-4 h-4 text-[#1A1A1A]/50 absolute left-4 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Icons: Wishlist, Orders, Bag, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Custom AI Commission CTA */}
            <button
              onClick={() => setActiveTab('custom_commission')}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-[#F7F3EE] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-[11px] uppercase tracking-wider font-bold rounded-xl border border-[#1A1A1A]/10 transition-all cursor-pointer shadow-2xs"
            >
              <Hammer className="w-3.5 h-3.5 text-amber-600" />
              <span>Custom Studio</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-btn"
              onClick={() => setActiveTab('wishlist')}
              className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]'
              }`}
              title="Saved Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Live Total */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-stone-800 text-white transition-all cursor-pointer shadow-xs"
              title="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-amber-400 text-stone-950 font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-[#1A1A1A]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-mono font-bold">
                {formatMoney(cartTotalKSh)}
              </span>
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-9 h-9 rounded-xl border border-[#1A1A1A]/20 bg-white flex items-center justify-center font-serif italic text-xs text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
              title="Customer Account & Profile"
            >
              {userProfile.name ? userProfile.name.charAt(0) : 'A'}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop' && activeTab !== 'marketplace') {
                  setActiveTab('shop');
                }
              }}
              placeholder="Search sculptures, bowls, chess sets..."
              className="w-full pl-9 pr-8 py-2 bg-white rounded-xl border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-hidden font-sans"
            />
            <Search className="w-3.5 h-3.5 text-[#1A1A1A]/50 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* 3. PRIMARY E-COMMERCE & LIFEHUB NAVIGATION BAR */}
      <div className="border-t border-[#1A1A1A]/10 bg-[#F7F3EE]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-2 gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handleCategoryNav('All')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                (activeTab === 'shop' || activeTab === 'marketplace') && selectedCategoryFilter === 'All'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => handleCategoryNav('Soapstone Carvings')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                (activeTab === 'shop' || activeTab === 'marketplace') && selectedCategoryFilter === 'Soapstone Carvings'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              Soapstone Sculptures
            </button>

            <button
              onClick={() => handleCategoryNav('Bowls & Dishes')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                (activeTab === 'shop' || activeTab === 'marketplace') && selectedCategoryFilter === 'Bowls & Dishes'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              Bowls & Dishes
            </button>

            <button
              onClick={() => handleCategoryNav('Chess & Games')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                (activeTab === 'shop' || activeTab === 'marketplace') && selectedCategoryFilter === 'Chess & Games'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              Chess & Games
            </button>

            <button
              onClick={() => handleCategoryNav('Paintings')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                (activeTab === 'shop' || activeTab === 'marketplace') && selectedCategoryFilter === 'Paintings'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              Fine Paintings
            </button>

            <button
              onClick={() => setActiveTab('custom_commission')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'custom_commission'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Bespoke Studio</span>
            </button>
          </div>

          {/* Right Section: LifeHub System Tools */}
          <div className="flex items-center gap-1 pl-4 border-l border-[#1A1A1A]/10">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'orders'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_planner')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'ai_planner'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>LifeHub AI</span>
            </button>

            <button
              onClick={() => setActiveTab('goals')}
              className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'goals'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Goals</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
