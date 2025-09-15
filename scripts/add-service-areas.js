#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Adding service areas...')

  const serviceAreas = [
    // Counties
    { name: 'Walton County', slug: 'walton-county', active: true },
    { name: 'Barrow County', slug: 'barrow-county', active: true },
    { name: 'Oconee County', slug: 'oconee-county', active: true },
    { name: 'Morgan County', slug: 'morgan-county', active: true },
    { name: 'Newton County', slug: 'newton-county', active: true },
    { name: 'Rockdale County', slug: 'rockdale-county', active: true },
    { name: 'Gwinnett County', slug: 'gwinnett-county', active: true },
    // Cities in Walton County
    { name: 'Monroe', slug: 'monroe', active: true },
    { name: 'Loganville', slug: 'loganville', active: true },
    { name: 'Social Circle', slug: 'social-circle', active: true },
    { name: 'Walnut Grove', slug: 'walnut-grove', active: true },
    { name: 'Good Hope', slug: 'good-hope', active: true },
    // Cities in other counties
    { name: 'Winder', slug: 'winder', active: true },
    { name: 'Auburn', slug: 'auburn', active: true },
    { name: 'Statham', slug: 'statham', active: true },
    { name: 'Watkinsville', slug: 'watkinsville', active: true },
    { name: 'Bishop', slug: 'bishop', active: true },
    { name: 'Madison', slug: 'madison', active: true },
    { name: 'Covington', slug: 'covington', active: true },
    { name: 'Oxford', slug: 'oxford', active: true },
    { name: 'Conyers', slug: 'conyers', active: true },
    { name: 'Lawrenceville', slug: 'lawrenceville', active: true },
    { name: 'Snellville', slug: 'snellville', active: true },
    { name: 'Dacula', slug: 'dacula', active: true }
  ]

  for (const area of serviceAreas) {
    try {
      const existingArea = await prisma.serviceArea.findUnique({
        where: { slug: area.slug }
      })

      if (!existingArea) {
        await prisma.serviceArea.create({
          data: area
        })
        console.log('✅ Service area created:', area.name)
      } else {
        console.log('⏭️  Service area already exists:', area.name)
      }
    } catch (error) {
      console.error('❌ Error with area:', area.name, error.message)
    }
  }

  console.log('✅ Service areas setup complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
