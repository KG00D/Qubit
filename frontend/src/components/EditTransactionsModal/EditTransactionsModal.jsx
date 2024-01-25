import { useState, useEffect } from 'react';

const EditTransactionsModal = ({ transaction, onClose, onUpdate, onDelete }) => {
    const [updatedTransaction, setUpdatedTransaction] = useState(transaction);

    useEffect(() => {
        setUpdatedTransaction(transaction);
    }, [transaction]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTransaction({ ...updatedTransaction, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(transaction.id, updatedTransaction); 
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Transaction Type:
                        <input
                            type="text"
                            name="transactionType"
                            value={updatedTransaction.transactionType || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={updatedTransaction.date || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            name="amount"
                            value={updatedTransaction.amount || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={updatedTransaction.description || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => onDelete(transaction.id)}>Delete Transaction</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionsModal;
