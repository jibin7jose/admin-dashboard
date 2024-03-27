import styles from './rightbar.module.css'
import Astronaut from 'public/astronaut.png'
import Image from 'next/image'
import {MdEmergencyRecording} from "react-icons/md";
const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src={Astronaut} alt="" fill/>
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>Report Abuse!</span>
                    <h3>Facing harassment from a customer?</h3>
                    <span>Record the instance.</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid atque consequuntur
                        debitis ducimus, eos esse expedita fuga, id magnam nemo neque quidem saepe, sapiente vel.
                        Aspernatur ea incidunt iusto?</p>
                    <button className={styles.button}>
                        <MdEmergencyRecording/>Record
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.texts}>
                    <span className={styles.notification}>Report Abuse!</span>
                    <h3>Facing harassment from a customer?</h3>
                    <span>Record the instance.</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid atque consequuntur
                        debitis ducimus, eos esse expedita fuga, id magnam nemo neque quidem saepe, sapiente vel.
                        Aspernatur ea incidunt iusto?</p>
                    <button className={styles.button}>
                        <MdEmergencyRecording/>Record
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rightbar;