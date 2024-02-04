import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import {
  updateTransaction,
  deleteTransaction,
  addTransaction,
} from "../../redux/accountTransactions";
import "./EditTransactionsModal.css";

const EditTransactionsModal = ({
  transaction,
  onClose,
  isAdding,
  holdings = [],
}) => {
  const dispatch = useDispatch();

  // Assuming the accounts state is correctly structured and contains the required data
  const accounts = useSelector((state) => state.accounts.accounts);

  const defaultTransaction = useMemo(
    () => ({
      holdingId: "",
      accountId: "",
      transactionType: "",
      amount: "",
      date: "",
      fees: "",
      securityName: "",
      transactionDescription: "",
      price: "",
      quantity: "",
    }),
    []
  );

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [updatedTransaction, setUpdatedTransaction] = useState(
    isAdding
      ? defaultTransaction
      : { ...transaction, date: formatDateForInput(transaction.date) || "" }
  );

  const hasRealEstateAccount = accounts.some(
    (account) => account.type === "RealEstate"
  );

  //   useEffect(() => {
  //     setUpdatedTransaction(
  //       isAdding ? defaultTransaction : transaction || defaultTransaction
  //     );
  //   }, [transaction, isAdding, defaultTransaction]);

  useEffect(() => {
    if (isAdding) {
      setUpdatedTransaction(defaultTransaction);
    } else if (transaction) {
      setUpdatedTransaction({
        ...transaction,
        date: formatDateForInput(transaction.date) || "",
      });
    }
  }, [transaction, isAdding, defaultTransaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTransaction((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSecuritySelection = (e) => {
    const selectedSecurityName = e.target.value;
    const selectedHolding = holdings.find(
      (holding) => holding.securityName === selectedSecurityName
    );

    setUpdatedTransaction((prevState) => ({
      ...prevState,
      holdingId: selectedHolding ? selectedHolding.id : "",
      securityName: selectedSecurityName,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasRealEstateAccount) {
      alert("Transactions for Real Estate accounts are not allowed.");
      return;
    }

    if (isAdding) {
      dispatch(addTransaction(updatedTransaction));
    } else {
      dispatch(updateTransaction(transaction.id, updatedTransaction));
    }

    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
    onClose();
  };

  const transactionTypes = [
    "Open",
    "Buy",
    "Sell",
    "Cash Dividend",
    "Reinvested Dividend",
    "Value Update",
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-content transactions-modal-content">
        <h2 className="transactions-modal-title">
          {isAdding ? "Add" : "Edit"} Transaction
        </h2>
        <form onSubmit={handleSubmit} className="transactions-modal-form">
          {/* Security selection */}
          <label className="transactions-modal-label">
            Security:
            <select
              className="transactions-modal-select"
              value={updatedTransaction.securityName}
              onChange={handleSecuritySelection}
              disabled={holdings.length === 0}
            >
              <option value="">Select Security</option>
              {holdings.map((holding) => (
                <option key={holding.id} value={holding.securityName}>
                  {holding.securityName}
                </option>
              ))}
            </select>
          </label>

          <label className="transactions-modal-label">
            Transaction Type:
            <select
              name="transactionType"
              value={updatedTransaction.transactionType}
              onChange={handleInputChange}
            >
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="transactions-modal-label">
            Amount:
            <input
              type="number"
              name="amount"
              value={updatedTransaction.amount}
              onChange={handleInputChange}
            />
          </label>

          {/* Date */}
          <label className="transactions-modal-label">
            Date:
            <input
              type="date"
              name="date"
              value={updatedTransaction.date}
              onChange={handleInputChange}
            />
          </label>

          {/* Fees */}
          <label className="transactions-modal-label">
            Fees:
            <input
              type="number"
              name="fees"
              value={updatedTransaction.fees}
              onChange={handleInputChange}
            />
          </label>

          {/* Transaction Description */}
          <label className="transactions-modal-label">
            Transaction Description:
            <input
              type="text"
              name="transactionDescription"
              value={updatedTransaction.transactionDescription}
              onChange={handleInputChange}
            />
          </label>

          {/* Price */}
          <label className="transactions-modal-label">
            Price:
            <input
              type="number"
              name="price"
              value={updatedTransaction.price}
              onChange={handleInputChange}
            />
          </label>

          {/* Quantity */}
          <label className="transactions-modal-label">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={updatedTransaction.quantity}
              onChange={handleInputChange}
            />
          </label>

          {/* Form submission buttons */}
          <div className="transactions-modal-buttons">
            <button
              type="submit"
              className="transactions-modal-button submit"
              disabled={hasRealEstateAccount}
            >
              {isAdding ? "Add" : "Save"} Transaction
            </button>
            {!isAdding && (
              <button
                type="button"
                className="transactions-modal-button delete"
                onClick={handleDelete}
              >
                Delete Transaction
              </button>
            )}
            <button
              type="button"
              className="transactions-modal-button cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
        {hasRealEstateAccount && (
          <p className="disabled-message">
            At this time, adding/editing transactions for 'RealEstate' accounts
            is disabled. "SCAs", or "Slowly Changing Assets" should be managed
            in the "Account Performance" screen.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditTransactionsModal;
