// pages/ServicesPage.js

import Link from 'next/link';
import styles from 'app/ui/dashboard/services/services.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function getService() {
    'use server'
    return await prisma.services.findMany();
}
const services = await getService();
export default async function ServicesPage(){

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a service..." />
                <Link href="services/add">
                    <button className={styles.addButton}>Add New Service</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Service Name</td>
                    <td>Cost</td>
                    <td>Profit</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                    <tr key={service.serviceId}>
                        <td><a href={service.serviceLink}>{service.serviceName}</a></td>
                        <td>{service.serviceCost}</td>
                        <td>{service.serviceProfit}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/services/edit/${service.serviceId}`}>
                                    <button className={`${styles.button} ${styles.view}`}>Edit</button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<Pagination />*/}
        </div>
    );
}
