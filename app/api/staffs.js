import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(request, response) {
    if (request.method === 'GET') {
        return handleGetRequest(request, response);
    } else if (request.method === 'DELETE') {
        return handleDeleteRequest(request, response);
    } else {
        return NextResponse.error("Method Not Allowed", { status: 405 });
    }
}
async function handleGetRequest(request, response) {
    try {
        return await prisma.staffs.findMany();
    } catch (error) {
        console.error('Error fetching staffs:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}
async function handleDeleteRequest(request, response) {
    const { id } = request.query;
    try {
        const staff = await prisma.staffs.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!staff) {
            return response.status(404).json({ message: "Staff not found" });
        }
        await prisma.staffs.delete({
            where: {
                id: parseInt(id)
            }
        });
        return response.status(200).json({ message: "Staff member deleted successfully" });
    } catch (error) {
        console.error("Error deleting staff member:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}
