type Step = {
  title: string
  description: string
}

export function ProcessSteps({ steps, title = 'Our Process' }: { steps: Step[]; title?: string }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">{title}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 counter-reset steps">
          {steps.map((step, idx) => (
            <li key={idx} className="relative p-6 rounded-xl border border-gray-200 bg-white">
              <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}


