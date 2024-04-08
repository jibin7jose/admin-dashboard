"use client"
import React, { useEffect, useState } from 'react';

import { readStaffs, readServices, readSelectedService } from '@/app/actions/readAction';
import { createToken } from '@/app/actions/createAction';

import styles from '@/app/ui/dashboard/newTransaction/newTransaction.module.css';

const NewTransaction = () => {
    
    const [customerName, setCustomerName] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selfAssigned, setSelfAssigned] = useState(false);
    const [serviceLink, setServiceLink] = useState('');
    const [showLinks, setShowLinks] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    const [transactionStatus, setTransactionStatus] = useState('Pending');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffData = await readStaffs();
                setStaffs(staffData);

                const serviceData = await readServices();
                setServices(serviceData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchServiceLink = async () => {
            try {
                const serviceData = await readSelectedService(selectedService);
                setServiceLink(serviceData.serviceLink);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedService) {
            fetchServiceLink();
        }
    }, [selectedService]);


    const handleServiceSelection = (event) => {
        const selectedServiceId = event.target.value;
        setSelectedService(selectedServiceId);
    };

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleStaffSelection = (event) => {
        setSelectedStaff(event.target.value);
    };

    const handleAssignToSelf = () => {
        setSelectedStaff('Self');
        setSelfAssigned(true);
    };

    const handleMarkAsFailed = () => {
        console.log('Marking transaction as failed...');
        setTransactionStatus('Failed');
    };

    const handleMarkAsComplete = () => {
        console.log('Marking transaction as complete...');
        setTransactionStatus('Completed');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let servedBy = parseInt(selectedStaff);

            const tokenData = {
                customerName,
                servedBy
            };

            const token = await createToken(tokenData);

            console.log('Token created:', token);

            setCustomerName('');
            setSelectedStaff('');
            setSelectedService('');
            setTransactionStatus('Pending');
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
                <select value={selectedStaff} onChange={handleStaffSelection} required>
                    <option value="">Select Staff</option>
                    {staffs.map((staff) => (
                        <option key={staff.staffId} value={staff.staffId}>
                            {staff.staffName}
                        </option>
                    ))}
                    <option value="Self">Self</option>
                </select>
                {selectedStaff === 'Self' && (
                    <button className={styles.button} type="button" onClick={handleAssignToSelf}>
                        Self Assign
                    </button>
                )}
                {selfAssigned && (
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
                            <a href={serviceLink} target="_blank" rel="noopener noreferrer">
                                Go to Service link
                            </a>
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
                )}
                {selectedStaff !== 'Self' && (
                    <button className={styles.button} type="submit">Assign to {selectedStaff}</button>
                )}
            </form>
        </div>
    );
};

export default NewTransaction;
