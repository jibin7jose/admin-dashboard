"use server"

import {PrismaClient} from "@prisma/client"
import {withAccelerate} from '@prisma/extension-accelerate'

const prisma = new PrismaClient();

export const readUser = async (userEmail) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: userEmail,
            }
        });
    } catch (error) {
        return error;
    }
}

export const readStaffs = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        return error;
    }
};

export const readServices = async () => {
    try {
        return await prisma.services.findMany();
    } catch (error) {
        return error;
    }
}

export const readSelectedService = async (currentService) => {
    try {
        const service = await prisma.services.findUnique({
            where: {
                serviceName: currentService
            }
        });
        return service.serviceLink;
    } catch (error) {
        return error;
    }
};

export const readServiceId = async (serviceName) => {
    try {
        const service = await prisma.services.findUnique({
            select: {
                serviceId: true 
            },
            where: {
                serviceName: serviceName
            }
        });
        return service.serviceId;
    } catch (error) {
        return error;
    }
};

export const readRecentTransactions = async (staffId) => {
    try {
        const transactions = await prisma.transactions.findMany({
            where: {
                servedBy: staffId
            },
            orderBy: {
                transactionId: 'desc'
            },
            take: 3
        });

        return transactions;
    } catch (error) {
        return error;
    }
}


