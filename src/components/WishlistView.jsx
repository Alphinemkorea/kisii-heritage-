import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  Eye,
  Star
} from 'lucide-react';

export const WishlistView = () => {
  const {
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    formatMoney,
    setQuickViewProduct,
    setActiveTab
  } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div id="wishlist-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
            Curated Favorites
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
            Your Saved Heirlooms ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Hand-chiseled Tabaka pieces and African fine art saved to your collection.
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={() => {
              wishlistedProducts.forEach(p => addToCart(p, 1));
            }}
            className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-xs cursor-pointer flex items-center gap-2 self-start sm:self-auto"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Add All to Cart</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#1A1A1A]/10 space-y-4 p-8">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EE] text-[#1A1A1A] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto">
            Browse our authentic African artifacts and click the heart icon on any masterpiece to save it here.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-stone-800 cursor-pointer shadow-md"
          >
            Explore Heirlooms
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#1A1A1A]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-[#F7F3EE]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2.5 bg-white text-rose-600 rounded-full shadow-md cursor-pointer border border-[#1A1A1A]/10"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute top-3 left-3 p-2.5 bg-white/90 text-[#1A1A1A] rounded-full shadow-xs cursor-pointer border border-[#1A1A1A]/10"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60 font-mono">
                    <span>{product.origin}</span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A] line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <p className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-wider font-mono">
                    Artisan: <strong className="text-[#1A1A1A]">{product.artisanName}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#1A1A1A]/40 block uppercase font-mono">Price</span>
                    <span className="font-serif font-bold text-lg text-[#1A1A1A]">
                      {formatMoney(product.priceKSh)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold text-[11px] uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
