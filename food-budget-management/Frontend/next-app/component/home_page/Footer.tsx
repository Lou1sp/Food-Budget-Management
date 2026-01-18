export default function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-800">
              FoodWise
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              A data-driven platform designed to help individuals understand,
              optimize, and take control of their food spending.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">
                Budget Tracking
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Food Market Insights
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Recipe Planning
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Calories Analysis
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Data Sources
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Research & Insights
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                FAQs
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Data Usage
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FoodWise. All rights reserved.</p>

          <p className="mt-4 md:mt-0">
            Built with a focus on clarity, transparency, and measurable impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
