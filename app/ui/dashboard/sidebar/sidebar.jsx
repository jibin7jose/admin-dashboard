import styles from './sidebar.module.css'
import {
    MdAnalytics,
    MdAttachMoney,
    MdDashboard, MdLogout,
    MdMiscellaneousServices, MdPeople,
    MdSupervisedUserCircle,
    MdWork
} from "react-icons/md";
import MenuLink from "@/app/ui/dashboard/sidebar/menuLink/menuLink";
import Image from "next/image";
import Link from 'next/link'
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Queue Manager",
                path: "/dashboard/outsource",
                icon: <MdSupervisedUserCircle />
            },
            {
                title: "Services",
                path: "/dashboard/services",
                icon: <MdMiscellaneousServices />
            },
            {
                title: "My Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />
            },
            {
                title: "Staffs",
                path: "/dashboard/staffs",
                icon: <MdPeople />
            },
            // {
            //     title: "Profits",
            //     path: "/dashboard/transactions",
            //     icon: <MdAttachMoney />
            // },
        ],
    },
]

const Sidebar = () => {
    return (
        <div>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" href="public/noavatar.png" height="50"
                       width="50" alt='No avatar'></Image>
                <div className={styles.userDetail}>
                    <span className={styles.username}>Nabiel</span>
                    <span className={styles.userTitle}>Entrepreneur</span>
                </div>
            </div>
            <div>
                <Link href="/dashboard/newTransaction">
                    <button className={styles.newTransaction}>+ New Transaction</button>
                </Link>
            </div>
            <ul className={styles.list}>
                {menuItems.map(category => (
                    <li key={category.title}>
                        <span className={styles.category}>{category.title}</span>
                        {category.list.map(item => (
                            <MenuLink item={item} key={item.title}></MenuLink>
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout/>
                Logout
            </button>


        </div>
    );
}

export default Sidebar