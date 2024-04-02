import styles from '../../../ui/dashboard/staffs/addStaff/add.module.css'
const AddStaff = () => {
    const { addStaff, deleteStaff, updateStaff } = require('db/db.js');
    return (
        <div className={styles.container}>
            <form action="createStaff" className={styles.form}>

                <input type="text" placeholder='First Name' name='fname' required/>
                <input type="text" placeholder='Last Name' name='lname' required/>
                <select name="role" id="role">
                    <option value="general">
                        Choose Role
                    </option>
                    <option value="m">
                        M-Staff
                    </option>
                    <option value="c">
                        C-Staff
                    </option>
                </select>

                <input type='number' name="aadhar" id="aadhar" placeholder='Aadhar No.'/>
                <input type='number' name="phone" id="phone" placeholder='Phone No.'/>

                <input type="number" id='salary' placeholder='Salary (INR)' name='salary'/>
                <textarea name="address" id="address" rows='16' placeholder='Address'></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddStaff;