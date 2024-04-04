"use client"
import styles from '../../../ui/dashboard/staffs/addStaff/add.module.css'
import {useState} from "react";
import {useRouter} from "next/navigation";

const AddService = () => {
    let [serviceName, setServiceName] = useState('');
    let [serviceCost, setServiceCost] = useState(0);
    let [serviceProfit, setServiceProfit] = useState(0);
    let [serviceLink, setServiceLink] = useState('');

    const router = useRouter();

    const handleServiceNameChange = (event) => {
        setServiceName(event.target.value);
    }

    const handleServiceCostChange = (event) => {
        setServiceCost(parseInt(event.target.value));
    }

    const handleServiceProfitChange = (event) => {
        setServiceProfit(parseInt(event.target.value));
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
        setServiceCost(0);
        setServiceProfit(0);
        setServiceLink('');
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder='Service Name' name='serviceName' value={serviceName} onChange={handleServiceNameChange} required />
                <input type='number' name="serviceCost" id="serviceCost" placeholder='Service Cost' value={serviceCost} onChange={handleServiceCostChange} required/>
                <input type='number' name="serviceProift" id="serviceProfit" placeholder='Service Profit' value={serviceProfit} onChange={handleServiceProfitChange} required/>
                <input type='text' name="serviceLink" id="serviceLink" placeholder='Service Link' value={serviceLink} onChange={handleServiceLinkChange}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddService;