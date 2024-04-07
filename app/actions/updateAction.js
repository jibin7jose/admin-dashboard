"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

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
