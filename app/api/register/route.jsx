import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, email, password, role, managedBy, centerCode } = await request.json();

        if (!name || !email || !password) {
            return new NextResponse('Missing fields', {
                status: 400,
            });
        }

        const exist = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (exist) {
            return new NextResponse('User already exists', {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                role,
                managedBy,
                centerCode
            },
        });

        return new NextResponse(JSON.stringify(user), {
            status: 200,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}
