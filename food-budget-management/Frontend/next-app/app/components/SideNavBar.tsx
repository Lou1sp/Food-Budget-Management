import Image from "next/image";
import profilePic from "../../public/profile_picture.jpg"
export default function SideNavBar() {
  return (
    <aside className="fixed w-64 bg-white shadow-lg z-50 h-[calc(100vh-4.25rem)]">
      <div className="mt-5 mb-8 ml-5 flex items-center gap-3">
        <Image src={profilePic} alt="" width={70} height={50}></Image>
        <div className="text-gray-700 font-mono font-light">
           <i> 
            <p>User Name</p> 
            <p>ID:11042005</p>
           </i>
            
        </div>
      </div>

      <nav className="flex flex-col gap-4 font-mono ml-5 mr-5">
        <a
          href="#activity"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          Budget & Activities
        </a>
        <a
          href="#budget"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          Market
        </a>
        <a
          href="#records"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          Create Your Recipes
        </a>
        <a
          href="#market"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          Calories Calculator
        </a>
      </nav>

      <hr className="text-black mx-auto w-50 mt-20"></hr>

      <nav className="flex flex-col gap-4 font-mono ml-5 mr-5 mt-5 font-extralight">
        <a
          href="#market"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          About Us
        </a>
        <a
          href="#market"
          className="text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition-colors duration-200"
        >
          Contact
        </a>
      </nav>

      {/* Footer optional */}
      <div className="absolute bottom-2 ml-2 text-gray-500 text-sm">
        © 2026 MyApp
      </div>
    </aside>
  );
}
