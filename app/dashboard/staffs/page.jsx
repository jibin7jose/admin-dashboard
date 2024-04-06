"use client"
import { useState, useEffect } from "react";
import Image from 'next/image';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import { removeStaff } from '@/app/actions/removeAction';
import { readStaffs } from '@/app/actions/readAction';
import styles from 'app/ui/dashboard/staffs/staffs.module.css';
import Avatar from 'public/noavatar.png';

const Staffs = () => {
    const [staffs, setStaffs] = useState([]);
    useEffect(() => {
        const fetchStaffs = async () => {
            const staffsData = await readStaffs();
            setStaffs(staffsData);
        };
        fetchStaffs();
    }, []);
    const handleRemove = async (staffId) => {
        await removeStaff(staffId);
        const updatedStaffs = staffs.filter((staff) => staff.staffId !== staffId);
        setStaffs(updatedStaffs);
    };
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
                    {staffs && staffs.map(({ 
                        staffId, 
                        staffName, 
                        staffRole, 
                        staffEmail, 
                        staffPhone, 
                        salary 
                    }) => (
                        <StaffRow
                            key={staffId}
                            staffId={staffId}
                            staffName={staffName}
                            staffRole={staffRole}
                            staffEmail={staffEmail}
                            staffPhone={staffPhone}
                            salary={salary}
                            handleRemove={handleRemove}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const StaffRow = ({ staffId, staffName, staffRole, staffEmail, staffPhone, salary, handleRemove }) => (
    <tr>
        <td>
            <div className={styles.user}>
                <Image src={Avatar} alt="avatar" width={40} height={40} className={styles.userImage} />
                {staffName}
            </div>
        </td>
        <td>{staffRole}</td>
        <td>{staffEmail}</td>
        <td>{staffPhone}</td>
        <td>{salary}</td>
        <td>
            <button className={`${styles.button} ${styles.delete}`} onClick={() => handleRemove(staffId)}>Delete</button>
        </td>
    </tr>
);

export default Staffs;
