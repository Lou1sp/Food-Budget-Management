'use client';
import Header from '../component/home_page/Header';
import SideNavBar from '../component/home_page/SideNavBar';
import Hero_Section from '../component/home_page/Hero_Section';
import News_Board from '../component/home_page/Categories';
import StoryTelling from '../component/home_page/StoryTelling';
import MissionSection from '../component/home_page/MissionSection';
import PieChartByCategory from '@/component/budgetTracking/PieChartByCategory';
import Footer from '../component/home_page/Footer';
import LineChartHistory from '@/component/budgetTracking/LineChartHistory';
import DonutChartBudget from '@/component/budgetTracking/DonutChartBudget';
import BarChartByCategory from '@/component/budgetTracking/BarChartCompare';
import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';
const month = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { token } = useAuth();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  console.log(currentMonth);
  useEffect(() => {
    const id = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const isLoggedIn = token != null;

  return (
    <div className="bg-black min-h-screen relative">
      {/* Header & Sidebar */}
      <Header sideBarHandler={() => setSideBarState(!sideBarOpen)} />
      <div
        className={`sticky top-17 transform transition-transform duration-500 z-20 ${
          sideBarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <SideNavBar />
      </div>

      {/* Landing Page */}
      {isMounted && !isLoggedIn && (
        <div>
          <Hero_Section />
          <StoryTelling />
          <News_Board />
          <MissionSection />
          <Footer />
        </div>
      )}

      {/* Dashboard */}
      {isMounted && isLoggedIn && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Financial Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Track and analyze your spending patterns
            </p>
          </div>

          {/* Hero Chart: Spending History */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden relative">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative z-10 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Spending History
                  </h2>
                  <p className="text-emerald-100 text-sm">
                    Transaction timeline
                  </p>
                </div>
              </div>
              <div className="hidden md:block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-emerald-100 text-xs font-medium">
                  Last 30 days
                </p>
              </div>
            </div>
            <div className="p-0">
              <LineChartHistory />
            </div>
          </div>

          {/* Grid 3 Charts Below */}
          <div className="flex flex-wrap justify-center gap-10 mt-6">
            {/* Expense by Category */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden relative w-159 sm:w-120">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 flex items-center gap-3">
                <div className="relative z-10 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Expense by Category
                  </h2>
                  <p className="text-blue-100 text-xs">Category breakdown</p>
                </div>
              </div>
              <div className="p-0">
                <PieChartByCategory />
              </div>
            </div>

            {/* Donut Chart Budget */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden relative w-150 sm:w-120">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative z-10 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Total Budget
                    </h2>
                    <p className="text-amber-100 text-xs">Budget utilization</p>
                  </div>
                </div>
                <div className="relative">
                  <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))}
                    className="appearance-none bg-white/20 backdrop-blur-sm text-white text-sm font-medium 
               px-4 py-2 pr-8 rounded-xl border border-white/30 
               focus:outline-none focus:ring-2 focus:ring-white/50 
               cursor-pointer"
                  >
                    {Object.entries(month).map(([key, name]) => (
                      <option key={key} value={key} className="text-black">
                        {name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <DonutChartBudget monthAttribute={currentMonth} yearAttribute={currentYear}/>
              </div>
            </div>

            {/* Year Overview */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden relative w-210 sm:w-180">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative z-10 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 4 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Year Overview
                    </h2>
                    <p className="text-purple-100 text-xs">Annual comparison</p>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(Number(e.target.value))}
                    className="appearance-none bg-white/20 backdrop-blur-sm text-white text-sm font-medium 
               px-4 py-2 pr-8 rounded-xl border border-white/30 
               focus:outline-none focus:ring-2 focus:ring-white/50 
               cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year} className="text-black">
                          {year}
                        </option>
                      );
                    })}
                  </select>

                  {/* Arrow icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <BarChartByCategory yearAttribute={currentYear} />
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
