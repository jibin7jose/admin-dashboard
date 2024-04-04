import {NextResponse} from "next/server";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export async function POST(request) {
    const res = await request.json();
    let {serviceName, serviceCost, serviceProfit, serviceLink} = res;

    const memo = await prisma.services.create({
        data: {
            serviceName, serviceCost, serviceProfit, serviceLink
        }
    });
    return NextResponse.json({memo});
}