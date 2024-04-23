"use server"

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const removeStaff = async (staffId) => {
    try {
        return await prisma.user.delete({
            where: {
                id: staffId
            },
        });
    } catch (error) {
        return error;
    }
};

export const removeService = async (id) => {
    try {
        return await prisma.services.delete({
            where: {
                serviceId: id
            },
        });
    } catch (error) {
        return error;
    }
}

export const removeTransaction = async (id) => {
    try {
        return await prisma.transactions.delete({
            where: {
                tokenId: id
            },
        });
    } catch (error) {
        return error;
    }
}