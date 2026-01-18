"use client"
import Header from "../component/home_page/Header";
import SideNavBar from "../component/home_page/SideNavBar";
import Hero_Section from "../component/home_page/Hero_Section";
import News_Board from "../component/home_page/Categories";
import StoryTelling from "../component/home_page/StoryTelling";
import MissionSection from "../component/home_page/MissionSection";
import Footer from "../component/home_page/Footer";
import { useState } from "react";
export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  console.log(sideBarOpen);
  return (
  <div className="bg-black">
   <Header sideBarHandler={() => setSideBarState(!sideBarOpen)}></Header>
   {/*To fix: If user is not logged in, do not show side bar*/}
   <div className={`sticky top-17 transform transition-transform duration-500 ${sideBarOpen ? "translate-x-0" : "-translate-x-64"}`}>
     <SideNavBar/>
   </div>
   
   <div className={`transform transition-transform duration-500 ${sideBarOpen ? "translate-x-30 -translate-y-70 scale-80" : null}`}>
     <Hero_Section></Hero_Section>
     <StoryTelling></StoryTelling>
     <News_Board></News_Board>
     <MissionSection></MissionSection>
     <Footer></Footer>
   </div>
  </div>
  );
}
