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
                ttl: 10 
            }
        });
        await prisma.transactions.create({
            data: {
                transactionTime: new Date(),
                transactionStatus: 'Pending',
                servedBy: data.assignedTo,
                tokenID: token.tokenId
            }
        }, 
        {
            cacheStrategy: { 
                ttl: 10 
            }
        });
        console.log("Token and Transaction logged successfully");
        return token;
    } catch (error) {
        return error;
    }
};