"use server"

import {PrismaClient} from "@prisma/client"

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
export const readUserEmail = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id,
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

export const readAttendance = async (email) => {
    try {
        return await prisma.attendance.findMany({
            where: {
                userEmail: email
            }
        });
    } catch (error) {
        return error;
    }
}
export const readServices = async () => {
    try {
        return await prisma.services.findMany();
    } catch (error) {
        return error;
    }
}

export const readSelectedService = async (currentService) => {
    try {
        return await prisma.services.findUnique({
            where: {
                serviceId: currentService
            }
        });
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
        return await prisma.transactions.findMany({
            where: {
                servedBy: staffId
            },
            orderBy: {
                transactionId: 'desc'
            },
            take: 3
        });
    } catch (error) {
        return error;
    }
}

export const readAttendanceCount = async(email) => {
    try {
        return await prisma.attendance.count({
            where : {
                email: email
            },
            distinct : ['date']
        });
    } catch (error) {
        return error;
    }
}


