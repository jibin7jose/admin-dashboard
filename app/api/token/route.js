import { NextResponse } from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request) {
    try {
        const res = await request.json();
        let { customerName, assignedTo } = res;

        const memo = await prisma.tokens.create({
            data: {
                customerName,
                assignedTo
            }
        });

        return NextResponse.json({ memo });
    } catch (error) {
        console.error('Error creating token:', error);
        return NextResponse.error('Failed to create token', { status: 500 });
    }
}
