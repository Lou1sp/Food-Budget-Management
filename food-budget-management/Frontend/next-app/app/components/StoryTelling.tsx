export default function StoryTelling() {
  return (
    <section className="mt-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-3xl font-semibold tracking-widest uppercase mb-4">
            Do you know?
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-600">
            Poor food spending habits cost people more than they realize.
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-8 rounded-2xl bg-white shadow-lg">
            <p className="text-4xl font-bold text-blue-500">$1,500+</p>
            <p className="mt-3 text-gray-600">
              Average annual food waste per household due to poor planning.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-lg">
            <p className="text-4xl font-bold text-blue-500">30%</p>
            <p className="mt-3 text-gray-600">
              Of grocery purchases go unused or expire before being consumed.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-lg">
            <p className="text-4xl font-bold text-blue-500">12+</p>
            <p className="mt-3 text-gray-600">
              Monthly food-related expenses that most people never track.
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            These losses are rarely caused by income level, but by a lack of
            visibility. Without clear insights into spending patterns, small
            decisions accumulate into significant financial waste.
          </p>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            This platform transforms your food expenses into clear, actionable
            data — helping you plan better, reduce waste, and optimize every
            dollar you spend.
          </p>
        </div>
      </div>
    </section>
  );
}
