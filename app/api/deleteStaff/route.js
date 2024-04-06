import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { staffId } = req.body;

        if (!staffId) {
            return res.status(400).json({ error: 'Staff ID is required' });
        }

        try {
            await prisma.staffs.delete({
                where: {
                    id: parseInt(staffId, 10),
                },
            });

            return res.status(200).json({ message: 'Staff deleted successfully' });
        } catch (error) {
            console.error('Error deleting staff:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
