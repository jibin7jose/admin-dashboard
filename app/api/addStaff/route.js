import {NextResponse} from "next/server";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export async function POST(request) {
    const res = await request.json();
    let {staffName, staffRole, staffEmail, staffPhone, salary} = res;
    salary = parseInt(salary);
    const memo = await prisma.staffs.create({
        data: {
            staffName, staffRole, staffEmail, staffPhone, salary
        }
    });
    return NextResponse.json({memo});
}