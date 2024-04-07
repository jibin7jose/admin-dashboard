"use client"
import React, { useEffect, useState } from 'react';
import styles from 'app/ui/dashboard/newTransaction/newTransaction.module.css';
import { readStaffs, readServices, readServiceLink } from "@/app/actions/readAction";

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
                const serviceData = await readServices();
                setStaffs(staffData);
                setServices(serviceData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const fetchServiceLink = async (selectedService) => {
        try {
            const serviceLink = await readServiceLink(selectedService);
            setServiceLink(serviceLink.toString());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedService) {
            fetchServiceLink(selectedService);
        }
    }, [selectedService]);

    const handleServiceSelection = (event) => {
        setShowLinks(true);
        setSelectedService(event.target.value);
    };

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleStaffSelection = (event) => {
        setSelectedStaff(event.target.value);
    };

    const handleAssignToSelf = () => {
        setSelectedStaff('Self');
        fetchServiceLink(selectedService);
        setSelfAssigned(true);
    };

    const handleTransactionFailure = () => {
        console.log('Marking transaction as discarded...');
        setSelfAssigned(false);
        setShowLinks(false);
        setTransactionStatus('Failed');
    };

    const handleMarkAsComplete = () => {
        console.log('Marking transaction as complete...');
        setSelfAssigned(false);
        setShowLinks(false);
        setTransactionStatus('Completed');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Your logic for handling the transaction
        } catch (error) {
            console.error(error);
        }
        setCustomerName('');
        setSelectedStaff('');
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
                        <option key={staff.staffName} value={staff.staffName}>
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
                                <option key={service.serviceName} value={service.serviceName}>
                                    {service.serviceName}
                                </option>
                            ))}
                        </select>
                        <a href={serviceLink} target="_blank" rel="noopener noreferrer">
                            Go to Service link
                        </a>
                        <button className={styles.button} type="button" onClick={handleMarkAsComplete}>
                            Mark as Complete
                        </button>
                        <button className={styles.button} type="button" onClick={handleTransactionFailure}>
                            Mark as Failed
                        </button>
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
