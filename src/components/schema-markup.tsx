export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Moreland Window Cleaning",
    "description": "Professional window cleaning services in Walton County, GA and surrounding areas. Residential and commercial window cleaning, gutter cleaning, and more.",
    "url": process.env.NEXTAUTH_URL || "http://localhost:3000",
    "telephone": "(555) 123-4567",
    "email": "info@morelandwindowcleaning.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Walton County",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.7949",
      "longitude": "-83.7131"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Monroe, GA"
      },
      {
        "@type": "City", 
        "name": "Loganville, GA"
      },
      {
        "@type": "City",
        "name": "Walton County, GA"
      },
      {
        "@type": "City",
        "name": "Barrow County, GA"
      },
      {
        "@type": "City",
        "name": "Oconee County, GA"
      }
    ],
    "serviceType": [
      "Window Cleaning",
      "Residential Window Cleaning",
      "Commercial Window Cleaning",
      "Gutter Cleaning",
      "Screen Cleaning",
      "Hard Water Stain Removal"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-17:00",
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Window Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Window Cleaning",
            "description": "Professional interior and exterior window cleaning for homes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Window Cleaning",
            "description": "Professional window cleaning services for businesses and offices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gutter Cleaning",
            "description": "Professional gutter cleaning and maintenance services"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const faqs = [
    {
      question: "What areas do you serve?",
      answer: "We serve Walton County, GA and surrounding areas including Monroe, Loganville, Barrow County, Oconee County, Morgan County, Newton County, Rockdale County, and Gwinnett County."
    },
    {
      question: "How often should I have my windows cleaned?",
      answer: "For residential properties, we recommend quarterly cleaning (every 3 months) for optimal results. Commercial properties may need more frequent cleaning depending on location and traffic."
    },
    {
      question: "Do you clean interior and exterior windows?",
      answer: "Yes, we provide both interior and exterior window cleaning services. We can clean one side or both sides depending on your needs."
    },
    {
      question: "What additional services do you offer?",
      answer: "In addition to window cleaning, we offer screen cleaning, track and sill cleaning, hard water stain removal, skylight cleaning, and gutter cleaning services."
    },
    {
      question: "Do you provide free estimates?",
      answer: "Yes, we provide free estimates for all our services. You can get an instant price range using our online quote calculator, or contact us for a detailed estimate."
    }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
