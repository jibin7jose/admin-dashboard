"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const createToken = async (data) => {
    try {
        const token = await prisma.tokens.create({
            data
        }, 
        {
            cacheStrategy: { 
                ttl: 20 
            }
        });
        await prisma.transactions.create({
            data
        }, 
        {
            cacheStrategy: { 
                ttl: 20 
            }
        });
        console.log("Token logged successfully");
        return token;
    } catch (error) {
        return error;
    }
};




// cacheStrategy: { ttl: 20 }