import {NextResponse} from "next/server";
import { withAccelerate } from '@prisma/extension-accelerate'

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request) {
    const res = await request.json();
    let {serviceName, serviceCost, serviceProfit, serviceLink} = res;

    const memo = await prisma.services.create({
        data: {
            serviceName, serviceCost, serviceProfit, serviceLink
        }, cacheStrategy: {
            ttl: 20
        }
    });
    return NextResponse.json({memo});
}