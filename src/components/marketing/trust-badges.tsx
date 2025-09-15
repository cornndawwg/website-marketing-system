import { ShieldCheck, BadgeCheck, TimerReset, Sparkles } from 'lucide-react'

export function TrustBadges() {
  const items = [
    { icon: ShieldCheck, title: 'Fully Insured', text: 'General liability coverage' },
    { icon: BadgeCheck, title: '100% Satisfaction', text: 'We make it right' },
    { icon: TimerReset, title: 'On-Time Arrival', text: 'Reliable scheduling' },
    { icon: Sparkles, title: 'Streak-Free Finish', text: 'Pro-grade tools and technique' },
  ]
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


