"use client"
import React, {useEffect, useState} from 'react';

import {readSelectedService, readServices, readUser} from '@/app/actions/readAction';
import {createTransaction} from '@/app/actions/createAction';

import styles from '@/app/ui/dashboard/newTransaction/newTransaction.module.css';
import {useSession} from "next-auth/react";
import JsPDF from "jspdf";

const NewTransaction = () => {
    const [customerName, setCustomerName] = useState('');
    const [selectedService, setSelectedService] = useState([]);
    const [selectedServiceData, setSelectedServiceData] = useState([]);
    const [services, setServices] = useState([]);
    const [transactionStatus, setTransactionStatus] = useState('Pending');
    const [showLink, setShowLink] = useState(false);
    const [userData, setUserData] = useState(null);
    const { data: session } = useSession();

    const [serviceLink, setServiceLink] = useState('');
    const [serviceCost, setServiceCost] = useState(null);
    const [serviceProfit, setServiceProfit] = useState(null);
    const [serviceName, setServiceName] = useState('');
    const [transactionID, setTransactionID] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await readUser(session?.user?.email);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (session?.user?.email) {
            fetchUserData().then(r => console.log("User data fetched successfully"));
        }
    }, [session?.user?.email]);
    const userEmail = session?.user?.email;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceData = await readServices();
                setServices(serviceData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSelectedServiceData = async () => {
            try {
                const serviceData = await readSelectedService(selectedService);
                setSelectedServiceData(serviceData);
                setServiceLink(serviceData.serviceLink)
                setServiceProfit(serviceData.serviceProfit)
                setServiceCost(serviceData.serviceCost)
                setServiceName(serviceData.serviceName)
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedService) {
            fetchSelectedServiceData();
        }
    }, [selectedService]);


    const handleServiceSelection = (event) => {
        setSelectedService(parseInt(event.target.value));
        setShowLink(true);
    };

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleMarkAsFailed = () => {
        setTransactionStatus('Failed');
    };

    const handleMarkAsComplete = () => {
        setTransactionStatus('Completed');
    };
    const generateBill = (transactionID) => {
        const transactionDate = new Date().toLocaleString();
        try {
            const doc = new JsPDF();
            let y = 10;
            doc.text(`Transaction ID: ${transactionID}`, 10, y);
            y += 10;
            doc.text(`Transaction Date: ${transactionDate}`, 10, y);
            y += 10;
            doc.text(`Customer Name: ${customerName}`, 10, y);
            y += 10;
            doc.text(`Service Name: ${serviceName}`, 10, y);
            y += 10;
            doc.text(`Service Cost: Rs. ${serviceCost}`, 10, y);

            y += 20;
            doc.text('Thank you!', 10, y);
            doc.save(`pdf_${Date.now()}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }

    }
    const handleSubmit = async (event) => {
        console.log(transactionStatus, userEmail , customerName, selectedService)

        event.preventDefault();
        try {
            const transactionID = await createTransaction(transactionStatus, userEmail , customerName, selectedService, serviceCost, serviceProfit);
            console.log(transactionID+" added to the database");

            generateBill(transactionID);
            setCustomerName('')
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={handleCustomerNameChange}
                    required
                />

                <>
                    <select value={selectedService} onChange={handleServiceSelection} required>
                        <option value="">Select Service</option>
                        {services.map((service) => (
                            <option key={service.serviceId} value={service.serviceId}>
                                {service.serviceName}
                            </option>
                        ))}
                    </select>
                    <div className={styles.bottomContainer}>
                        {showLink && (<a href={serviceLink}>Go to Service Link</a>)}
                        <div className={styles.buttonSet}>
                            <button className={styles.button} type="button" onClick={handleMarkAsComplete}>
                                Mark as Complete
                            </button>
                            <button className={styles.button} type="button" onClick={handleMarkAsFailed}>
                                Mark as Failed
                            </button>
                        </div>
                        <button className={`${styles.button} ${styles.submit}`} type="submit">
                            Complete Transaction
                        </button>
                    </div>
                </>
            </form>
        </div>
    );
};

export default NewTransaction;
