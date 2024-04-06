"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const removeStaff = async (id) => {
    try {
        const staffRemoved = await prisma.staffs.delete({
            where: {
                staffId: id
            }
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
            }
        });
        return serviceRemoved;
    } catch (error) {
        return error;
    }
}