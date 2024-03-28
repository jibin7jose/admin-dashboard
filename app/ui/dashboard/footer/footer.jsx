import styles from './footer.module.css'
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <p>solidServe™ for Akshaya e-Centers</p>
            </div>
            <div className={styles.text}>
                <p> © 2024. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;