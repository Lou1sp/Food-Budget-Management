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
import { Line } from 'react-chartjs-2';
export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  const isLoggedIn = useAuth();
  console.log(sideBarOpen);

  const data = {
    budget: 1000,
    spent: 400,
    categories: [
      { name: 'Protein', spent: 150 },
      { name: 'Vegetable', spent: 100 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
      { name: 'Drinks', spent: 150 },
    ],
    history: [
      { date: '2026-01-01', spent: 50 },
      { date: '2026-01-05', spent: 100 },
      { date: '2026-01-10', spent: 250 },
    ],
    monthlySpent: [
      { month: 'January', spent: 250 },
      { month: 'February', spent: 380 },
      { month: 'March', spent: 170 },
      { month: 'April', spent: 195 },
      { month: 'May', spent: 230 },
      { month: 'June', spent: 530 },
      { month: 'July', spent: 117 },
      { month: 'August', spent: 120 },
      { month: 'September', spent: 300 },
      { month: 'October', spent: 220 },
      { month: 'Novemver', spent: 70 },
      { month: 'December', spent: 112 },
    ]
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="w-120 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
              Chi tiêu theo category
            </h2>
            <PieChartByCategory categories={data.categories} />
          </div>

          <div className=" p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Lịch sử chi tiêu</h2>
            <LineChartHistory history={data.history} />
          </div>

          <div className=" p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
              So sánh chi tiêu theo category
            </h2>
            <BarChartByCategory
              monthlySpent={data.monthlySpent}
            ></BarChartByCategory>
          </div>

          <div className="w-120 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Budget đã dùng</h2>
            <DonutChartBudget
              spent={data.spent}
              budget={data.budget}
            ></DonutChartBudget>
          </div>
        </div>
      )}
    </div>
  );
}
