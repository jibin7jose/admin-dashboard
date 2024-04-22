"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient();

export const removeStaff = async (id) => {
    try {
        const staffRemoved = await prisma.user.delete({
            where: {
                staffId: id
            },
            cacheStrategy: { ttl: 20 },
        });
        return staffRemoved;
    } catch (error) {
        return error;
    }
};

export const removeService = async (id) => {
    try {
        const serviceRemoved = await prisma.services.delete({
            where: {
                serviceId: id
            },
            cacheStrategy: { ttl: 20 },
        });
        return serviceRemoved;
    } catch (error) {
        return error;
    }
}

export const removeTransaction = async (id) => {
    try {
        const tokenRemoved = await prisma.transactions.delete({
            where: {
                tokenId: id
            },
            cacheStrategy: { ttl: 20 },
        });
        return tokenRemoved;
    } catch (error) {
        return error;
    }
}