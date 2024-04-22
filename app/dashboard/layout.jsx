'use client'
import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "@/app/ui/dashboard/footer/footer";
import {readUser} from "@/app/actions/readAction";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
// import Footer from "../ui/dashboard/footer/footer"

const Layout = ({children}) => {
    const [userData, setUserData] = useState(null);
    const { data: session } = useSession();
    const currentUser = session?.user?.name;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await readUser(session?.user?.email);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (session?.user?.email) {
            fetchUserData().then(r => console.log("User data fetched successfully"));
        }
    }, [session?.user?.email]);

    const userRole = userData?.role;
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar role={userRole} name={currentUser}/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </div>
    )
}

export default Layout