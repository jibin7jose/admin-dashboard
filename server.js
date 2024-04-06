const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { PrismaClient } = require('@prisma/client');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            if (pathname === '/api/deleteStaff' && req.method === 'POST') {
                const { staffId } = query;

                if (!staffId) {
                    throw new Error('Staff ID is required');
                }

                await prisma.staffs.delete({
                    where: {
                        id: parseInt(staffId, 10),
                    },
                });

                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Staff deleted successfully' }));
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    })
        .listen(3000, () => {
            console.log('> Ready on http://localhost:3000');
        });
});
