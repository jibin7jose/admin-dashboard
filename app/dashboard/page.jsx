'use client'
import styles from '../ui/dashboard/dashboard.module.css'
import Card from "@/app/ui/dashboard/card/card";
import Transactions from "@/app/ui/dashboard/transactions/transactions";
import Rightbar from "@/app/ui/dashboard/rightbar/rightbar";
import Chart from "@/app/ui/dashboard/chart/chart";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {readUser} from "@/app/actions/readAction";
import Attendance from "@/app/ui/dashboard/attendance/attendance";

function Dashboard() {
    const {data: session} = useSession()
    const router = useRouter()
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // Redirect to login page if user is not logged in
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);
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
            fetchUserData();
        }
    }, [session?.user?.email]
    );
    const email = session?.user?.email;
    // const role = userData?.role;
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card title="Daily"/>
                    <Card title="Weekly"/>
                    <Attendance email={email} />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    );
}
export default Dashboard;
