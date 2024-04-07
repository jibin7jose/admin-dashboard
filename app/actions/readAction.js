"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const readStaffs = async () => {
    try {
        const staffData = await prisma.staffs.findMany({cacheStrategy: { ttl: 20 }});
        return staffData;
    } catch (error) {
        return error;
    }
};

export const readServices = async () => {
    try {
        const serviceData = await prisma.services.findMany({cacheStrategy: { ttl: 20 },});
        return serviceData;
    } catch (error) {
        return error;
    }
}