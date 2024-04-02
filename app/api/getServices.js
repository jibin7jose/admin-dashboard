// pages/api/getServices.js
import prisma from 'prisma';
import {PrismaClient} from "@prisma/client";
const psm = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const services = await psm.services.findMany();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching services' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
