import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminEmail = 'shon@cwellmarketing.com'
  
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Shon Cornwell',
        role: 'owner',
        // Note: We use NextAuth with email magic links, so no password is stored
        // The user will sign in via magic link sent to their email
      }
    })
    
    console.log('Admin user created:', adminUser.email)
    console.log('Password: a9410600A! (for reference - not stored in database)')
  } else {
    console.log('Admin user already exists:', existingAdmin.email)
  }

  // Create initial services
  const services = [
    {
      slug: 'residential-window-cleaning',
      name: 'Residential Window Cleaning',
      type: 'res',
      basePriceModel: {
        base: {
          per_window: {
            ground: [8, 10],
            second: [10, 12],
            third: [14, 16]
          }
        },
        addOns: {
          screens: { per_unit: [1.5, 2.5] },
          tracks_sills: { per_window: [1, 2] },
          hard_water: { per_window: [3, 6] },
          skylight: { per_unit: [8, 12] }
        },
        multipliers: {
          access_hard: 1.15,
          frequency_quarterly: 0.9,
          frequency_biannual: 0.95
        },
        travel: {
          base_miles: 20,
          per_mile: [0.5, 0.75]
        }
      }
    },
    {
      slug: 'commercial-window-cleaning',
      name: 'Commercial Window Cleaning',
      type: 'com',
      basePriceModel: {
        base: {
          per_panel: {
            ground: [2, 3],
            low: [3, 4],
            medium: [4, 6],
            high: [6, 10]
          }
        },
        multipliers: {
          frequency_weekly: 0.8,
          frequency_bi_weekly: 0.9,
          frequency_monthly: 1.0
        },
        travel: {
          base_miles: 20,
          per_mile: [0.5, 0.75]
        }
      }
    }
  ]

  for (const service of services) {
    const existingService = await prisma.service.findUnique({
      where: { slug: service.slug }
    })

    if (!existingService) {
      await prisma.service.create({
        data: service
      })
      console.log('Service created:', service.name)
    } else {
      console.log('Service already exists:', service.name)
    }
  }

  // Create service areas
  const serviceAreas = [
    { name: 'Walton County', slug: 'walton-county', active: true },
    { name: 'Barrow County', slug: 'barrow-county', active: true },
    { name: 'Oconee County', slug: 'oconee-county', active: true },
    { name: 'Morgan County', slug: 'morgan-county', active: true },
    { name: 'Newton County', slug: 'newton-county', active: true },
    { name: 'Rockdale County', slug: 'rockdale-county', active: true },
    { name: 'Gwinnett County', slug: 'gwinnett-county', active: true }
  ]

  for (const area of serviceAreas) {
    const existingArea = await prisma.serviceArea.findUnique({
      where: { slug: area.slug }
    })

    if (!existingArea) {
      await prisma.serviceArea.create({
        data: area
      })
      console.log('Service area created:', area.name)
    } else {
      console.log('Service area already exists:', area.name)
    }
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
