"use client"

/*
This code should be in such a way that the UI intakes Customer Name and the drop down list should have all the staffs fetched from staffs table(Prisma) and an extra option to self assign the token. Every time the token number should be incremented. If the token is self assigned, serviceLink from services should be fetched and clickable
links should be displayed on the screen. Also, a submit button with "Mark as complete should be displayed".If the token is not self assigned, the UI should just display the submit button with label "Assign".


*/ 

// import styles from 'app/ui/dashboard/newTransaction/newTransaction.module.css';
import React, { useEffect, useState } from 'react';
import styles from 'app/ui/dashboard/newTransaction/newTransaction.module.css';


const NewTransaction = () => {
    const [customerName, setCustomerName] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [tokenNumber, setTokenNumber] = useState('');
    const [showLinks, setShowLinks] = useState(false);
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await fetch('/api/staffs');
                const data = await response.json();
                setStaffs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStaffs();
    }, []);

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleStaffSelection = (event) => {
        setSelectedStaff(event.target.value);
    };

    const generateToken = () => {
        const token = Math.floor(Math.random() * 1000000);
        setTokenNumber(token);
    };

    const handleAssignToSelf = () => {
        setSelectedStaff('Self');
        setShowLinks(true);
    };

    const handleMarkAsComplete = () => {
        console.log('Marking transaction as complete...');
        setCustomerName('');
        setSelectedStaff('');
        setTokenNumber('');
        setShowLinks(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetch('/api/newTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerName, selectedStaff, tokenNumber })
            });
            router.refresh();
        } catch (error) {
            console.error(error);
        }
        setCustomerName('');
        setSelectedStaff('');
        setTokenNumber('');
        setShowLinks(false);
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
                        <option key={staff.id} value={staff.name}>
                            {staff.name}
                        </option>
                    ))}
                    <option value="Self">Self</option>
                    <option value="Dhanaraja">Dhanaraja</option>
                </select>
                {selectedStaff === 'Self' && (
                    <button className={styles.button} type="button" onClick={handleAssignToSelf}>
                        Self Assign
                    </button>
                )}
                {showLinks && (
                    <>
                        {/* Fetch serviceLink from services and display clickable links here */}
                        <button className={styles.button} type="button" onClick={handleMarkAsComplete}>
                            Mark as Complete
                        </button>
                    </>
                )}
                {selectedStaff !== 'Self' && (
                    <button className={styles.button} type="submit">Assign to {selectedStaff}</button>
                )}
                
            </form>
            <div className={styles.tokenContainer}>
                <button onClick={generateToken}>Generate Token</button>
                {tokenNumber && <p>Token Number: {tokenNumber}</p>}
            </div>
        </div>
    );
};

export default NewTransaction;
