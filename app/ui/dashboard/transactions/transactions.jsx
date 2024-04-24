import styles from './transactions.module.css'
import {useSession} from "next-auth/react";
import { readRecentTransactions, readUser} from "@/app/actions/readAction";
import {useEffect, useState} from "react";
const Transactions = () => {
    //  fetch only the last 3 transactions
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
                const transactions = await readRecentTransactions((session?.user?.email));
                setTransactions(transactions);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTransactions();
    }, [session?.user?.email]);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <table className={styles.table}>
                <tbody>
                <tr>
                    {transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                        <td>{transaction.customerName}</td>
                        <td>{transaction.transactionTime.toDateString()}</td>
                        <td>{transaction.transactionStatus}</td>
                        <td>{transaction.cost}</td>
                    </tr>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;