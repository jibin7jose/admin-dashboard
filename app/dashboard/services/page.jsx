import styles from 'app/ui/dashboard/services/services.module.css'
import Search from "@/app/ui/dashboard/search/search";
const ServicesPage = ({placeholder}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder={placeholder} />
            </div>
            <table className={styles.table}></table>
        </div>
    );
}

export default ServicesPage;