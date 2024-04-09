"use client"
import styles from './chart.module.css'
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const Chart = () => {
    const data = [
        {
            name: 'Sunday',
            revenue: 4000,
            profit: 2400,
            amt: 2400,
        },
        {
            name: 'Monday',
            revenue: 3000,
            profit: 1398,
            amt: 2210,
        },
        {
            name: 'Tuesday',
            revenue: 3000,
            profit: 2800,
            amt: 2290,
        },
        {
            name: 'Wednesday',
            revenue: 2780,
            profit: 3908,
            amt: 2000,
        },
        {
            name: 'Thurdsay',
            revenue: 5890,
            profit: 4800,
            amt: 2181,
        },
        {
            name: 'Friday',
            revenue: 4390,
            profit: 3800,
            amt: 2500,
        },
        {
            name: 'Saturday',
            revenue: 5490,
            profit: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Weekly Recap</h2>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{background: "#151c2c", border: "none"}} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="profit" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;