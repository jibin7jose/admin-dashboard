import styles from 'app/ui/dashboard/staffs/staffs.module.css';
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Avatar from 'public/noavatar.png';
import Image from 'next/image';
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
const Staffs = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a staff..."/>
                <Link href="/add/">
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
                <tr>
                    <td>
                        <div className={styles.user}>
                            <Image
                                src={Avatar}
                                alt='avatar'
                                width={40}
                                height={40}
                                className={styles.userImage}
                            />Joel B Joseph
                        </div>
                    </td>
                    <td>
                        Manager
                    </td>
                    <td>
                        dhanaraja@gmail.com
                    </td>
                    <td>
                        9999999999
                    </td>
                    <td>Paid</td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/'>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Staffs;