import styles from '@/app/ui/dashboard/myTransactions/myTransactions.module.css'
import Search from '@/app/ui/dashboard/search/search';

const MyTransactions = () => {
    return (
        <div className={styles.container}>
            <p>Under Development - Awaiting Authentication</p>&nbsp;
            <div className={styles.top}>
                <Search placeholder="Search for a customer..." />
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Transaction ID</td>
                    <td>Date</td>
                    <td>Customer Name</td>
                    <td>Transaction Status</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {/* {services.map((service) => (
                    <tr key={service.serviceId}>
                        <td><a href={service.serviceLink}>{service.serviceName}</a></td>
                        <td>{service.serviceCost}</td>
                        <td>{service.serviceProfit}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/services/edit/${service.serviceId}`}>
                                    <button className={`${styles.button} ${styles.view}`}>Edit</button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))} */}
                </tbody>
            </table>
        </div>
    );
}
export default MyTransactions;