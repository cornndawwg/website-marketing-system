'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import { Menu, User, LogOut, ChevronDown, Home, Building, Zap, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ServiceArea {
  id: string
  name: string
  slug: string
}

export function NavigationEnhanced() {
  const { data: session } = useSession()
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServiceAreas = async () => {
      try {
        const response = await fetch('/api/areas')
        if (response.ok) {
          const areas = await response.json()
          // Ensure areas is always an array
          setServiceAreas(Array.isArray(areas) ? areas : [])
        } else {
          setServiceAreas([])
        }
      } catch (error) {
        console.error('Failed to fetch service areas:', error)
        setServiceAreas([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchServiceAreas()
  }, [])

  // Organize areas by county
  const organizedAreas = serviceAreas.reduce((acc, area) => {
    if (area.name.includes('County')) {
      // This is a county
      const countyName = area.name
      if (!acc[countyName]) {
        acc[countyName] = { county: area, cities: [] }
      } else {
        acc[countyName].county = area
      }
    } else {
      // This is a city - assign to appropriate county
      let assigned = false
      
      // Define county-city mappings
      const countyMappings = {
        'Walton County': ['Monroe', 'Loganville', 'Social Circle', 'Walnut Grove', 'Good Hope'],
        'Barrow County': ['Winder', 'Auburn', 'Statham'],
        'Oconee County': ['Watkinsville', 'Bishop'],
        'Morgan County': ['Madison'],
        'Newton County': ['Covington', 'Oxford'],
        'Rockdale County': ['Conyers'],
        'Gwinnett County': ['Lawrenceville', 'Snellville', 'Dacula']
      }
      
      for (const [county, cities] of Object.entries(countyMappings)) {
        if (cities.includes(area.name)) {
          if (!acc[county]) {
            acc[county] = { county: null, cities: [] }
          }
          acc[county].cities.push(area)
          assigned = true
          break
        }
      }
      
      // If not assigned to any county, put in "Other Areas"
      if (!assigned) {
        if (!acc['Other Areas']) {
          acc['Other Areas'] = { county: null, cities: [] }
        }
        acc['Other Areas'].cities.push(area)
      }
    }
    return acc
  }, {} as Record<string, { county: ServiceArea | null, cities: ServiceArea[] }>)

  const services = [
    {
      name: 'Residential Window Cleaning',
      href: '/residential',
      icon: Home,
      description: 'Professional home window cleaning services'
    },
    {
      name: 'Commercial Window Cleaning',
      href: '/commercial',
      icon: Building,
      description: 'Business and commercial window cleaning'
    },
    {
      name: 'Gutter Cleaning',
      href: '/gutter-cleaning',
      icon: Zap,
      description: 'Gutter cleaning and maintenance services'
    }
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="Moreland Window Cleaning" className="h-8 w-auto" />
              <span className="sr-only">Moreland Window Cleaning</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <DropdownMenuItem key={service.name} asChild>
                      <Link href={service.href} className="flex items-center gap-3 p-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Areas Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                  Service Areas
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-none max-h-96 overflow-y-auto border-0 shadow-2xl bg-white/95 backdrop-blur-sm" align="start">
                <DropdownMenuItem asChild>
                  <Link href="/areas" className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg mx-2 mb-2 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">All Service Areas</div>
                      <div className="text-sm text-gray-600">View complete list of locations</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <div className="border-t border-gray-100 mx-4 my-2"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-sm text-gray-500">Loading areas...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-8 gap-6 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30">
                    {Object.entries(organizedAreas).map(([countyName, { county, cities }]) => (
                      <div key={countyName} className="space-y-2">
                        {/* County Header */}
                        {county && (
                          <DropdownMenuItem asChild>
                            <Link href={`/areas/${county.slug}`} className="flex items-center gap-3 p-3 font-semibold text-blue-700 hover:bg-blue-50 hover:shadow-sm rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200">
                              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 shadow-sm" />
                              <span className="text-sm">{county.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        
                        {/* Cities under county */}
                        {cities.length > 0 && (
                          <div className="ml-6 space-y-1">
                            {cities.map((city) => (
                              <DropdownMenuItem key={city.id} asChild>
                                <Link href={`/areas/${city.slug}`} className="flex items-center gap-2 p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all duration-150 border border-transparent hover:border-gray-200">
                                  <div className="w-1.5 h-1.5 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex-shrink-0" />
                                  <span className="text-sm hover:text-gray-800 transition-colors">{city.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Links */}
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {session.user?.name || session.user?.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => signIn()} variant="outline">
                Sign In
              </Button>
            )}
          </div>
          
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {/* Services Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Services
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <DropdownMenuItem key={service.name} asChild>
                          <Link href={service.href} className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Areas Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Service Areas
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-80 overflow-y-auto w-64">
                    <DropdownMenuItem asChild>
                      <Link href="/areas">All Service Areas</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isLoading ? (
                      <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                    ) : (
                      <div className="space-y-3 p-2">
                        {Object.entries(organizedAreas).map(([countyName, { county, cities }]) => (
                          <div key={countyName} className="space-y-1">
                            {/* County Header */}
                            {county && (
                              <DropdownMenuItem asChild>
                                <Link href={`/areas/${county.slug}`} className="flex items-center gap-2 p-2 font-semibold text-blue-600">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                  <span className="text-sm">{county.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            )}
                            
                            {/* Cities under county */}
                            {cities.length > 0 && (
                              <div className="ml-4 space-y-1">
                                {cities.map((city) => (
                                  <DropdownMenuItem key={city.id} asChild>
                                    <Link href={`/areas/${city.slug}`} className="flex items-center gap-2 p-1.5 text-gray-600">
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                                      <span className="text-xs">{city.name}</span>
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                
                {session ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => signIn()}>
                    Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
