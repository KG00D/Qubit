import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactions } from "../../redux/accountTransactions";
import EditTransactionsModal from "../EditTransactionsModal";
import "./AccountTransactions.css";

const AccountTransactions = () => {
  const dispatch = useDispatch();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewTransaction, setIsAddingNewTransaction] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState(null);

  const accountsData = useSelector((state) => state.accounts.accounts) || [];
  const transactionsData =
    useSelector((state) => state.transactions.accountTransactions) || [];
  const holdingsData = useSelector((state) => state.holdings) || {};

  useEffect(() => {
    dispatch(fetchAccountTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (accountsData.length > 0 && !currentAccountId) {
      setCurrentAccountId(accountsData[0].id);
    }
  }, [accountsData, currentAccountId]);

  const getHoldingsForAccount = (accountId) => {
    const accountHoldings = holdingsData[accountId]?.accountHoldings;
    if (!accountHoldings) {
      return [];
    }
    return Object.values(accountHoldings).map((holding) => ({
      id: holding.id,
      securityName: holding.securityName,
      holdingName: holding.holdingName,
    }));
  };

  const [modalHoldings, setModalHoldings] = useState([]);

  const handleAddNewTransactionClick = (accountId) => {
    setIsAddingNewTransaction(true);
    setCurrentTransaction(null);
    setCurrentAccountId(accountId);
    const holdingsForModal = getHoldingsForAccount(accountId);
    setModalHoldings(holdingsForModal);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setIsAddingNewTransaction(false);
    setCurrentTransaction(transaction);
    setCurrentAccountId(transaction.accountId);
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

  const groupedTransactions = transactionsData.reduce((acc, transaction) => {
    const { accountId, holdingId } = transaction;

    if (!acc[accountId]) acc[accountId] = {};
    if (!acc[accountId][holdingId]) acc[accountId][holdingId] = [];

    acc[accountId][holdingId].push(transaction);
    return acc;
  }, {});

  const toFixedSafe = (value, digits = 2) => {
    if (value === null || value === undefined || isNaN(value)) {
      return (0).toFixed(digits);
    }
    return value.toFixed(digits);
  };

  return (
    <div>
      {accountsData.map((account) => {
        const accountTransactions = groupedTransactions[account.id] || {};

        return (
          <div key={account.id}>
            <h2 className="reports-header">{account.name} Transactions</h2>
            <hr className="divider" />
            <button onClick={() => handleAddNewTransactionClick(account.id)}>
              Add New Transaction
            </button>
            {Object.entries(accountTransactions).map(
              ([holdingId, transactions]) => (
                <div key={holdingId}>
                  <h3>
                    {holdingsData[account.id]?.accountHoldings[holdingId]
                      ?.holdingName || "Unknown Holding"}
                  </h3>
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
                          <td>${transaction.securityName}</td>
                          <td>${transaction.amount?.toFixed(2) || "N/A"}</td>
                          <td>
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td>{transaction.transactionDescription}</td>
                          <td>${toFixedSafe(transaction.price) || "N/A"}</td>
                          <td>{transaction.quantity}</td>
                          <td>
                            <button
                              onClick={() => handleEditClick(transaction)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        );
      })}
      {isModalOpen && (
        <EditTransactionsModal
          transaction={currentTransaction}
          onClose={handleCloseModal}
          onUpdate={handleSubmit}
          onDelete={handleDelete}
          isAdding={isAddingNewTransaction}
          holdings={modalHoldings}
          accountId={currentAccountId}
        />
      )}
    </div>
  );
};

export default AccountTransactions;
