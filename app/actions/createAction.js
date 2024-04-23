"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient();



export const createTransaction = async (transactionStatus, servedBy, customerName, serviceId, cost, profit) => {

    try {

        const transaction = await prisma.transactions.create({
            data: {
                transactionStatus,
                servedBy,
                customerName,
                serviceID: serviceId,
                cost,
                profit
            }
        });
        return parseInt(transaction.transactionId);
    } catch (error) {
        console.error(error);
    }
}

export const checkInUser = async (userEmail) => {
    try {
        await prisma.attendance.create({
            data: {
                userEmail: userEmail,
                date: new Date().toDateString(), // Assuming current date
                checkIn: new Date().toTimeString(), // Assuming current date and time
                month: new Date().getMonth() + 1, // Adding 1 because getMonth() returns 0-based month (0 for January, 11 for December)
            },
        })
        console.log("User checked in successfully");
    } catch (error) {
        console.error('Error checking in user:', error);
        return { success: false, message: 'Failed to check in user.' };
    }
};


    




// FAILED
// const data1= {
//     customerName: "John Doe",
//         assignedTo :  1 ,
// }
// const token = await prisma.tokens.create({data: data1},
//     {
//         cacheStrategy: {
//             ttl: 10
//         }
//     });
// export const createToken = async (tokenData) => {
//     try {
//         console.log(tokenData);
//         const tokenObject = {
//             customerName: tokenData.customerName,
//             assignedTo: tokenData.assignedTo,
//         };
//         console.log(tokenObject);
//         const token = await prisma.tokens.create({
//             data: { 
//                 customerName: tokenObject.customerName,
//                 assignedTo: tokenObject.assignedTo,
//              }
//         },{
//             cacheStrategy: {
//                 ttl: 10
//             }
//         });
//         console.log("Token logged successfully");
//         return token;
//     } catch (error) {
//         return error;
//     }
// };

