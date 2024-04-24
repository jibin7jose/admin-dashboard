'use client'
import styles from '@/app/ui/dashboard/myTransactions/myTransactions.module.css'
import Search from '@/app/ui/dashboard/search/search';
import {useSession} from "next-auth/react";
import {readMyTransactions, readUser} from "@/app/actions/readAction";
import transactions from "@/app/ui/dashboard/transactions/transactions";
import {useEffect, useState} from "react";
const MyTransactions = () => {
    const [userData, setUserData] = useState(null);
    const { data: session } = useSession();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await readUser(session?.user.email);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (session?.user?.email) {
            fetchUserData().then(r => console.log("User data fetched successfully"));
        }
    }, [session?.user?.email]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await readMyTransactions(session?.user?.email);
                setTransactions(transactions);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTransactions();
    }, [session?.user?.email]);

    return (
        <div className={styles.container}>

            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Transaction ID</td>
                    <td>Date</td>
                    <td>Customer Name</td>
                    <td>Transaction Status</td>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.transactionTime.toLocaleString()}</td>
                        <td>{transaction.customerName}</td>
                        <td>
                            {transaction.transactionStatus}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default MyTransactions;