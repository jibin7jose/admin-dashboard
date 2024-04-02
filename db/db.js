const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addService(serviceData) {
    const newService = await prisma.services.create({
        data: serviceData,
    });
    console.log('Created service:', newService);
}

async function deleteService(serviceId) {
    const deletedService = await prisma.services.delete({
        where: { serviceId },
    });
    console.log('Deleted service:', deletedService);
}

async function updateService(serviceId, newData) {
    const updatedService = await prisma.services.update({
        where: { serviceId },
        data: newData,
    });
    console.log('Updated service:', updatedService);
}

async function addStaff(staffData) {
    const newStaff = await prisma.staffs.create({
        data: staffData,
    });
    console.log('Created staff:', newStaff);
}

async function deleteStaff(staffId) {
    const deletedStaff = await prisma.staffs.delete({
        where: { staffId },
    });
    console.log('Deleted staff:', deletedStaff);
}

async function updateStaff(staffId, newData) {
    const updatedStaff = await prisma.staffs.update({
        where: { staffId },
        data: newData,
    });
    console.log('Updated staff:', updatedStaff);
}

module.exports = {
    addService,
    deleteService,
    updateService,
    addStaff,
    deleteStaff,
    updateStaff,
    prisma
};