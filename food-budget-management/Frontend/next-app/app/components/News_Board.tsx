import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NewsBoard(){
    return(
        <div className="mt-20">
            <div className="flex justify-center">
                <h1 className="text-blue-300 font-serif font-bold text-4xl">See what are available for you</h1>
            </div>
            
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-20 w-200">
                    <div className="bg-blue-400 p-5 max-w-300 flex justify-center rounded-md">Manage Your Food Budget</div>
                    <div className="bg-blue-500 p-5 max-w-300 flex justify-center rounded-md">Explore the Latest on the Food Market</div>
                    <div className="bg-blue-600 p-5 max-w-300 flex justify-center rounded-md">Create Your Own Menu</div>
                    <div className="bg-blue-700 p-5 max-w-300 flex justify-center rounded-md">Calculate Your Daily Calories</div>
                </div>
            </div>
        </div>
    );
}