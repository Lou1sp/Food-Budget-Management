export default function MissionSection() {
  return (
    <section className="mt-50 px-6 mb-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-600">
          Let’s put an end to unnecessary food waste — together.
        </h2>

        {/* Supporting text */}
        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
          Food waste is not just an environmental issue — it is a data problem.
          When spending habits are invisible, inefficiencies go unchecked and
          losses compound over time.
        </p>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          By turning everyday food decisions into structured insights, we empower
          individuals to reduce waste, optimize budgets, and make measurable
          improvements — one household at a time.
        </p>

        {/* Impact statement */}
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8">
          <div className="px-6 py-4 rounded-xl bg-blue-50 w-60">
            <p className="text-2xl font-bold text-blue-500">↓ Waste</p>
            <p className="mt-2 text-gray-600">Less unused food</p>
          </div>

          <div className="px-6 py-4 rounded-xl bg-blue-50 w-60">
            <p className="text-2xl font-bold text-blue-500">↑ Savings</p>
            <p className="mt-2 text-gray-600">Better spending control</p>
          </div>

          <div className="px-6 py-4 rounded-xl bg-blue-50 w-60">
            <p className="text-2xl font-bold text-blue-500">✓ Clarity</p>
            <p className="mt-2 text-gray-600">Decisions backed by data</p>
          </div>
        </div>
      </div>
    </section>
  );
}
