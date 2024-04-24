"use client"
import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import {readMyTransactions, readUser} from "@/app/actions/readAction";
import {useSession} from "next-auth/react";

const Chart = () => {
    const [cdata, setData] =  useState([]);
    const [userData, setUserData] = useState(null);
    const { data: session } = useSession();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await readUser(session?.user.email);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (session?.user?.email) {
            fetchUserData().then(r => console.log("User data fetched successfully"));
        }
    }, [session?.user?.email]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cdata = await readMyTransactions(session?.user?.email);
                setData(cdata);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Daily Profit Stats</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={cdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="transactionTime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;