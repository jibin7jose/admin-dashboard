"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const readStaffs = async () => {
    try {
        const staffData = await prisma.staffs.findMany();
        return staffData;
    } catch (error) {
        return error;
    }
};

export const readServices = async () => {
    try {
        const serviceData = await prisma.services.findMany();
        return serviceData;
    } catch (error) {
        return error;
    }
}