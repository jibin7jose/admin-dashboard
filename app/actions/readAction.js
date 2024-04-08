"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const readStaffs = async () => {
    try {
        const staffData = await prisma.staffs.findMany({cacheStrategy: { ttl: 15 }});
        return staffData;
    } catch (error) {
        return error;
    }
};

export const readServices = async () => {
    try {
        const serviceData = await prisma.services.findMany({cacheStrategy: { ttl: 15 },});
        return serviceData;
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


