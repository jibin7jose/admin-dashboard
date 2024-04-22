import styles from './card.module.css'
import {MdSupervisedUserCircle} from "react-icons/md";

const Attendance = ({title}) => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>{title} Revenue</span>
                <span className={styles.number}>Rs. 0</span>
                <span className={styles.detail}>
                    {/* <span className={styles.positive}>12%</span> more than yesterday. */}
                </span>
            </div>
        </div>
    );
}

export default Card;