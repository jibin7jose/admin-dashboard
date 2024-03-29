import styles from 'app/ui/dashboard/services/services.module.css'
import Search from "@/app/ui/dashboard/search/search";
import Link from 'next/link'
import Image from "next/image";
import Avatar from "@/public/noavatar.png";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
const ServicesPage = ({placeholder}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a service..."/>
                <Link href="/add/">
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
                <tr>
                    <td>
                        <div className={styles.user}>
                            Aadhar Enrollment
                        </div>
                    </td>
                    <td>
                        Rs. 50
                    </td>
                    <td>
                        Rs. 10
                    </td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href='/'>
                                <button className={`${styles.button} ${styles.view}`}>Edit</button>
                            </Link>
                            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default ServicesPage;