"use client"
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import { useState } from "react";
export default function Home() {
  const [sideBarOpen, setSideBarState] = useState(false);
  console.log(sideBarOpen);
  return (
  <>
   <Header sideBarHandler={() => setSideBarState(!sideBarOpen)}></Header>
   <div className={`transform transition-transform duration-500 ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
     <SideNavBar/>
   </div>
   
  </>
  );
}
