import styles from './transactions.module.css'
import Image from 'next/image'
const Transactions = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recent Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {/*<Image src="/noavatar.png" width={40} height={40} className={styles.userImage} />*/}
                        John Doe
                    </td>
                    <td>
                        <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                    </td>
                    <td>21/03/2024</td>
                    <td>Rs. 150</td>
                </tr>
                <tr>
                    <td>
                        {/*<Image src="/noavatar.png" width={40} height={40} className={styles.userImage} />*/}
                        John Doe
                    </td>
                    <td>
                        <span className={`${styles.status} ${styles.done}`}>Done</span>
                    </td>
                    <td>21/03/2024</td>
                    <td>Rs. 150</td>
                </tr>
                <tr>
                    <td>
                        {/*<Image src="/noavatar.png" width={40} height={40} className={styles.userImage} />*/}
                        John Doe
                    </td>
                    <td>
                        <span className={`${styles.status} ${styles.cancelled}`}>Cancelled</span>
                    </td>
                    <td>21/03/2024</td>
                    <td>Rs. 150</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;