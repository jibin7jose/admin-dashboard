import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request) {
    try {
        const res = await request.json();
        let { transactionStatus, servedBy } = res;

        const memo = await prisma.transactions.create({
            data: {
                transactionStatus,
                servedBy
            }
        });

        return NextResponse.json({ memo });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.error('Failed to create transaction', { status: 500 });
    }
}
