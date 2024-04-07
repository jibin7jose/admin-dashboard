"use client"
import React, { useEffect, useState } from 'react';
import styles from 'app/ui/dashboard/newTransaction/newTransaction.module.css';
import { readStaffs, readServices, readSelectedService } from "@/app/actions/readAction";
import { useRouter } from 'next/navigation';


const NewTransaction = () => {
    const router = new useRouter();
    const [customerName, setCustomerName] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selfAssigned, setSelfAssigned] = useState(false);
    const [serviceLink, setServiceLink] = useState('');
    const [showLinks, setShowLinks] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState({});
    const [transactionStatus, setTransactionStatus] = useState('Pending');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffData = await readStaffs();
                const serviceData = await readServices();
                setStaffs(staffData);
            
                let servicesHashMap = {};
                serviceData.forEach((service) => {
                    servicesHashMap[service.serviceId] = service.serviceName;
                });

                setServices(servicesHashMap);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const fetchServiceLink = async () => {
        try {
            const serviceData = await readSelectedService(selectedService);
            console.log('Service Data:', serviceData); // Log the data returned by readSelectedService
            setServiceLink(serviceData.serviceLink);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedService) {
            fetchServiceLink();
        }
    }, [selectedService]);

    const handleServiceSelection = async (event) => {
        // setShowLinks(true);
        const selectedServiceId = event.target.value;
        setSelectedService(selectedServiceId);
        await fetchServiceLink(selectedServiceId);
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
            // Push Token to the database
            await fetch('../../api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerName: customerName,
                    assignedTo: selectedStaff
                })
            });
    
            // Push Transaction to the database
            await fetch('../../api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionStatus: transactionStatus,
                    serviceId: selectedService,
                    servedBy: selectedStaff
                })
            });
            router.refresh();
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
                            {Object.entries(services).map(([serviceId, serviceName]) => (
                                <option key={serviceId} value={serviceId}>
                                    {serviceName}
                                </option>
                            ))}
                        </select>
                        <div className={styles.bottomContainer}>
                            <a href={serviceLink} target="_blank" rel="noopener noreferrer">
                                Go to Service link
                            </a>
                            <div className={styles.buttonSet}>
                                <button className={styles.button} type="submit" onClick={handleMarkAsComplete}>
                                    Mark as Complete
                                </button>
                                <button className={styles.button} type="submit" onClick={handleTransactionFailure}>
                                    Mark as Failed
                                </button>
                            </div>
                            
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
