import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHoldingTransactions } from "../../redux/holdingTransactions";
import EditTransactionsModal from '../EditTransactionsModal';

const HoldingTransactions = () => {
    const { accountId, holdingId } = useParams();
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    const accountTransactionsData = useSelector(state => state.transactions.accountTransactions);
    const transactionsData = accountTransactionsData ? accountTransactionsData.transactions : [];
    const loading = useSelector(state => state.transactions.loading);
    const error = useSelector(state => state.transactions.error);

    useEffect(() => {
        if (accountId && holdingId) {
            dispatch(fetchHoldingTransactions(accountId, holdingId));
        }
    }, [dispatch, accountId, holdingId]);

    const handleEditClick = (transaction) => {
        setCurrentTransaction(transaction);
        setIsEditModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setCurrentTransaction(null);
    };
    
    const handleUpdate = (transactionId, updatedTransaction) => {
        dispatch(updateTransaction(accountId, holdingId, transactionId, updatedTransaction))
            .then(() => {
                dispatch(fetchHoldingTransactions(accountId, holdingId));
            })
            .finally(handleCloseModal);
    };

    const handleDelete = (transactionId) => {
        dispatch(deleteTransaction(accountId, holdingId, transactionId))
            .then(() => {
                dispatch(fetchHoldingTransactions(accountId, holdingId));
            })
            .finally(handleCloseModal);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div>
            <h2>Asset Transactions</h2>
            <button onClick={() => handleAdd()}>Add Transaction</button>
            <ul>
                {transactionsData.map((transaction, index) => (
                    <li key={index}>
                        <p>Transaction Description: {transaction.transactionDescription}</p>
                        <p>Date: {transaction.date}</p>
                        <p>Amount: {transaction.amount}</p>
                        <button onClick={() => handleEditClick(transaction)}>Edit</button>
                        <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {isEditModalOpen && (
                <EditTransactionsModal
                    transaction={currentTransaction}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
            {/* Include AddTransactionsModal and ConfirmDeleteModal as needed */}
        </div>
    );
};

export default HoldingTransactions;
