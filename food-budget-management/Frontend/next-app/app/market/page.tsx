// app/grocery/page.tsx
"use client"
import { useState, useRef, useEffect } from 'react';
import { STORES } from '../../component/market/GroceryDummyData';
import StoreSidebar from '@/component/market/StoreSideBar';
import StoreHero from '@/component/market/StoreHero';
import CategoryGrid from '@/component/market/CategoryGrid';
import ProductGrid from '@/component/market/ProductGrid';
import useProductAPI from '@/api/marketProducts_API/getProductAPI';

export default function GroceryPage() {
  const [activeStoreId, setActiveStoreId] = useState<string>('walmart');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const productPanelRef = useRef<HTMLDivElement>(null);

  const activeStore = STORES.find((s) => s.id === activeStoreId)!;
  const activeCategory = activeStore.categories.find((c) => c.id === activeCategoryId) ?? null;
  const products = useProductAPI(activeCategoryId, activeStoreId);

  function handleSelectStore(storeId: string) {
    setActiveStoreId(storeId);
    setActiveCategoryId(null);
  }

  async function handleSelectCategory(categoryId: string) {
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
  }

  useEffect(() => {
    if (activeCategoryId && productPanelRef.current) {
      productPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeCategoryId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header với thiết kế mới */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur-lg opacity-50"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Fresh<span className="text-amber-400">Market</span>
          </span>
        </div>

        {/* Breadcrumb mới */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
          <span className="text-sm text-white/60">{activeStore.name}</span>
          {activeCategory && (
            <>
              <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm text-amber-400">{activeCategory.name}</span>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <StoreSidebar stores={STORES} activeStoreId={activeStoreId} onSelectStore={handleSelectStore} />
        
        <main className="flex-1 overflow-y-auto">
          <StoreHero store={activeStore} />
          <CategoryGrid
            categories={activeStore.categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            products={products}
          />
          {activeCategory && (
            <div ref={productPanelRef}>
              <ProductGrid category={activeCategory} products={products} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}