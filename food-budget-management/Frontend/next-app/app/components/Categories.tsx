import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import Food_Budget from "../../public/food_budget.webp";
import Food_Market from "../../public/food_market.jpg";
import Food_Recipe from "../../public/food_recipe.jpg";
import Food_Calory from "../../public/food_calories.webp";

export default function NewsBoard() {
  const items = [
    {
      title: "Manage Your Food Budget",
      image: Food_Budget,
    },
    {
      title: "Explore the Latest on the Food Market",
      image: Food_Market,
    },
    {
      title: "Create Your Own Recipes",
      image: Food_Recipe,
    },
    {
      title: "Calculate Your Daily Calories",
      image: Food_Calory,
    },
  ];

  return (
    <section className="mt-50 px-6 ">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-400 tracking-wide">
          Discover What’s Available for You
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Smart tools designed to simplify your food journey
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                group
                flex items-center justify-between
                p-6
                rounded-2xl
                bg-white/70
                backdrop-blur-md
                shadow-lg
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:bg-white
              "
            >
              {/* Text */}
              <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors mr-5">
                {item.title}
              </p>

              {/* Image */}
              <div className="relative w-[200px] h-[120px] shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
