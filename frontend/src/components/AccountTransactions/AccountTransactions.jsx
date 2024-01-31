import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, fetchAccountTransactions, updateTransaction, addTransaction } from "../../redux/accountTransactions";
import EditTransactionsModal from '../EditTransactionsModal';
import "./AccountTransactions.css";

    const getUniqueSecurityNamesByAccount = (transactions) => {
        const securityNamesMap = {};

        transactions.forEach(transaction => {
            if (transaction.accountId) {
                if (!securityNamesMap[transaction.accountId]) {
                    securityNamesMap[transaction.accountId] = new Set();
                }
                securityNamesMap[transaction.accountId].add(transaction.securityName);
            }
        });

        return Object.values(securityNamesMap).flatMap(item => [...item]);
    };
const AccountTransactions = () => {
    const dispatch = useDispatch();
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNewTransaction, setIsAddingNewTransaction] = useState(false);

    const accountsData = useSelector(state => state.accounts.accounts) || [];
    const transactionsData = useSelector(state => state.transactions.accountTransactions) || [];
    const [modalHoldings, setModalHoldings] = useState(getUniqueSecurityNamesByAccount(transactionsData));
    const holdingsData = useSelector(state => state.holdings) || {};
    const loading = useSelector(state => state.transactions.loading);
    const error = useSelector(state => state.transactions.error);

    const [currentAccountId, setCurrentAccountId] = useState(null);
    const [currentHoldingId, setCurrentHoldingId] = useState(null);

    useEffect(() => {
        dispatch(fetchAccountTransactions());
    }, [dispatch]);

    const accountNamesMap = accountsData.reduce((acc, account) => {
        acc[account.id] = account.name;
        return acc;
    }, {});



    const uniqueSecurityNamesByAccount = getUniqueSecurityNamesByAccount(transactionsData);
    console.log(uniqueSecurityNamesByAccount, 'UNIQUE SECURITY NAMES ARE HERE')

    const groupedTransactions = transactionsData.reduce((acc, transaction) => {
        const { accountId, holdingId } = transaction;
        const accountName = accountNamesMap[accountId];

        if (!acc[accountId]) {
            acc[accountId] = { accountName, holdings: {} };
        }
        if (!acc[accountId].holdings[holdingId]) {
            acc[accountId].holdings[holdingId] = { transactions: [] };
        }

        acc[accountId].holdings[holdingId].transactions.push(transaction);
        return acc;
            },
        {});

    const handleAddNewTransactionClick = () => {
    setIsAddingNewTransaction(true);
    setCurrentTransaction(null);
    const holdingsForModal = currentAccountId && uniqueSecurityNamesByAccount[currentAccountId]
        ? Array.from(uniqueSecurityNamesByAccount[currentAccountId]).map(name => ({
              id: name,
              securityName: name
          }))
        : [];
    setIsModalOpen(true, holdingsForModal);
};


    const handleUpdate = (updatedTransaction) => {
        const transactionId = updatedTransaction.id;
        dispatch(updateTransaction(transactionId, updatedTransaction))
            .finally(handleCloseModal);
    };

    const handleEditClick = (transaction) => {
    setIsAddingNewTransaction(false);
    setCurrentTransaction(transaction);
    setCurrentAccountId(transaction.accountId);
    setCurrentHoldingId(transaction.holdingId);
    const holdingsForModal = transaction.accountId && uniqueSecurityNamesByAccount[transaction.accountId]
        ? Array.from(uniqueSecurityNamesByAccount[transaction.accountId]).map(name => ({
              id: name,
              securityName: name
          }))
        : [];
    setIsModalOpen(true, holdingsForModal);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
        setCurrentAccountId(null);
        setCurrentHoldingId(null);
    };

    const handleSubmit = (transactionData) => {
        if (isAddingNewTransaction) {
            dispatch(addTransaction(transactionData)) 
                .finally(handleCloseModal);
        } else {
            const transactionId = transactionData.id;
            dispatch(updateTransaction(transactionId, transactionData))
                .finally(handleCloseModal);
        }
    };

    const handleDelete = (transactionId) => {
        dispatch(deleteTransaction(transactionId))
            .finally(handleCloseModal);
    };

    const openModalWithHoldings = (isOpen, holdings = []) => {
    setIsModalOpen(isOpen);
    setModalHoldings(holdings);
    };

    console.log("Current Account ID:", currentAccountId);
    console.log("Unique Security Names by Account:", uniqueSecurityNamesByAccount);

    console.log("Is Modal Open:", isModalOpen);
    console.log("Modal Holdings:", modalHoldings);


    const holdingsForDropdown = currentAccountId && uniqueSecurityNamesByAccount[currentAccountId]
            ? Array.from(uniqueSecurityNamesByAccount[currentAccountId]).map(name => ({
          id: name,
          securityName: name
      }))
    : [];

    console.log("Holdings for Dropdown:", holdingsForDropdown);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={handleAddNewTransactionClick}>Add New Transaction</button>
            {Object.entries(groupedTransactions).map(([accountId, accountData]) => (
                <div key={accountId}>
                    <h2>{accountData.accountName} Transactions</h2>
                    {Object.entries(accountData.holdings).map(([holdingId, holdingData]) => (
                        <div key={holdingId}>
                            <h3>{holdingData.securityName}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Security Name</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Transaction Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holdingData.transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.securityName}</td>
                                            <td>${transaction.amount.toFixed(2)}</td>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.transactionDescription}</td>
                                            <td>${transaction.price.toFixed(2)}</td>
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
            
            {isModalOpen && (
                <EditTransactionsModal
                    transaction={currentTransaction}
                    accountId={currentAccountId}
                    holdingId={currentHoldingId}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    holdings={modalHoldings}
                    //holdings={[{ id: '1', securityName: 'Test Security' }]}
                />
            )}
        </div>
    );
};

export default AccountTransactions;