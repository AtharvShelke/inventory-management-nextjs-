const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid')

const prisma = new PrismaClient()

async function migrateSKUs() {
  try {
    // Get all items
    const items = await prisma.item.findMany({
      where: {
        OR: [
          { sku: { equals: null } },
          { sku: { equals: undefined } },
          { sku: { equals: '' } }
        ]
      }
    })

    console.log(`Found ${items.length} items without SKU`)

    // Update each item with a unique SKU
    for (const item of items) {
      const newSku = `SKU-${uuidv4().slice(0, 8).toUpperCase()}`
      await prisma.item.update({
        where: { 
          id: item.id 
        },
        data: {
          sku: newSku
        }
      })
      console.log(`Updated item ${item.id} with SKU: ${newSku}`)
    }

    console.log('SKU migration completed successfully')
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateSKUs()