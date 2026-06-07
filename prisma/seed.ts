import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@m4u.pro' },
    update: {},
    create: {
      email: 'admin@m4u.pro',
      name: 'Admin',
      password: hashedPassword,
    },
  })
  console.log('Seed completed. Admin created with email: admin@m4u.pro, password: admin123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
