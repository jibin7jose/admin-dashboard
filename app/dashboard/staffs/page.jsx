"use client"
import { useState, useEffect } from 'react';
import styles from 'app/ui/dashboard/staffs/staffs.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import Avatar from 'public/noavatar.png';
import Image from 'next/image';
import DeleteButton from "@/app/ui/dashboard/staffs/delete";

const Staffs = () => {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await fetch('/api/staffs'); // Corrected endpoint
                if (response.ok) {
                    const data = await response.json();
                    setStaffs(data.staffs);
                } else {
                    throw new Error('Failed to fetch staffs');
                }
            } catch (error) {
                console.error('Error fetching staffs:', error);
            }
        };
        fetchStaffs();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a staff..." />
                <Link href="staffs/add/">
                    <button className={styles.addButton}>Add New Staff</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Role</td>
                    <td>Email</td>
                    <td>Phone No.</td>
                    <td>Salary</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {staffs.map((staff) => (
                    <tr key={staff.staffId}>
                        <td>
                            <div className={styles.user}>
                                <Image src={Avatar} alt="avatar" width={40} height={40} className={styles.userImage} />
                                {staff.staffName}
                            </div>
                        </td>
                        <td>{staff.staffRole}</td>
                        <td>{staff.staffEmail}</td>
                        <td>{staff.staffPhone}</td>
                        <td>{staff.salary}</td>
                        <td>
                            <DeleteButton staffId={staff.staffId} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Staffs;
