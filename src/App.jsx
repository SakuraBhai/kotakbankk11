import React from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { DeviceFrame } from './components/DeviceFrame';
import { LockScreen } from './components/LockScreen';
import { Header } from './components/Header';
import { AccountCard } from './components/AccountCard';
import { QuickActions } from './components/QuickActions';
import { BannerSlider } from './components/BannerSlider';
import { RecentTransactions } from './components/RecentTransactions';
import { BottomNav } from './components/BottomNav';
import { TransferModal } from './components/TransferModal';
import { ScanPayModal } from './components/ScanPayModal';
import { CardsView } from './components/CardsView';
import { OverviewView } from './components/OverviewView';
import { PassbookView } from './components/PassbookView';
import { BillPayView } from './components/BillPayView';
import { InvestmentsView } from './components/InvestmentsView';
import { ReceiptModal } from './components/ReceiptModal';
import { AddMoneyModal } from './components/AddMoneyModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { NotificationModal } from './components/NotificationModal';
import { OffersModal } from './components/OffersModal';
import { StatementModal } from './components/StatementModal';

const AppContent = () => {
  const { isAuthenticated, activeTab } = useBank();

  if (!isAuthenticated) {
    return <LockScreen />;
  }

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-100 min-h-full h-full">
      {/* Top Header */}
      <Header />

      {/* Dynamic Main View based on Tab */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="space-y-1">
            <AccountCard />
            <QuickActions />
            <BannerSlider />
            <RecentTransactions />
          </div>
        )}

        {activeTab === 'pay' && (
          <div className="p-4 space-y-4 animate-fade-in max-w-lg mx-auto pb-20">
            <h2 className="text-base font-bold text-slate-900">Payments & Transfers Hub</h2>
            <QuickActions />
            <RecentTransactions />
          </div>
        )}

        {activeTab === 'cards' && <CardsView />}
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'passbook' && <PassbookView />}
        {activeTab === 'bills' && <BillPayView />}
        {activeTab === 'invest' && <InvestmentsView />}
      </div>

      {/* Floating Bottom Navigation */}
      <BottomNav />

      {/* Modals & Drawers */}
      <TransferModal />
      <ScanPayModal />
      <ReceiptModal />
      <AddMoneyModal />
      <ProfileDrawer />
      <NotificationModal />
      <OffersModal />
      <StatementModal />
    </div>
  );
};

export default function App() {
  return (
    <BankProvider>
      <DeviceFrame>
        <AppContent />
      </DeviceFrame>
    </BankProvider>
  );
}
