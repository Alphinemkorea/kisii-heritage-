import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalKSh,
    formatMoney,
    setIsCheckoutModalOpen
  } = useApp();

  if (!isCartOpen) return null;

  const shippingCost = cartTotalKSh > 5000 ? 0 : (cartTotalKSh > 0 ? 450 : 0);
  const total = cartTotalKSh + shippingCost;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#1A1A1A]/10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-black">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Artifact Shopping Bag
              </h3>
              <p className="text-[10px] text-stone-400 font-mono">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-2.5 bg-[#F7F3EE] border-b border-[#1A1A1A]/10 text-xs">
          {cartTotalKSh >= 5000 ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
            </span>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#1A1A1A]/70 font-mono">
                <span>Add {formatMoney(5000 - cartTotalKSh)} more for FREE Delivery</span>
                <span>{Math.round((cartTotalKSh / 5000) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartTotalKSh / 5000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Body Items */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4 text-[#1A1A1A]/40">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-stone-400" />
              <p className="text-sm font-semibold text-[#1A1A1A]">Your shopping bag is empty</p>
              <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto">
                Explore hand-carved soapstone wildlife, ceremonial bowls, and tournament chess sets in the store.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#1A1A1A]/10 shadow-xs flex gap-3.5 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#1A1A1A]/10"
                  />

                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif font-bold text-xs text-[#1A1A1A] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A] font-serif font-bold">
                      {formatMoney(item.product.priceKSh)}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-[#F7F3EE] hover:bg-stone-200 flex items-center justify-center text-xs text-[#1A1A1A] cursor-pointer font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-[#F7F3EE] hover:bg-stone-200 flex items-center justify-center text-xs text-[#1A1A1A] cursor-pointer font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-[#1A1A1A]/40 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#1A1A1A]/10 space-y-4 shadow-lg">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#1A1A1A]/70">
                <span>Artifacts Subtotal</span>
                <span className="font-bold text-[#1A1A1A] font-mono">{formatMoney(cartTotalKSh)}</span>
              </div>
              <div className="flex justify-between text-[#1A1A1A]/70">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#1A1A1A]/50" />
                  Shipping (Tabaka Direct)
                </span>
                <span className="font-bold text-[#1A1A1A] font-mono">
                  {shippingCost === 0 ? 'FREE' : formatMoney(shippingCost)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1A1A1A]/10 flex justify-between text-base">
                <span className="font-serif font-bold text-[#1A1A1A]">Estimated Total</span>
                <span className="font-serif font-bold text-xl text-[#1A1A1A]">{formatMoney(total)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <p className="text-[10px] text-center text-[#1A1A1A]/50 font-mono">
              🔒 Safe M-Pesa STK Push, Visa, Mastercard & Direct Co-op Escrow
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
