"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const createToken = async (tokenData) => {
    try {
        const token = await prisma.tokens.create({
            data: tokenData
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

export const createTransaction = async (transactionData) => {
    try {
        const transaction = await prisma.transactions.create({
            data: transactionData
        }, 
        {
            cacheStrategy: { 
                ttl: 20 
            }
        });
        console.log("Transaction logged successfully");
        return transaction;
    } catch (error) {
        return error;
    }
};



// cacheStrategy: { ttl: 20 }