"use client"

import styles from '../../../ui/dashboard/staffs/addStaff/add.module.css'
import {useState} from "react";
import {useRouter} from "next/navigation";

const AddService = () => {
    const [serviceName, setServiceName] = useState('');
    const [serviceCost, setServiceCost] = useState(null);
    const [serviceProfit, setServiceProfit] = useState(null);
    const [serviceLink, setServiceLink] = useState('');

    const router = useRouter();

    const handleServiceNameChange = (event) => {
        setServiceName(event.target.value);
    }

    const handleServiceCostChange = (event) => {
        setServiceCost(event.target.value);
    }

    const handleServiceProfitChange = (event) => {
        setServiceProfit(event.target.value);
    }

    const handleServiceLinkChange = (event) => {
        setServiceLink(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch('../../../api/addService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({serviceName, serviceCost, serviceProfit, serviceLink}) })

            router.refresh()
        } catch (error) {
            console.error(error);
        }

        setServiceName('');
        setServiceCost(null);
        setServiceProfit(null);
        setServiceLink('');
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder='Service Name' name='serviceName' value={serviceName} onChange={handleServiceNameChange} required />
                <input type='number' name="serviceCost" id="serviceCost" placeholder='Service Cost' value={serviceCost.toString()} required/>
                <input type='number' name="serviceProift" id="serviceProfit" placeholder='Service Profit' value={serviceProfit.toString()} required/>
                <textarea name="serviceLink" id="serviceLink" rows='1' placeholder='Service Link' value={serviceLink}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddService;