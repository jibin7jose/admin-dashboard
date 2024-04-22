import { PrismaClient } from '@prisma/client';

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') {
    globalThis.prisma = client;
}

export default client;


/*
This code is a module that imports PrismaClient from @prisma/client and creates a global Prisma client instance if one doesn't already exist (globalThis.prisma).
If the environment is set to production, it assigns the created PrismaClient instance to the global prisma object.
Finally, it exports the Prisma client instance.

This setup is useful for managing the Prisma client instance across your application, ensuring that only one instance is created and reused, especially in a production environment to optimize resource usage.
* */