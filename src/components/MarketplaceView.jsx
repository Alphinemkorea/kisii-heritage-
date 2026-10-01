import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  ShoppingBag,
  Sparkles,
  Star,
  MapPin,
  Heart,
  Eye,
  Filter,
  Flame,
  Truck,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowRight,
  Search,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const MarketplaceView = () => {
  const {
    products,
    artisans,
    addToCart,
    formatMoney,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setActiveTab,
    setIsAiModalOpen
  } = useApp();

  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [activeCollectionTab, setActiveCollectionTab] = useState('all');

  const categories = [
    'All',
    'Soapstone Carvings',
    'Bowls & Dishes',
    'Chess & Games',
    'Paintings',
    'African Clothing'
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategoryFilter !== 'All' && product.category !== selectedCategoryFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchArtisan = product.artisanName.toLowerCase().includes(q);
        const matchOrigin = product.origin.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchTags = (product.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchArtisan && !matchOrigin && !matchCategory && !matchTags) {
          return false;
        }
      }
      // Price filter
      if (product.priceKSh > maxPrice) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Collection tabs
      if (activeCollectionTab === 'bestsellers' && !product.isBestSeller) return false;
      if (activeCollectionTab === 'new' && !product.isNewArrival) return false;
      if (activeCollectionTab === 'under5k' && product.priceKSh > 5000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.priceKSh - b.priceKSh;
      if (sortBy === 'price_high') return b.priceKSh - a.priceKSh;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategoryFilter, searchQuery, maxPrice, onlyInStock, activeCollectionTab, sortBy]);

  const featuredSpotlight = products.find(p => p.id === 'prod-6') || products[0];

  return (
    <div id="marketplace-storefront-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. EDITORIAL HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-[#1A1A1A] text-white shadow-xl">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1600&q=80"
            alt="African Art & Soapstone Sculptures"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Tabaka Quarry Artisans • Fair Trade</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight font-bold tracking-tight text-white">
            Authentic African Art & Hand-Chiseled Soapstone Heirlooms
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
            Every sculpture, geometric bowl, and tournament chess set is individually quarried from the hills of Tabaka in Kisii, hand-carved with generational iron rasps, and polished with organic beeswax.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                const catalogEl = document.getElementById('product-catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-[#1A1A1A] font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-stone-200 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
              <span>Shop All Artifacts</span>
            </button>

            <button
              onClick={() => setActiveTab('custom_commission')}
              className="px-6 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Commission Custom Piece</span>
            </button>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs text-stone-300 font-mono">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free Delivery &gt; KSh 5,000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Steatite</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ethical Fair Trade</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tabaka, Kisii Direct</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BENTO SHOWCASE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
              Explore by Craft & Medium
            </h2>
          </div>
          <span className="text-xs text-[#1A1A1A]/60 font-mono hidden sm:inline">
            Direct from Kisii Master Carvers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setSelectedCategoryFilter('Soapstone Carvings')}
            className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-xs border border-[#1A1A1A]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
              alt="Soapstone Carvings"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">Heirloom Sculptures</span>
              <h3 className="font-serif font-bold text-xl">Soapstone Carvings</h3>
              <p className="text-xs text-white/70">Big Five, Elephants & Abstract Totems</p>
            </div>
          </div>

          <div
            onClick={() => setSelectedCategoryFilter('Bowls & Dishes')}
            className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-xs border border-[#1A1A1A]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
              alt="Bowls & Dishes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">Hand-Etched</span>
              <h3 className="font-serif font-bold text-xl">Bowls & Tableware</h3>
              <p className="text-xs text-white/70">Ceremonial Dishes & Pink Steatite</p>
            </div>
          </div>

          <div
            onClick={() => setSelectedCategoryFilter('Chess & Games')}
            className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-xs border border-[#1A1A1A]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80"
              alt="Chess & Games"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">Collectors Edition</span>
              <h3 className="font-serif font-bold text-xl">Chess Sets</h3>
              <p className="text-xs text-white/70">32-Piece Hand-Carved Stone Sets</p>
            </div>
          </div>

          <div
            onClick={() => setSelectedCategoryFilter('Paintings')}
            className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-xs border border-[#1A1A1A]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80"
              alt="Paintings"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">Original Canvas</span>
              <h3 className="font-serif font-bold text-xl">Fine Paintings</h3>
              <p className="text-xs text-white/70">Savannah Twilight & Acacia Oils</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPOTLIGHT MASTERPIECE */}
      {featuredSpotlight && (
        <section className="bg-[#F7F3EE] rounded-3xl p-6 sm:p-10 border border-[#1A1A1A]/10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest rounded-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Masterpiece of the Month</span>
                </span>
                <span className="text-xs font-mono text-[#1A1A1A]/60">Tabaka Quarry Original</span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1A1A] leading-tight">
                {featuredSpotlight.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed">
                {featuredSpotlight.description}
              </p>

              <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A]/60 font-mono">Master Artisan:</span>
                  <span className="font-bold text-[#1A1A1A]">{featuredSpotlight.artisanName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A]/60 font-mono">Carving Time:</span>
                  <span className="font-bold text-[#1A1A1A]">18 Hours of Hand-Chiseling</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A]/60 font-mono">Material:</span>
                  <span className="font-bold text-[#1A1A1A]">{featuredSpotlight.material}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-[#1A1A1A]/50 uppercase font-mono block">Valuation</span>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                    {formatMoney(featuredSpotlight.priceKSh)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(featuredSpotlight)}
                  className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-2xl hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => setQuickViewProduct(featuredSpotlight)}
                  className="p-3 bg-white text-[#1A1A1A] rounded-2xl border border-[#1A1A1A]/20 hover:bg-[#F7F3EE] transition-all cursor-pointer shadow-xs"
                  title="Inspect Masterpiece"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md border border-[#1A1A1A]/10 bg-white">
                <img
                  src={featuredSpotlight.image}
                  alt={featuredSpotlight.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN PRODUCT CATALOG & FILTER SYSTEM */}
      <section id="product-catalog-section" className="space-y-6 pt-4">
        {/* Collection Sub-Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCollectionTab('all')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeCollectionTab === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => setActiveCollectionTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeCollectionTab === 'bestsellers'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Sellers</span>
            </button>
            <button
              onClick={() => setActiveCollectionTab('new')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeCollectionTab === 'new'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
              }`}
            >
              New Quarry Releases
            </button>
            <button
              onClick={() => setActiveCollectionTab('under5k')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeCollectionTab === 'under5k'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
              }`}
            >
              Under KSh 5,000
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white rounded-xl border border-[#1A1A1A]/20 text-xs font-mono uppercase tracking-wider outline-hidden cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#F7F3EE] text-[#1A1A1A]/80 hover:bg-stone-200 border border-[#1A1A1A]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter & Search Indicator */}
        <div className="flex justify-between items-center text-xs text-[#1A1A1A]/60 font-mono">
          <span>Showing {filteredProducts.length} authentic handcrafted artifacts</span>
          {searchQuery && (
            <span className="text-amber-800 font-bold">
              Filtering for "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 text-rose-600 underline cursor-pointer"
              >
                Clear
              </button>
            </span>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#1A1A1A]/10 space-y-3">
            <p className="font-serif font-bold text-lg text-[#1A1A1A]">No artifacts match your current filter</p>
            <p className="text-xs text-[#1A1A1A]/60">Try clearing search or picking another category.</p>
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                setSearchQuery('');
                setActiveCollectionTab('all');
              }}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#1A1A1A]/10 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-[#F7F3EE]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Stack */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isBestSeller && (
                        <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#1A1A1A] text-white rounded-md uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Flame className="w-2.5 h-2.5 text-amber-400" />
                          <span>Best Seller</span>
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="px-2.5 py-0.5 text-[9px] font-bold bg-amber-500 text-stone-950 rounded-md uppercase tracking-wider shadow-xs">
                          New Release
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 text-[9px] font-bold bg-white/90 text-[#1A1A1A] rounded-md uppercase tracking-wider border border-[#1A1A1A]/10 backdrop-blur-xs">
                        {product.category}
                      </span>
                    </div>

                    {/* Top Right Action Icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
                          isWishlisted ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-white/90 text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/10'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-full shadow-md backdrop-blur-xs transition-colors cursor-pointer border border-[#1A1A1A]/10"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#1A1A1A]/50" />
                          {product.origin}
                        </span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {product.rating}
                        </span>
                      </div>

                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-serif font-bold text-base text-[#1A1A1A] hover:text-amber-700 cursor-pointer line-clamp-1 transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <p className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-wider font-mono">
                        Master: <strong className="text-[#1A1A1A]">{product.artisanName}</strong>
                      </p>
                    </div>

                    {/* Pricing & Add to Cart */}
                    <div className="pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                      <div>
                        <span className="font-serif font-bold text-base text-[#1A1A1A] block">
                          {formatMoney(product.priceKSh)}
                        </span>
                        {product.originalPriceKSh && (
                          <span className="text-[10px] text-stone-400 line-through font-mono">
                            {formatMoney(product.originalPriceKSh)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold text-[11px] uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. TABAKA ARTISANS GUILD */}
      <section className="bg-[#F7F3EE] rounded-3xl p-6 sm:p-10 border border-[#1A1A1A]/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
              Ancestral Carvers
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
              Meet the Tabaka Master Artisans
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-xl">
              100% Direct Fair Trade: 70% of every sale goes directly to the carver, 20% to community quarry restoration, and 10% to sustainable logistics.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('custom_commission')}
            className="px-5 py-2.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer self-start sm:self-auto"
          >
            Commission an Artisan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {artisans.map(artisan => (
            <div key={artisan.id} className="bg-white p-5 rounded-2xl border border-[#1A1A1A]/10 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A]/10"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">{artisan.name}</h4>
                  <p className="text-[10px] text-[#1A1A1A]/60 font-mono">{artisan.experienceYears} Years Chiseling</p>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-semibold text-[#1A1A1A] text-[11px]">{artisan.specialty}</p>
                <p className="text-[11px] text-[#1A1A1A]/60 line-clamp-3 leading-relaxed">{artisan.bio}</p>
              </div>

              <div className="pt-2 text-[10px] text-[#1A1A1A]/50 font-mono border-t border-[#1A1A1A]/5 flex items-center justify-between">
                <span>📍 {artisan.village}</span>
                <span>{artisan.workCount} Works Cataloged</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED COLLECTOR TESTIMONIALS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block">
            Collector Stories
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
            Treasured Across Kenya & Worldwide
          </h2>
          <p className="text-xs text-[#1A1A1A]/70">
            Over 2,400 soapstone sculptures safely delivered to collectors across Nairobi, London, New York, and Geneva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#1A1A1A]/10 shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {'★★★★★'}
            </div>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed italic">
              "The weight and tactile obsidian polish of the Elephant pair are incredible. You can feel the decades of mastery in every contour. Safely packed and arrived in Nairobi within 24 hours."
            </p>
            <div className="pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A]">Sarah Wanjiku</span>
              <span className="text-[#1A1A1A]/50">Nairobi, Kenya</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#1A1A1A]/10 shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {'★★★★★'}
            </div>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed italic">
              "The Tabaka Soapstone Chess Set is the crown jewel of our study. The dual-tone dark and ivory stone pieces feel magnificent to play with. DHL shipping to Boston was seamless."
            </p>
            <div className="pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A]">Dr. Arthur Pendelton</span>
              <span className="text-[#1A1A1A]/50">Boston, USA</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#1A1A1A]/10 shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {'★★★★★'}
            </div>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed italic">
              "Mama Agnes's hand-etched pink soapstone bowl brings so much cultural warmth to our dining table. Knowing that 70% goes straight to the carvers makes it even more special."
            </p>
            <div className="pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1A1A1A]">Elena Rostova</span>
              <span className="text-[#1A1A1A]/50">Geneva, Switzerland</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER & VIP PROMO BANNER */}
      <section className="bg-[#F7F3EE] p-8 sm:p-12 rounded-3xl border border-[#1A1A1A]/10 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          Special Collector Welcome
        </span>
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
          Use Code <span className="underline font-mono text-amber-800">TABAKA10</span> for 10% Off Your First Artifact
        </h3>
        <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto">
          Plus receive notifications whenever new raw mineral veined stone is harvested in the Tabaka quarries.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              const catalogEl = document.getElementById('product-catalog-section');
              catalogEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-2xl hover:bg-stone-800 transition-all cursor-pointer shadow-md"
          >
            Claim 10% & Shop Catalog
          </button>
        </div>
      </section>
    </div>
  );
};
