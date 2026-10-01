import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const OrdersView = () => {
  const {
    orders,
    formatMoney,
    setActiveTab
  } = useApp();

  return (
    <div id="orders-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold block mb-1">
            Account Portal
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
            Your Orders & Shipments
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Track hand-chiseled artifact progress directly from Tabaka Quarries to your delivery address.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('shop')}
          className="px-5 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-xs cursor-pointer self-start sm:self-auto flex items-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#1A1A1A]/10 space-y-4 p-8">
          <div className="w-16 h-16 rounded-full bg-[#F7F3EE] text-[#1A1A1A] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">No Orders Yet</h3>
          <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto">
            Explore our curated Tabaka soapstone sculptures, geometric bowls, and tournament chess sets.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-stone-800 cursor-pointer shadow-md"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#1A1A1A]/10 overflow-hidden shadow-xs space-y-0"
            >
              {/* Order Meta Bar */}
              <div className="p-6 bg-[#F7F3EE] border-b border-[#1A1A1A]/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#1A1A1A]">{order.id}</span>
                    <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{order.status.replace(/_/g, ' ')}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1A1A1A]/60 font-mono">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block font-mono">Tracking No</span>
                    <span className="font-mono font-bold text-xs text-[#1A1A1A]">{order.trackingNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 block font-mono">Total Paid</span>
                    <span className="font-serif font-bold text-base text-[#1A1A1A]">{formatMoney(order.totalKSh)}</span>
                  </div>
                </div>
              </div>

              {/* Order Progress Tracker */}
              <div className="p-6 border-b border-[#1A1A1A]/5 bg-[#FDFBF7]">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider block text-[#1A1A1A]">Order Paid</span>
                    <span className="text-[9px] text-[#1A1A1A]/50 font-mono">Verified Escrow</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider block text-[#1A1A1A]">Tabaka Quarry</span>
                    <span className="text-[9px] text-[#1A1A1A]/50 font-mono">Stone Shaping</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                      3
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider block text-[#1A1A1A]">In Transit</span>
                    <span className="text-[9px] text-[#1A1A1A]/50 font-mono">DHL Courier</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto text-xs font-bold">
                      4
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider block text-stone-400">Delivered</span>
                    <span className="text-[9px] text-stone-400 font-mono">Recipient Sign-off</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-4">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]/70">
                  Ordered Artifacts ({order.items.length})
                </h4>

                <div className="divide-y divide-[#1A1A1A]/5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#1A1A1A]/10"
                        />
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#1A1A1A]">{item.product.name}</h5>
                          <p className="text-[11px] text-[#1A1A1A]/60 font-mono">
                            By {item.product.artisanName} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-serif font-bold text-sm text-[#1A1A1A]">
                        {formatMoney(item.product.priceKSh * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-wrap justify-between items-center text-xs text-[#1A1A1A]/70 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>
                      Shipping to <strong className="text-[#1A1A1A]">{order.shippingAddress.fullName}</strong>, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Protected by Tabaka Fair-Trade Escrow</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
