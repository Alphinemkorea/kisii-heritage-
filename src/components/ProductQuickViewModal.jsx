import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
  MessageSquarePlus,
  Flame
} from 'lucide-react';

export const ProductQuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatMoney,
    wishlist,
    toggleWishlist,
    setIsCheckoutModalOpen,
    addProductReview
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!quickViewProduct) return null;

  const images = [
    quickViewProduct.image,
    ...(quickViewProduct.additionalImages || [])
  ];

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setIsCheckoutModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    addProductReview(quickViewProduct.id, reviewAuthor, reviewRating, reviewComment);
    setReviewAuthor('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div id="product-quick-view-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#1A1A1A]/20 my-6">
        {/* Top bar with quick close */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#F7F3EE] border-b border-[#1A1A1A]/10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#1A1A1A]/60 font-mono">
            <span>{quickViewProduct.category}</span>
            <span>•</span>
            <span className="text-[#1A1A1A] font-bold">Ref: {quickViewProduct.id}</span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 rounded-full hover:bg-white text-[#1A1A1A] transition-colors cursor-pointer border border-[#1A1A1A]/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Gallery View */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-[#F7F3EE] border border-[#1A1A1A]/10 shadow-xs">
              <img
                src={images[activeImgIndex] || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />

              {quickViewProduct.isBestSeller && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Best Seller</span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
                  isWishlisted ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-white/90 text-[#1A1A1A] hover:bg-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImgIndex === idx ? 'border-[#1A1A1A] ring-2 ring-amber-400' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges underneath photo */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#1A1A1A]/70">
              <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Express courier delivery</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified Tabaka Steatite</span>
              </div>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A]/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    {quickViewProduct.origin}
                  </span>
                  <span>•</span>
                  <span>By {quickViewProduct.artisanName}</span>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] leading-tight">
                  {quickViewProduct.name}
                </h2>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-amber-500' : 'text-stone-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-xs text-[#1A1A1A]">{quickViewProduct.rating}</span>
                  <span className="text-xs text-[#1A1A1A]/50 font-mono">
                    ({quickViewProduct.reviewCount || (quickViewProduct.reviews?.length || 0)} collector reviews)
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block font-mono">
                    Authentic Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                      {formatMoney(quickViewProduct.priceKSh)}
                    </span>
                    {quickViewProduct.originalPriceKSh && (
                      <span className="text-xs text-stone-400 line-through font-mono">
                        {formatMoney(quickViewProduct.originalPriceKSh)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {quickViewProduct.inStock ? 'In Stock (Ready to Ship)' : 'Made to Order'}
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[#1A1A1A]/10 gap-4 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'overview' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'details' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'story' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  Cultural Lore
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'reviews' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                  }`}
                >
                  Reviews ({quickViewProduct.reviews?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-[#1A1A1A]/80 leading-relaxed min-h-[100px]">
                {activeTab === 'overview' && (
                  <p>{quickViewProduct.description}</p>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Dimensions</span>
                      <span className="font-bold text-[#1A1A1A]">{quickViewProduct.dimensions || 'Variable / Handmade'}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Material</span>
                      <span className="font-bold text-[#1A1A1A] truncate">{quickViewProduct.material}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Weight</span>
                      <span className="font-bold text-[#1A1A1A]">{quickViewProduct.weight || '1.8 kg'}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10">
                      <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block">Finishing</span>
                      <span className="font-bold text-[#1A1A1A]">Organic Beeswax Buff</span>
                    </div>
                  </div>
                )}

                {activeTab === 'story' && (
                  <div className="p-3 bg-[#F7F3EE] rounded-xl border border-[#1A1A1A]/10 space-y-1">
                    <span className="font-serif italic font-bold text-[#1A1A1A] block">Generational Significance</span>
                    <p>{quickViewProduct.culturalStory}</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#1A1A1A]">Verified Collector Opinions</span>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-[10px] uppercase font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>Write a Review</span>
                      </button>
                    </div>

                    {showReviewForm && (
                      <form onSubmit={handleReviewSubmit} className="p-3 bg-white rounded-xl border border-[#1A1A1A]/10 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={reviewAuthor}
                            onChange={e => setReviewAuthor(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/20 text-xs outline-hidden"
                          />
                          <select
                            value={reviewRating}
                            onChange={e => setReviewRating(Number(e.target.value))}
                            className="px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/20 text-xs outline-hidden"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5/5 Outstanding)</option>
                            <option value={4}>⭐⭐⭐⭐ (4/5 Great)</option>
                            <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                          </select>
                        </div>
                        <textarea
                          placeholder="Your review of this artifact's quality, texture, and delivery..."
                          rows={2}
                          required
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/20 text-xs outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold rounded-lg cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}

                    {(quickViewProduct.reviews && quickViewProduct.reviews.length > 0) ? (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {quickViewProduct.reviews.map(r => (
                          <div key={r.id} className="p-2.5 bg-white rounded-xl border border-[#1A1A1A]/10 space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="font-bold text-[#1A1A1A]">{r.author} ({r.location})</span>
                              <span className="text-amber-500">{'★'.repeat(r.rating)}</span>
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/80">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#1A1A1A]/50 italic">
                        Be the first collector to review this hand-chiseled piece!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & CTA Cluster */}
            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#1A1A1A]/20 rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 font-bold text-sm hover:text-amber-600 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 font-bold text-sm hover:text-amber-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-[0.2em] rounded-xl cursor-pointer shadow-md transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
