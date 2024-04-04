"use client"
import styles from 'app/ui/dashboard/staffs/staffs.module.css';
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Avatar from 'public/noavatar.png';
import Image from 'next/image';
import {PrismaClient} from "@prisma/client";
import {useRouter} from "next/navigation";

const prisma = new PrismaClient();

async function getStaffs() {
    return prisma.staffs.findMany();
}

const DeleteButton = ({ sid }) => {
    const router = useRouter();
    const handleDelete = async () => {
        // Your deleteStaff logic here
        return prisma.staffs.delete({
            where: {
                staffId: sid,
            },
        });
    };
    const handleClick = () => {
        handleDelete();
        router.push('/'); // Navigate to the desired page after deletion
    };
    return (
        <button className={`${styles.button} ${styles.delete}`} onClick={handleClick}>
            Delete
        </button>
    );
};

// eslint-disable-next-line @next/next/no-async-client-component
const Staffs = async () => {
    const staffs = await getStaffs();
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a staff..."/>
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
                    <td>Salary Status</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {staffs.map((staff) => (
                    <tr key={staff.staffId}>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src={Avatar}
                                    alt='avatar'
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                {staff.staffName}
                            </div>
                        </td>
                        <td>{staff.staffRole}</td>
                        <td>{staff.staffEmail}</td>
                        <td>{staff.staffPhone}</td>
                        <td>{staff.salary}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href='staffs/'>
                                    <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <Link href='staffs/'>
                                    <DeleteButton staffId={staff.staffId} />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Staffs;