"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate());


export const updateStaff = async( params ) => {
    try {
        const staffData = await prisma.staffs.update({
            where: { staffId: params.staffId },
            data: {
                staffName: params.staffName,
                staffRole: params.staffRole,
                staffEmail: params.staffEmail,
                staffPhone: params.staffPhone,
                salary: params.salary
            }
        });
        
        return staffData;
    } catch (error) {     
        return error;
    }
}

export const updateService = async( params ) => {
    try {
        const staffData = await prisma.services.update({
            where: { serviceId: params.serviceId },
            data: {
                serviceName: params.serviceName,
                serviceCost: params.serviceCost,
                serviceProfit: params.serviceProfit,
                serviceLink: params.serviceLink
            }
        });
        
        return serviceData;
    } catch (error) {     
        return error;
    }
}

export const updateTransaction = async( params ) => {
    try {
        const transactionData = await prisma.transactions.update({
            where: { transactionId: params.transactionId },
            data: {
                transactionStatus: params.transactionStatus,
                servedBy: params.servedBy,
                serviceID: params.serviceID

            }
        });
        
        return transactionData;
    } catch (error) {     
        return error;
    }
}

export const updateToken = async( params ) => {
    try {
        const tokenData = await prisma.tokens.update({
            where: { tokenId: params.tokenId },
            data: {
                customerName: params.customerName,
                assignedTo: params.assignedTo
            }
        });
        
        return tokenData;
    } catch (error) {     
        return error;
    }
}