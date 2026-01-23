import Image from "next/image";
import Budget from "../../public/background.webp"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Hero_Section(){
    return(
        <div className="h-screen min-h-screen max-h-100 flex items-center bg-black ">
            <div className="relative z-10 ml-40">
                <h1 className="text-blue-300 text-6xl font-serif font-bold max-w-6xl ">Take control of your food budget – track, manage, and spend smarter every day!</h1>
                <div className="mt-5">
                    <a className="inline-block bg-blue-500 pt-3 pb-3 pl-5 pr-5 rounded-md cursor-pointer font-extralight transition-transform duration-150 hover:-translate-y-3 ">Log In</a>
                    <a href="/signup" className="inline-block cursor-pointer font-extralight pt-3 pb-3 pl-5 pr-5 transition-transform duration-150 hover:-translate-y-3">Sign Up</a>
                </div>
            </div>

            <div className="mr-40">
                <Image alt="" src={Budget} width={1200}></Image>
            </div>
        </div>
    );
}