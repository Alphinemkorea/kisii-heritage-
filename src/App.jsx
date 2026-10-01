/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { TodayView } from './components/TodayView.jsx';
import { AIPlannerView } from './components/AIPlannerView.jsx';
import { GoalsView } from './components/GoalsView.jsx';
import { MarketplaceView } from './components/MarketplaceView.jsx';
import { OrdersView } from './components/OrdersView.jsx';
import { WishlistView } from './components/WishlistView.jsx';
import { CustomCommissionStudio } from './components/CustomCommissionStudio.jsx';
import { ScheduleHabitsView } from './components/ScheduleHabitsView.jsx';
import { AIPlannerModal } from './components/AIPlannerModal.jsx';
import { AIImportModal } from './components/AIImportModal.jsx';
import { LifeProfileModal } from './components/LifeProfileModal.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { ProductQuickViewModal } from './components/ProductQuickViewModal.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { Footer } from './components/Footer.jsx';

const AppContent = () => {
  const {
    activeTab,
    isAiModalOpen,
    setIsAiModalOpen,
    isImportModalOpen,
    setIsImportModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top E-Commerce Header */}
      <Navbar />

      {/* Main App Body with Dynamic Routing */}
      <main className="flex-1">
        {(activeTab === 'shop' || activeTab === 'marketplace') && <MarketplaceView />}
        {activeTab === 'custom_commission' && <CustomCommissionStudio />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'wishlist' && <WishlistView />}
        {activeTab === 'ai_planner' && <AIPlannerView />}
        {activeTab === 'goals' && <GoalsView />}
        {activeTab === 'today' && <TodayView />}
        {activeTab === 'schedule' && <ScheduleHabitsView />}
      </main>

      {/* Global E-Commerce Modals & Overlays */}
      <ProductQuickViewModal />
      <CheckoutModal />
      <CartDrawer />

      {/* LifeHub AI Systems Modals */}
      <AIPlannerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <AIImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <LifeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Luxury E-Commerce & Craft Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
