import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Truck,
  CheckCircle2,
  Tag,
  Lock,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotalKSh,
    formatMoney,
    currency,
    placeOrder
  } = useApp();

  const [step, setStep] = useState('details');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('0712345678');
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  // Shipping form state
  const [formData, setFormData] = useState({
    fullName: 'Alex Omari',
    email: 'alex.omari@example.com',
    phone: '+254 712 345 678',
    address: 'Tabaka Road, Suneka Junction',
    city: 'Nairobi',
    country: 'Kenya',
    deliveryNotes: 'Please call before delivery'
  });

  if (!isCheckoutModalOpen) return null;

  const discountAmount = Math.round((cartTotalKSh * discountPercent) / 100);
  const shippingFeeKSh = cartTotalKSh > 5000 ? 0 : 450;
  const finalTotalKSh = Math.max(0, cartTotalKSh - discountAmount + shippingFeeKSh);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'TABAKA10') {
      setDiscountPercent(10);
    } else if (promoCode.trim().toUpperCase() === 'HERITAGE20') {
      setDiscountPercent(20);
    } else {
      setPromoError('Invalid coupon code. Try TABAKA10');
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === 'mpesa') {
      setMpesaPromptSent(true);
    }
    setStep('processing');

    setTimeout(() => {
      const order = placeOrder({
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country
        },
        paymentMethod
      });
      setCreatedOrderNumber(order.id);
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setStep('details');
    setMpesaPromptSent(false);
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#1A1A1A]/20 my-8">
        {/* Header */}
        <div className="p-6 bg-[#F7F3EE] border-b border-[#1A1A1A]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm">
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">Secure Checkout</h3>
              <p className="text-[11px] text-[#1A1A1A]/60 font-mono">
                Direct Tabaka Artisan Fair-Trade Escrow & Guarantee
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white text-[#1A1A1A] transition-colors cursor-pointer border border-[#1A1A1A]/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Order Summary Pill */}
              <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block">Cart Items</span>
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Artifacts in Order
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block">Est. Subtotal</span>
                  <span className="font-serif font-bold text-lg text-[#1A1A1A]">
                    {formatMoney(cartTotalKSh)}
                  </span>
                </div>
              </div>

              {/* Shipping Address Inputs */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>1. Delivery & Recipient Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                      Phone Number (M-Pesa / Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                      Town / City / County *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                    Street Address / Estate / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                    placeholder="e.g. House 14, Riverside Drive, Nairobi"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-1">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#1A1A1A]/20 text-sm focus:border-[#1A1A1A] outline-hidden"
                  >
                    <option value="Kenya">🇰🇪 Kenya (Courier Delivery in 24-48 hrs)</option>
                    <option value="United States">🇺🇸 United States (DHL Express 3-5 days)</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom (DHL Express 3-5 days)</option>
                    <option value="Canada">🇨🇦 Canada (DHL Express)</option>
                    <option value="Germany">🇩🇪 Germany (DHL Express)</option>
                    <option value="South Africa">🇿🇦 South Africa</option>
                  </select>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/10 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Coupon Code (e.g. TABAKA10)"
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#1A1A1A]/20 text-xs uppercase tracking-wider font-mono outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-stone-800 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Coupon applied: {discountPercent}% Off Total Order!</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600 font-medium">{promoError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>2. Select Payment Gateway</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'mpesa'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                        : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:bg-[#F7F3EE]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-2 text-emerald-400" />
                    <span className="font-bold text-xs block">Lipa Na M-Pesa</span>
                    <span className={`text-[10px] ${paymentMethod === 'mpesa' ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      Instant Kenyan STK Push
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                        : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:bg-[#F7F3EE]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-2 text-amber-400" />
                    <span className="font-bold text-xs block">Credit / Debit Card</span>
                    <span className={`text-[10px] ${paymentMethod === 'card' ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      Visa, Mastercard, Amex
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                        : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:bg-[#F7F3EE]'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 mb-2 text-sky-400" />
                    <span className="font-bold text-xs block">Direct Bank Escrow</span>
                    <span className={`text-[10px] ${paymentMethod === 'bank' ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                      Verified Tabaka Co-op
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Method Details */}
              {paymentMethod === 'mpesa' && (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                    <h5 className="font-bold text-xs uppercase tracking-wider">Lipa Na M-Pesa Online (STK Push)</h5>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Enter your Safaricom phone number. You will receive an instant PIN prompt on your handset to authorize {formatMoney(finalTotalKSh)}.
                  </p>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-emerald-900 mb-1">M-Pesa Number</label>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={e => setMpesaPhone(e.target.value)}
                      className="w-full px-4 py-2 bg-white rounded-xl border border-emerald-300 font-mono text-sm outline-hidden"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-5 bg-white rounded-2xl border border-[#1A1A1A]/10 space-y-3">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">Card Information</h5>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number (4000 1234 5678 9010)"
                      className="w-full px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 font-mono text-xs outline-hidden"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 font-mono text-xs outline-hidden"
                      />
                      <input
                        type="text"
                        placeholder="CVC / CVV"
                        className="px-4 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#1A1A1A]/20 font-mono text-xs outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-[#F7F3EE] rounded-2xl border border-[#1A1A1A]/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Artifact Subtotal</span>
                  <span>{formatMoney(cartTotalKSh)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatMoney(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Insured Courier Shipping</span>
                  <span>{shippingFeeKSh === 0 ? 'FREE (Orders > KSh 5,000)' : formatMoney(shippingFeeKSh)}</span>
                </div>
                <div className="pt-2 border-t border-[#1A1A1A]/10 flex justify-between font-serif font-bold text-base text-[#1A1A1A]">
                  <span>Grand Total</span>
                  <span>{formatMoney(finalTotalKSh)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-6 py-4 bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-[#F7F3EE] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pay {formatMoney(finalTotalKSh)} & Place Order</span>
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto animate-spin">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#1A1A1A]">Processing Your Order & Escrow</h4>
              <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto leading-relaxed">
                Contacting Safaricom M-Pesa & verifying artisan carving allocations in Tabaka... Please do not refresh.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <PackageCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Payment Verified & Dispatched to Tabaka
                </span>
                <h4 className="font-serif font-bold text-2xl text-[#1A1A1A]">
                  Asante Sana! Order Confirmed
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto leading-relaxed">
                  Your order <span className="font-mono font-bold text-[#1A1A1A]">{createdOrderNumber}</span> is now active. Master artisans at Tabaka Quarry have been notified and packaging is underway.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Order Number:</span>
                  <span className="font-bold">{createdOrderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Delivery Address:</span>
                  <span className="font-bold">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Estimated Arrival:</span>
                  <span className="font-bold text-emerald-700">2-3 Business Days</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-2xl hover:bg-stone-800 transition-all cursor-pointer shadow-md"
              >
                View Order Status & Tracking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
