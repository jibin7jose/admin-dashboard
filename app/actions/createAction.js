"use server"

import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

export const createToken = async (customerName, assignedTo) => {
    try {
        const token = await prisma.tokens.create({
            data: {
                customerName,
                assignedTo
            }
        });
        return parseInt(token.tokenId);
    } catch (error) {
        console.error(error);
    }
}

export const createTransaction = async (transactionStatus, servedBy, tokenID) => {
    try {
        const transaction = await prisma.transactions.create({
            data: {
                transactionStatus,
                servedBy,
                tokenID
            }
        });
        return parseInt(transaction.transactionId);
    } catch (error) {
        console.error(error);
    }
}

export const checkInUser = async (userEmail) => {
    try {
        const checkInTime = new Date(); // Current date and time
        await prisma.attendance.create({
            data: {
                user: {
                    connect: { email: userEmail }, // Connect to the user based on email
                },
                checkIn: checkInTime,
            },
        });
        return { success: true, message: 'User checked in successfully.' };
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

