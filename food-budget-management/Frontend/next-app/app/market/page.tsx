"use client"
import { useState, useRef, useEffect } from 'react';
import { STORES } from '../../component/market/GroceryDummyData';
import StoreSidebar from '@/component/market/StoreSideBar';
import StoreHero from '@/component/market/StoreHero';
import Breadcrumb from '@/component/market/BreadCrumb';
import CategoryGrid from '@/component/market/CategoryGrid';
import ProductGrid from '@/component/market/ProductGrid';
import useProductAPI from '@/api/marketProducts_API/getProductAPI';

export default function GroceryPage() {
  const [activeStoreId, setActiveStoreId] = useState<string>('walmart');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const productPanelRef = useRef<HTMLDivElement>(null);

  const activeStore = STORES.find((s) => s.id === activeStoreId)!;
  const activeCategory = activeStore.categories.find((c) => c.id === activeCategoryId) ?? null;
  const products =  useProductAPI(activeCategoryId, activeStoreId);     

  // Switch store → reset selected category
  function handleSelectStore(storeId: string) {
    setActiveStoreId(storeId);
    setActiveCategoryId(null);
  }

  // Toggle category: click same → deselect
  function handleSelectCategory(categoryId: string) {
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
  }

  // Scroll product panel into view when a category is selected
  useEffect(() => {
    if (activeCategoryId && productPanelRef.current) {
      productPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeCategoryId]);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#0e1210', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <header className="flex items-center gap-3 px-7 py-[18px] bg-[#141a15] border-b border-[#2a3a2b] flex-shrink-0">
        {/* Logo */}
        <div className="w-8 h-8 bg-[#3d7a4a] rounded-lg flex items-center justify-center flex-shrink-0">
          <div
            className="w-[18px] h-[18px] bg-[#7ec98a]"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>
        <span
          className="text-[18px] font-extrabold tracking-tight text-[#e8ede9]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          basket<span className="text-[#7ec98a]">wise</span>
        </span>

        {/* Breadcrumb pushed to right */}
        <div className="ml-auto">
          <Breadcrumb
            storeName={activeStore.name}
            categoryName={activeCategory?.name}
          />
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <StoreSidebar
          stores={STORES}
          activeStoreId={activeStoreId}
          onSelectStore={handleSelectStore}
        />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto bg-[#0e1210]">
          {/* Store hero */}
          <StoreHero store={activeStore} />

          {/* Categories */}
          <CategoryGrid
            categories={activeStore.categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
          />

          {/* Products panel — only rendered when a category is active */}
          {activeCategory && (
            <div ref={productPanelRef}>
              <ProductGrid
                category={activeCategory}
                products={products}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}