import {useRouter} from "next/router";
import styles from "@/app/ui/dashboard/staffs/staffs.module.css";

const DeleteButton = ({ staffId }) => {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/staffs/${staffId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                router.reload(); // Reload the page after deletion
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete staff member');
            }
        } catch (error) {
            console.error('Error deleting staff member:', error.message);
        }
    };

    return (
        <button className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteButton;