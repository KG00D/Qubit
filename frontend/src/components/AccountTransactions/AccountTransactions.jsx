import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountTransactions } from "../../redux/accountTransactions";
import EditTransactionsModal from '../EditTransactionsModal';
import "./AccountTransactions.css";

const AccountTransactions = () => {
    const dispatch = useDispatch();
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNewTransaction, setIsAddingNewTransaction] = useState(false);

    const accountsData = useSelector(state => state.accounts.accounts) || [];
    const transactionsData = useSelector(state => state.transactions.accountTransactions) || [];
    const holdingsData = useSelector(state => state.holdings) || {};

    useEffect(() => {
        dispatch(fetchAccountTransactions());
    }, [dispatch]);

    const getHoldingsForAccount = (accountId) => {
        const accountHoldings = holdingsData[accountId]?.accountHoldings;
        if (!accountHoldings) {
            return [];
        }
        return Object.values(accountHoldings).map(holding => ({
            id: holding.id,
            securityName: holding.securityName,
            holdingName: holding.holdingName,
        }));
    };

    const [modalHoldings, setModalHoldings] = useState([]);

    const handleAddNewTransactionClick = () => {
        setIsAddingNewTransaction(true);
        setCurrentTransaction(null);
        const holdingsForModal = getHoldingsForAccount(currentAccountId);
        setModalHoldings(holdingsForModal);
        setIsModalOpen(true);
    };

    const handleEditClick = (transaction) => {
        setIsAddingNewTransaction(false);
        setCurrentTransaction(transaction);
        const holdingsForModal = getHoldingsForAccount(transaction.accountId);
        setModalHoldings(holdingsForModal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };

    const handleSubmit = (transactionData) => {};
    const handleDelete = (transactionId) => {};

    const [currentAccountId, setCurrentAccountId] = useState(accountsData[0]?.id);

    useEffect(() => {
        if (currentAccountId) {
            setModalHoldings(getHoldingsForAccount(currentAccountId));
        }
    }, [currentAccountId, holdingsData]);

    const groupedTransactions = transactionsData.reduce((acc, transaction) => {
        const { accountId, holdingId } = transaction;

        if (!acc[accountId]) acc[accountId] = {};
        if (!acc[accountId][holdingId]) acc[accountId][holdingId] = [];

        acc[accountId][holdingId].push(transaction);
        return acc;
    }, {});

    return (
        <div>
            <button onClick={handleAddNewTransactionClick}>Add New Transaction</button>
            <div>
    {Object.entries(groupedTransactions).map(([accountId, holdings]) => (
        <div key={accountId}>
            <h2>{accountsData.find(account => account.id.toString() === accountId)?.name} Transactions</h2>
            {Object.entries(holdings).map(([holdingId, transactions]) => (
                <div key={holdingId}>
                    <h3>{holdingsData[accountId]?.accountHoldings[holdingId]?.holdingName || 'Unknown Holding'}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Security</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.securityName}</td>
                                    <td>${transaction.amount?.toFixed(2) || 'N/A'}</td>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td>{transaction.transactionDescription}</td>
                                    <td>${transaction.price?.toFixed(2) || 'N/A'}</td>
                                    <td>{transaction.quantity}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    ))}
</div>
            
            {isModalOpen && (
                <EditTransactionsModal
                    transaction={currentTransaction}
                    onClose={handleCloseModal}
                    onUpdate={handleSubmit}
                    onDelete={handleDelete}
                    isAdding={isAddingNewTransaction}
                    holdings={modalHoldings}
                />
            )}
        </div>
    );
};

export default AccountTransactions;
