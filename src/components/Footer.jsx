import React from 'react';
import { BrandLogo } from './BrandLogo.jsx';
import { useApp } from '../context/AppContext.jsx';
import { Sparkles, Heart, MapPin, ShieldCheck, Truck, Lock, CreditCard } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setSelectedCategoryFilter, setIsAiModalOpen } = useApp();

  const handleNavCategory = (cat) => {
    setSelectedCategoryFilter(cat);
    setActiveTab('shop');
  };

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] text-stone-300 border-t border-black mt-16">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-white/10 py-6 px-4 sm:px-8 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">100% Genuine Steatite</h5>
              <p className="text-stone-400 text-[11px]">Direct Tabaka Quarry Certificate</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Insured Global Courier</h5>
              <p className="text-stone-400 text-[11px]">DHL Express & Local Kenya Transit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Lipa Na M-Pesa & Escrow</h5>
              <p className="text-stone-400 text-[11px]">Direct safe mobile checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <Heart className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">70% Carver Wage Pledge</h5>
              <p className="text-stone-400 text-[11px]">Fair trade community co-op</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Kisii Heritage is the definitive marketplace for authentic hand-chiseled African soapstone sculptures, geometric bowls, and fine paintings, backed by the LifeHub AI intentional planning engine.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Tabaka Quarries, Kisii County, Kenya</span>
            </div>
          </div>

          {/* E-Commerce Catalog Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Shop Collections
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNavCategory('Soapstone Carvings')} className="hover:text-white transition-colors cursor-pointer">
                  Soapstone Wildlife & Sculptures
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Bowls & Dishes')} className="hover:text-white transition-colors cursor-pointer">
                  Etched Ceremonial Bowls
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Chess & Games')} className="hover:text-white transition-colors cursor-pointer">
                  Tournament Soapstone Chess Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Paintings')} className="hover:text-white transition-colors cursor-pointer">
                  African Fine Oil Paintings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('custom_commission')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Custom AI Carving Studio</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Customer Portal
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('orders')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wishlist')} className="hover:text-white transition-colors cursor-pointer">
                  Saved Heirlooms
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('orders')} className="hover:text-white transition-colors cursor-pointer">
                  Order Receipts & Invoices
                </button>
              </li>
              <li>
                <span className="text-stone-500 font-mono text-[11px]">Care: support@kisiiheritage.co.ke</span>
              </li>
            </ul>
          </div>

          {/* LifeHub AI Systems Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              LifeHub AI Systems
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('ai_planner')} className="hover:text-white transition-colors cursor-pointer">
                  Intelligent Plan Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('goals')} className="hover:text-white transition-colors cursor-pointer">
                  Savings & Laptop Goal Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schedule')} className="hover:text-white transition-colors cursor-pointer">
                  Weekly Habit & University Calendar
                </button>
              </li>
              <li>
                <button onClick={() => setIsAiModalOpen(true)} className="hover:text-white transition-colors cursor-pointer text-amber-400">
                  Structured AI Consultation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Kisii Heritage Artisan Collective. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Lipa Na M-Pesa</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Visa</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">DHL Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
