export function AwardsStrip() {
  const awards = [
    { label: 'Service of the Year', year: '2019' },
    { label: 'Best Idea of the Year', year: '2020' },
    { label: 'Best Delivery', year: '2018' },
    { label: 'Best Window Cleaning', year: '2021' },
  ]
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {awards.map((a, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm text-gray-500">{a.label}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{a.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


