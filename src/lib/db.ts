import {PrismaClient} from '@generated/prisma';


const globalPrisma = global as unknown as {
  primsa: PrismaClient;
}


const prisma = globalPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production'){
  globalPrisma.primsa = prisma;
}

export default prisma;