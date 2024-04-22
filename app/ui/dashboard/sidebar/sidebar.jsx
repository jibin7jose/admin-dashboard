'use client'
import { useState, useEffect } from 'react';
import styles from './sidebar.module.css'
import { MdAnalytics, MdAttachMoney, MdDashboard, MdLogout, MdMiscellaneousServices, MdPeople, MdSupervisedUserCircle } from 'react-icons/md';
import MenuLink from '@/app/ui/dashboard/sidebar/menuLink/menuLink';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import toaster from 'react-hot-toast';
import {readUser} from "@/app/actions/readAction";

function Sidebar({role, name}) {
    // const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleLogout =  () => {
        setLoading(true);
        // console.log(session);
        signOut({ callbackUrl: '/', redirect: false }).then(() => {
                toaster.success('User logged out successfully');
                setLoading(false);
                window.location.href = '/';
        });
    };
    const menuItems = [
        {
            title: "Main",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />
                },
                (role==='Entrepreneur' || role==='M-Staff') && {
                    title: "Queue Manager",
                    path: "/dashboard/queueManager",
                    icon: <MdSupervisedUserCircle />
                },
                (role==='Entrepreneur') && {
                    title: "Services",
                    path: "/dashboard/services",
                    icon: <MdMiscellaneousServices />
                },
                (role==='Entrepreneur') && {
                    title: "Staffs",
                    path: "/dashboard/staffs",
                    icon: <MdPeople />
                },
            ].filter(Boolean),
        },
        {
            title: "Others",
            list: [
                {
                    title: "My Transactions",
                    path: "/dashboard/myTransactions",
                    icon: <MdAttachMoney />
                },
                (role==='Entrepreneur') && {
                    title: "Reports",
                    path: "/dashboard/reports",
                    icon: <MdAnalytics />
                },

            ].filter(Boolean),
        },
    ];



    return (
        <div>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" href="public/noavatar.png" height="50" width="50" alt='No avatar' />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{name}</span>
                    <span className={styles.userTitle}>{role}</span>
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

            <button className={styles.logout} onClick={handleLogout} disabled={loading}>
                <MdLogout />
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
