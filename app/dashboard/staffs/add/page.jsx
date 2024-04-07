"use client"
import styles from '../../../ui/dashboard/staffs/addStaff/add.module.css'
import {useState} from "react";
import {useRouter} from "next/navigation";
const AddStaff = () => {
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPhone, setStaffPhone] = useState('');
    const [salary, setSalary] = useState(0);
    const [staffRole, setStaffRole] = useState('C-Staff');

    const router = useRouter();
    const handleStaffNameChange = (event) => {
        setStaffName(event.target.value);
    }

    const handleStaffRole = (event) => {
        setStaffRole(event.target.value);
    }

    const handleStaffEmailChange = (event) => {
        setStaffEmail(event.target.value);
    }

    const handleStaffPhoneChange = (event) => {
        setStaffPhone(event.target.value);
    }

    const handleSalaryChange = (event) => {
        setSalary(parseInt(event.target.value));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch('../../../api/addStaff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({staffName, staffRole, staffEmail, staffPhone, salary}) })

            router.refresh()
        } catch (error) {
            console.error(error);
        }
        setStaffName('');
        setStaffRole('C-Staff');
        setStaffEmail('');
        setStaffPhone('');
        setSalary(0);
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder='Name' name='name' id='name' value={staffName}
                       onChange={handleStaffNameChange} required/>
                <select name="role" id="role" value={staffRole} onChange={handleStaffRole} required>
                    <option value="M-Staff">
                        M-Staff
                    </option>
                    <option value="C-Staff">
                        C-Staff
                    </option>
                </select>
                <input type='text' name="email" id="email" value={staffEmail} onChange={handleStaffEmailChange}
                       placeholder='E-mail' required/>
                <input type='number' name="phone" id="phone" value={staffPhone} onChange={handleStaffPhoneChange}
                       placeholder='Phone No.' required/>
                <input type="number" id='salary' placeholder='Salary (INR)' name='salary' value={salary}
                       onChange={handleSalaryChange} required/>
                {/*<textarea name="address" id="address" rows='16' placeholder='Address'></textarea>*/}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddStaff;