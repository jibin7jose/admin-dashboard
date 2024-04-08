
"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const updateToken = async (tokenId, data) => {
    try {
        const updatedToken = await prisma.tokens.update({
            where: {
                tokenId: tokenId
            },
            data
        });
        console.log("Token updated successfully");
        return updatedToken;
    } catch (error) {
        return error;
    }
};

export const updateTransaction = async (transactionId, data) => {
    try {
        const updatedTransaction = await prisma.transactions.update({
            where: {
                transactionId: transactionId
            },
            data
        });
        console.log("Transaction updated successfully");
        return updatedTransaction;
    } catch (error) {
        return error;
    }
};

export const updateService = async (serviceId, data) => {
    try {
        const updatedService = await prisma.services.update({
            where: {
                serviceId: serviceId
            },
            data
        });
        console.log("Service updated successfully");
        return updatedService;
    } catch (error) {
        return error;
    }
};

export const updateStaff = async (staffId, data) => {
    try {
        const updatedStaff = await prisma.staffs.update({
            where: {
                staffId: staffId
            },
            data
        });
        console.log("Staff updated successfully");
        return updatedStaff;
    } catch (error) {
        return error;
    }
};
