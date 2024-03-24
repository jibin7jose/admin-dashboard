import Sidebar from "@/app/ui/dashboard/sidebar/sidebar";
import Navbar from "@/app/ui/dashboard/navbar/navbar";
import styles from "../ui/dashboard/dashboard.module.css"
const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}><Sidebar /></div>
            <div className={styles.content}><Navbar /></div>
            {children}
        </div>
    );
}

export default Layout