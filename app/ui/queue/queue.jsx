export const Queue = (staffName) => {
    return (
        <div className={styles.container}>
            <h2>{staffName}</h2>
            <div className={styles.queue}>
                {/* {queue.map((transaction) => (
                    <div key={transaction.transactionId} className={styles.queueItem}>
                        <h3>{transaction.customerName}</h3>
                        <p>Token ID: {transaction.tokenId}</p>
                        <p>Transaction ID: {transaction.transactionId}</p>
                        {Staffs.map((staff) => (
                        <select key={staff.staffId} value={selectedStaff} onChange={handleStaffSelection} required>
                            <option value="">Select Staff</option>
                            {staffs.map((staff) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                    {staff.staffName}
                                </option>
                            ))}
                        </select>
                    )}
                    <button onClick={() => 
                    </div>
                ))} */}
                
            </div>
        </div>
    );
}