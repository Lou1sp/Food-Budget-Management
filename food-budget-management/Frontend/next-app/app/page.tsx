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
import NewTransaction from '@/component/budgetTracking/NewTransactionCreation';
import CategoriesDropDown from '@/component/budgetTracking/CategoriesDropDown';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [sideBarOpen, setSideBarState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { token } = useAuth();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [newTransactionCheck, setNewTransactionCheck] = useState(0);
  console.log(currentMonth);
  useEffect(() => {
    const id = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const isLoggedIn = token != null;
  //Whenever a new transaction is made, update the CheckPoint, which will update a new number and pass it down to the children, so children will update in the useEffect
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
          <div className="mb-8 flex items-center gap-6 flex-wrap justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Financial Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Track and analyze your spending patterns
              </p>
            </div>
            {/* Button mở modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-600 transition-colors"
            >
              Add Transaction
            </button>
            <NewTransaction
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              handleNewTransaction={() => setNewTransactionCheck(prev => prev + 1)}
              checkPoint={newTransactionCheck}
            />
            {/* Period Filter Bar */}
            <div className="flex items-center gap-2 bg-gray-200 backdrop-blur-sm px-10 py-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-widest pr-5 hidden sm:block ">
                Period
              </span>
              <div className="w-px h-5 bg-slate-200 hidden sm:block" />

              {/* Month */}
              <div className="relative group ml-5 ">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center z-10">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(Number(e.target.value))}
                  className="appearance-none px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm shadow-sm cursor-pointer
                    hover:border-emerald-400 hover:shadow-md transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                >
                  {Object.entries(month).map(([key, name]) => (
                    <option key={key} value={Number(key)}>
                      {name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                  <svg
                    className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Year */}
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center z-10">
                  <svg
                    className="w-3.5 h-3.5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="appearance-none px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm shadow-sm cursor-pointer
                    hover:border-blue-400 hover:shadow-md transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                      })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                  <svg
                    className="w-3 h-3 text-slate-400 group-hover:text-blue-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
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
            </div>
            <div className="p-0">
              <LineChartHistory
                chosenMonth={currentMonth}
                chosenYear={currentYear}
                checkPoint={newTransactionCheck}
              />
            </div>
          </div>

          {/* Grid 3 Charts Below */}
          <div className="flex flex-wrap justify-center gap-10 mt-6">
            {/* Expense by Category */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden relative w-159 sm:w-120">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 flex items-center justify-between">
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
                <CategoriesDropDown handleNewCategory={() => setNewTransactionCheck(prev => prev + 1)} checkPoint={newTransactionCheck}></CategoriesDropDown>
              </div>
              <div className="p-0">
                <PieChartByCategory
                  chosenMonth={currentMonth}
                  chosenYear={currentYear}
                  checkPoint={newTransactionCheck}
                />
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
              </div>
              <div className="p-0">
                <DonutChartBudget
                  chosenMonth={currentMonth}
                  chosenYear={currentYear}
                  checkPoint={newTransactionCheck}
                />
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
                <div className="relative"></div>
              </div>
              <div className="p-0">
                <BarChartByCategory chosenYear={currentYear} checkPoint={newTransactionCheck}/>
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
