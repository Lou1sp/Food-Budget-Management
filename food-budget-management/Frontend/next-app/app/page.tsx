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
import { useState } from 'react';
import { useAuth } from '@/hooks/userAuth';
export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  const isLoggedIn = useAuth();
  console.log(sideBarOpen);

  const data = {
    budget: 0,
    spent: 0,
    categories: [
    ],
    history: [
     
    ],
    monthlySpent: [
      
    ],
  };
  return (
    <div className="bg-black">
      <Header sideBarHandler={() => setSideBarState(!sideBarOpen)}></Header>
      <div
        className={`sticky top-17 transform transition-transform duration-500 ${sideBarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <SideNavBar />
      </div>
      {!isLoggedIn && (
        <div>
          <Hero_Section></Hero_Section>
          <StoryTelling></StoryTelling>
          <News_Board></News_Board>
          <MissionSection></MissionSection>
          <Footer></Footer>
        </div>
      )}

      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-linear-to-br bg-white">
          {/* Chi tiêu theo category */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Expense by Category
              </h2>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <div className="w-full max-w-md">
                <PieChartByCategory categories={data.categories} />
              </div>
            </div>
          </div>

          {/* Budget đã dùng */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Your total budget
              </h2>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <div className="w-full max-w-md">
                <DonutChartBudget spent={data.spent} budget={data.budget} />
              </div>
            </div>
          </div>

          {/* So sánh chi tiêu theo category */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Year Overview
              </h2>
            </div>
            <div className="mt-4 max-w-full">
              <BarChartByCategory monthlySpent={data.monthlySpent} />
            </div>
          </div>
          {/* Lịch sử chi tiêu */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Spending History
              </h2>
            </div>
            <div className="mt-4 max-w-full">
              <LineChartHistory history={data.history} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
