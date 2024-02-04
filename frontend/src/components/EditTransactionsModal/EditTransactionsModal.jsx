import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction, deleteTransaction, addTransaction } from "../../redux/accountTransactions";
import AccountTransactions from '../AccountTransactions';
import "./EditTransactionsModal.css";

const EditTransactionsModal = ({ transaction, onClose, isAdding, holdings = [] }) => {
    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();

    const defaultTransaction = {
        holdingId: '',
        accountId: '',
        transactionType: '',
        amount: '',
        date: '',
        fees: '',
        securityName: '',
        transactionDescription: '',
        price: '',
        quantity: ''
    };

    const [updatedTransaction, setUpdatedTransaction] = useState(
        isAdding ? defaultTransaction : transaction || defaultTransaction
    );

    useEffect(() => {
        setUpdatedTransaction(isAdding ? defaultTransaction : transaction || defaultTransaction);
    }, [transaction, isAdding]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTransaction(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSecuritySelection = (e) => {
        const selectedSecurityName = e.target.value;
        const selectedHolding = holdings.find(holding => holding.securityName === selectedSecurityName);

        setUpdatedTransaction(prevState => ({
            ...prevState,
            holdingId: selectedHolding ? selectedHolding.id : '',
            securityName: selectedSecurityName
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const preparedTransactionData = Object.entries(updatedTransaction).reduce((acc, [key, value]) => {
            acc[key] = value === '' ? null : value;
            return acc;
        }, {});

        if (isAdding || !preparedTransactionData.id) {
            dispatch(addTransaction(preparedTransactionData));
        } else {
            dispatch(updateTransaction(preparedTransactionData.id, preparedTransactionData));
        }

        onClose();
};

    const handleDelete = () => {
        if (transaction && transaction.id) {
            dispatch(deleteTransaction(transaction.id));
        }
        onClose();
    };

    const transactionTypes = ["Open", "Buy", "Sell", "Cash Dividend", "Reinvested Dividend", "Value Update"];


      const holdingsOptions = transactions.length > 0
        ? transactions.map(AccountTransactions => (
              <option key={AccountTransactions.id} value={AccountTransactions.securityName}>
                  {AccountTransactions.securityName}
              </option>
          ))
        : [<option key="no-holdings" value="" disabled>No Holdings Available</option>];
        
    return (
        <div className="modal-backdrop">
            <div className="modal-content transactions-modal-content">
                <h2 className="transactions-modal-title">{isAdding ? 'Add' : 'Edit'} Transaction</h2>
                <form onSubmit={handleSubmit} className="transactions-modal-form">
                    <label className="transactions-modal-label">
                        Security:
                        <select
                            className="transactions-modal-select"
                            value={updatedTransaction.securityName}
                            onChange={handleSecuritySelection}
                            disabled={holdings.length === 0}>
                            <option value="">Select Security</option>
                            {holdings.map(holding => (
                                    <option key={holding.id} value={holding.securityName}>
                                        {holding.securityName}
                                    </option>
                            ))}
                        </select>
                    </label>
                       <label>
                        Transaction Type:
                            <select
                                name="transactionType"
                                value={updatedTransaction.transactionType}
                                onChange={handleInputChange}
                            >
                                {transactionTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            name="amount"
                            value={updatedTransaction.amount}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={updatedTransaction.date}
                            onChange={handleInputChange}
                        />
                    </label>
                            <label>
                        Fees:
                        <input
                            type="number"
                            name="fees"
                            value={updatedTransaction.fees}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Transaction Description:
                        <input
                            type="text"
                            name="transactionDescription"
                            value={updatedTransaction.transactionDescription}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={updatedTransaction.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={updatedTransaction.quantity}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="transactions-modal-buttons">
                    <button type="submit" className="transactions-modal-button submit">{isAdding ? 'Add' : 'Save'} Transaction</button>
                    {!isAdding && (
                        <button type="button" className="transactions-modal-button delete" onClick={handleDelete}>Delete Transaction</button>
                    )}
                        <button type="button"  className="transactions-modal-button cancel" onClick={onClose}>Cancel</button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionsModal;
