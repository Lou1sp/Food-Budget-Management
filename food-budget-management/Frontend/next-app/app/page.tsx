"use client"
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import Hero_Section from "./components/Hero_Section";
import News_Board from "./components/News_Board";
import { useState } from "react";
export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  console.log(sideBarOpen);
  return (
  <div className="bg-black">
   <Header sideBarHandler={() => setSideBarState(!sideBarOpen)}></Header>
   <div className={`sticky top-17 transform transition-transform duration-500 ${sideBarOpen ? "translate-x-0" : "-translate-x-64"}`}>
     <SideNavBar/>
   </div>
   
   <div className={`transform transition-transform duration-500 ${sideBarOpen ? "translate-x-30 scale-80" : null}`}>
     <Hero_Section></Hero_Section>
     <News_Board></News_Board>
   </div>
  </div>
  );
}
