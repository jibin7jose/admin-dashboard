import styles from './loading.module.css'
const Loading = () => {
    return (
        <div className={styles.ring}>Loading
            <span id='circle'></span>
        </div>
    );
}

export default Loading;