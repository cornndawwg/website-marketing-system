import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Monroe, GA",
      rating: 5,
      text: "Moreland Window Cleaning did an amazing job on our home. The windows are crystal clear and the team was professional and punctual. Highly recommend!"
    },
    {
      name: "Mike Rodriguez",
      location: "Loganville, GA", 
      rating: 5,
      text: "Great service for our office building. They were thorough, efficient, and left everything spotless. Will definitely use them again."
    },
    {
      name: "Jennifer Chen",
      location: "Walton County, GA",
      rating: 5,
      text: "Excellent work on our residential windows. The team was friendly, professional, and the results exceeded our expectations."
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
