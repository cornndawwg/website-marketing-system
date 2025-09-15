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
import { Menu, User, LogOut, ChevronDown, Home, Building, Droplets, Zap, Shield, Star } from 'lucide-react'
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

  const services = [
    {
      name: 'Residential',
      href: '/residential',
      icon: Home,
      description: 'Home window cleaning services'
    },
    {
      name: 'Commercial',
      href: '/commercial',
      icon: Building,
      description: 'Business window cleaning services'
    },
    {
      name: 'Pressure Washing',
      href: '/pressure-washing',
      icon: Droplets,
      description: 'Exterior cleaning and pressure washing'
    },
    {
      name: 'Gutter Cleaning',
      href: '/gutter-cleaning',
      icon: Zap,
      description: 'Gutter cleaning and maintenance'
    },
    {
      name: 'Screen Repair',
      href: '/screen-repair',
      icon: Shield,
      description: 'Window screen repair and replacement'
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
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuItem asChild>
                  <Link href="/areas" className="flex items-center gap-3 p-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">All Areas</div>
                      <div className="text-sm text-gray-500">View all service areas</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isLoading ? (
                  <DropdownMenuItem disabled>
                    <div className="text-sm text-gray-500">Loading areas...</div>
                  </DropdownMenuItem>
                ) : (
                  Array.isArray(serviceAreas) && serviceAreas.slice(0, 8).map((area) => (
                    <DropdownMenuItem key={area.id} asChild>
                      <Link href={`/areas/${area.slug}`} className="p-2">
                        {area.name}
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
                {Array.isArray(serviceAreas) && serviceAreas.length > 8 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/areas" className="p-2 text-blue-600 font-medium">
                        View All Areas →
                      </Link>
                    </DropdownMenuItem>
                  </>
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
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <Link href="/areas">All Areas</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isLoading ? (
                      <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                    ) : (
                      Array.isArray(serviceAreas) && serviceAreas.slice(0, 6).map((area) => (
                        <DropdownMenuItem key={area.id} asChild>
                          <Link href={`/areas/${area.slug}`}>{area.name}</Link>
                        </DropdownMenuItem>
                      ))
                    )}
                    {Array.isArray(serviceAreas) && serviceAreas.length > 6 && (
                      <DropdownMenuItem asChild>
                        <Link href="/areas">View All →</Link>
                      </DropdownMenuItem>
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
