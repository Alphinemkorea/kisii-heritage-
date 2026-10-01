import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Hammer,
  Truck,
  ArrowRight,
  Info
} from 'lucide-react';

export const CustomCommissionStudio = () => {
  const {
    formatMoney,
    setIsAiModalOpen,
    addToCart,
    artisans
  } = useApp();

  const [theme, setTheme] = useState('African Wildlife Totem (Elephant & Lion Duo)');
  const [stoneType, setStoneType] = useState('Tabaka Charcoal & Obsidian Steatite');
  const [dimensions, setDimensions] = useState('Medium (30cm Height × 20cm Width, ~3.5kg)');
  const [engraving, setEngraving] = useState('Gusii Chevron Border + Family Monogram');
  const [selectedArtisanId, setSelectedArtisanId] = useState('art-1');
  const [estimatedCostKSh, setEstimatedCostKSh] = useState(12800);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateEstimate = (e) => {
    e.preventDefault();
    let base = 8000;
    if (dimensions.includes('Large')) base = 18500;
    if (dimensions.includes('Monumental')) base = 32000;
    if (dimensions.includes('Medium')) base = 12800;
    if (stoneType.includes('Rare')) base += 3500;
    if (engraving) base += 1500;

    setEstimatedCostKSh(base);
    setIsCalculated(true);
  };

  const handleOrderCustomArtifact = () => {
    const chosenArtisan = artisans.find(a => a.id === selectedArtisanId) || artisans[0];
    const customProduct = {
      id: `custom-art-${Date.now()}`,
      name: `Bespoke Commission: ${theme}`,
      category: 'Custom Commission',
      priceKSh: estimatedCostKSh,
      priceUSD: Math.round(estimatedCostKSh * 0.0077),
      description: `Bespoke hand-chiseled artifact crafted by ${chosenArtisan.name}. Stone: ${stoneType}. Specs: ${dimensions}. Engraving: "${engraving}".`,
      artisanName: chosenArtisan.name,
      origin: `Tabaka, Kisii (${chosenArtisan.village})`,
      dimensions: dimensions.split('(')[1]?.replace(')', '') || 'Custom Spec',
      material: stoneType,
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      inStock: true,
      featured: true,
      culturalStory: 'Custom artisan commission carved individually with generational Tabaka tools.'
    };

    addToCart(customProduct, 1);
  };

  return (
    <div id="custom-commission-studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <div className="bg-[#F7F3EE] rounded-3xl p-6 sm:p-10 border border-[#1A1A1A]/10 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold">
            Bespoke Artisan Studio • Tabaka Quarry Co-operative
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] leading-tight max-w-3xl">
          Commission a One-of-a-Kind Hand-Chiseled Soapstone Heirloom
        </h1>
        <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-2xl leading-relaxed">
          Collaborate directly with Tabaka master carvers. Describe your vision, select raw mineral-veined steatite from the Kisii quarries, and receive milestone photos of your piece being sculpted by hand.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Full AI Milestone & Budget Plan</span>
          </button>
        </div>
      </div>

      {/* Studio Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 7 Cols */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 shadow-xs space-y-6">
          <div className="border-b border-[#1A1A1A]/10 pb-4">
            <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">Sculpture & Artifact Parameters</h3>
            <p className="text-xs text-[#1A1A1A]/60 font-mono">Specify carving style, quarry stone, and dimensions</p>
          </div>

          <form onSubmit={calculateEstimate} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                Subject & Artistic Theme *
              </label>
              <input
                type="text"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-sm outline-hidden font-medium"
                placeholder="e.g. African Mother & Child Embrace, Pride of Lions, Abstract Chess Set"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                  Tabaka Stone Variety
                </label>
                <select
                  value={stoneType}
                  onChange={e => setStoneType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs outline-hidden"
                >
                  <option value="Tabaka Charcoal & Obsidian Steatite">Dense Charcoal & Obsidian Steatite</option>
                  <option value="Rare Pink & Amber Veined Soapstone">Rare Pink & Amber Veined Soapstone (+KSh 3,500)</option>
                  <option value="Ivory Cream Tabaka Steatite">Ivory Cream Tabaka Steatite</option>
                  <option value="Dual-Tone Contrasting Mineral Stone">Dual-Tone Contrasting Mineral Stone</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                  Dimensional Scale
                </label>
                <select
                  value={dimensions}
                  onChange={e => setDimensions(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-xs outline-hidden"
                >
                  <option value="Small (18cm Height, ~1.5kg)">Small Desktop (18cm, ~1.5kg) — KSh 8,000</option>
                  <option value="Medium (30cm Height × 20cm Width, ~3.5kg)">Medium Mantle (30cm, ~3.5kg) — KSh 12,800</option>
                  <option value="Large (45cm Height, ~7kg)">Large Gallery Centerpiece (45cm, ~7kg) — KSh 18,500</option>
                  <option value="Monumental Heirloom (60cm+ Height, ~15kg)">Monumental Heirloom (60cm+, ~15kg) — KSh 32,000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                Custom Hand-Etched Inscription or Crest
              </label>
              <input
                type="text"
                value={engraving}
                onChange={e => setEngraving(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 text-sm outline-hidden"
                placeholder="e.g. Wedding Date, Clan Crest, Traditional Gusii Blessings"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                Assigned Master Carver
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {artisans.map(art => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArtisanId(art.id)}
                    className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                      selectedArtisanId === art.id
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                        : 'border-[#1A1A1A]/10 bg-[#FDFBF7] text-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    <img src={art.avatar} alt={art.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-xs">{art.name}</h5>
                      <p className={`text-[10px] ${selectedArtisanId === art.id ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                        {art.experienceYears} yrs • {art.village}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-stone-800 transition-all cursor-pointer shadow-md"
            >
              Calculate Live Quarry Estimate
            </button>
          </form>
        </div>

        {/* Right Card: Quote Valuation & Escrow Deposit (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F7F3EE] p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Fair-Trade Valuation Summary
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1A1A1A] pt-2">
                {theme}
              </h3>
              <p className="text-xs text-[#1A1A1A]/60 font-mono">
                Stone: {stoneType}
              </p>
            </div>

            {/* Valuation Price */}
            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#1A1A1A]/60 font-mono">Estimated Total</span>
                <span className="font-serif font-bold text-3xl text-[#1A1A1A]">
                  {formatMoney(estimatedCostKSh)}
                </span>
              </div>
              <p className="text-[10px] text-[#1A1A1A]/50">
                Includes raw quarry stone harvesting, master chiseling (14-28 hours), beeswax buffing, and certified wooden crate packaging.
              </p>
            </div>

            {/* Milestone Breakdown */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                Commission Workflow:
              </h5>
              <div className="space-y-2 font-mono text-[11px] text-[#1A1A1A]/80">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Quarry block extraction & rough contour check</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>WhatsApp photo milestone approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Final organic wax buff & insured DHL dispatch</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrderCustomArtifact}
              className="w-full py-4 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Hammer className="w-4 h-4 text-amber-400" />
              <span>Book Commission & Add to Cart</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-800 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Escrow Protection Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
