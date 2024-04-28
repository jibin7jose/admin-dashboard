'use client'
import styles from './attendance.module.css'
import {MdSupervisedUserCircle} from "react-icons/md";
import {useEffect, useState} from 'react';
import {readAttendance, readAttendanceCount} from "@/app/actions/readAction";

const getDaysInMonth = (year, month) => {
    return new Date(year, month , 0).getDate();
}

const Attendance = ({email}) => {
    const date = new Date().toDateString();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const daysInMonth = getDaysInMonth(year, month);
    let monthString = new Date().toLocaleString('default', { month: 'long' }) + " " + year;
    const ordinalDayCount = new Date().getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [attendance, setAttendance] = useState(null);
    const [distinctDatesCount, setDistinctDatesCount] = useState(1);
    // const distinctDatesCount = attendance.reduce((count, entry) => {
    //     // Extract the date from each attendance entry
    //     const dateString = entry.date.toDateString(); // Convert to string for simplicity
    //
    //     // Initialize a Set to keep track of unique dates
    //     if (!count.uniqueDatesSet.has(dateString)) {
    //         count.uniqueDatesSet.add(dateString);
    //         count.count++; // Increment the count for each unique date
    //     }
    //
    //     return count;
    // }, { count: 0, uniqueDatesSet: new Set() }).count;

    console.log(distinctDatesCount);
    useEffect(() => {
        const fetchedAttendance = async () => {
            try {
                const fetchedData = await readAttendance(email);
                setAttendance(fetchedData.toString());
            } catch (error) {
                console.error('Error fetching attendance:', error);
            }
        }
    }, []);

    useEffect(() => {
        const countDistinctDates = async () => {
            try {
                const fetchedData = await readAttendanceCount(email);
                console.log(fetchedData);
                setDistinctDatesCount(fetchedData);
            } catch (error) {
                return error;
            }
        }
    }, []);

    let totalAttendance = Math.round(distinctDatesCount/ordinalDayCount * 100);
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>{monthString}</span>
                <span className={styles.number}>{distinctDatesCount}/{daysInMonth}</span>
                <span className={styles.detail}>
                     i.e., <span className={totalAttendance > 50 ? styles.positive : styles.negative}>{totalAttendance}%</span> so far.
                </span>
            </div>
        </div>
    );
}

export default Attendance;