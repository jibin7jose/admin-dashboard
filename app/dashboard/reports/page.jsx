import styles from '@/app/ui/dashboard/reports/reports.module.css'
export default function Reports() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Reports</h2>
            <div className={styles.reports}>
                <div className={styles.report}>
                    <h3>Report 1</h3>
                    <p>Report 1 description</p>
                </div>
                <div className={styles.report}>
                    <h3>Report 2</h3>
                    <p>Report 2 description</p>
                </div>
                <div className={styles.report}>
                    <h3>Report 3</h3>
                    <p>Report 3 description</p>
                </div>
            </div>
        </div>
    );
}