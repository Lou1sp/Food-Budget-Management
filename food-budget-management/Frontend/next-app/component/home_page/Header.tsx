'use client'
import {Menu} from "lucide-react";
interface HeaderProps{
    sideBarHandler: () => void;
}
export default function Header({sideBarHandler}: HeaderProps){
    return(
        <div className="sticky top-0 z-50 w-full bg-blue-600 h-17 flex items-center justify-between">
             {/*To do: If user is not logged in/sign in, then hide the showNavBar button, also create login &sign up option*/}
             <div className="flex ml-5">
                <button className="cursor-pointer " onClick={sideBarHandler}>
                   <div className="border border-white rounded-md p-1">
                    <Menu size={30}></Menu>
                   </div> 
                </button>
                <p className="p-7 font-mono font-bold text-2xl">Company Logo</p>
             </div>
        </div>
    );
}