// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateTransaction, deleteTransaction, addTransaction } from "../../redux/accountTransactions";

// const EditTransactionsModal = ({ transaction, onClose, isAdding }) => {
//     const dispatch = useDispatch();

//     // Default transaction structure
//     const defaultTransaction = {
//         securityName: '',
//         amount: '',
//         date: '',
//         description: '',
//         price: '',
//         quantity: ''
//     };

//     const [updatedTransaction, setUpdatedTransaction] = useState(
//         isAdding ? defaultTransaction : transaction || defaultTransaction
//     );

//     useEffect(() => {
//         setUpdatedTransaction(isAdding ? defaultTransaction : transaction || defaultTransaction);
//     }, [transaction, isAdding]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedTransaction(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (isAdding || !updatedTransaction.id) {
//             dispatch(addTransaction(updatedTransaction)); 
//         } else {
//             dispatch(updateTransaction(updatedTransaction.id, updatedTransaction));
//     }

//     onClose();
// };

//     const handleDelete = () => {
//         if (transaction && transaction.id) {
//             dispatch(deleteTransaction(transaction.id));
//         }
//         onClose();
//     };

//     return (
//         <div className="modal-backdrop">
//             <div className="modal-content">
//                 <h2>{isAdding ? 'Add' : 'Edit'} Transaction</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Security Name */}
//                     <label>
//                         Security Name:
//                         <input
//                             type="text"
//                             name="securityName"
//                             value={updatedTransaction.securityName}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Amount */}
//                     <label>
//                         Amount:
//                         <input
//                             type="number"
//                             name="amount"
//                             value={updatedTransaction.amount}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Date */}
//                     <label>
//                         Date:
//                         <input
//                             type="date"
//                             name="date"
//                             value={updatedTransaction.date}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Description */}
//                     <label>
//                         Transaction Description:
//                         <input
//                             type="text"
//                             name="description"
//                             value={updatedTransaction.description}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Price */}
//                     <label>
//                         Price:
//                         <input
//                             type="number"
//                             name="price"
//                             value={updatedTransaction.price}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Quantity */}
//                     <label>
//                         Quantity:
//                         <input
//                             type="number"
//                             name="quantity"
//                             value={updatedTransaction.quantity}
//                             onChange={handleInputChange}
//                         />
//                     </label>
//                     {/* Action Buttons */}
//                     <button type="submit">{isAdding ? 'Add' : 'Save'} Transaction</button>
//                     {!isAdding && (
//                         <button type="button" onClick={handleDelete}>Delete Transaction</button>
//                     )}
//                     <button type="button" onClick={onClose}>Cancel</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditTransactionsModal;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction, deleteTransaction, addTransaction } from "../../redux/accountTransactions";

const EditTransactionsModal = ({ transaction, onClose, isAdding, holdings = [] }) => {
    console.log('Received Holdings:', holdings);

    const dispatch = useDispatch();

    const defaultTransaction = {
        holdingId: '',
        securityName: '',
        amount: '',
        date: '',
        description: '',
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
        console.log('Selected Security Name:', selectedSecurityName);
        const selectedHolding = holdings.find(holding => holding.securityName === selectedSecurityName);

        setUpdatedTransaction(prevState => ({
            ...prevState,
            holdingId: selectedHolding ? selectedHolding.id : '',
            securityName: selectedSecurityName
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAdding || !updatedTransaction.id) {
            dispatch(addTransaction(updatedTransaction));
        } else {
            dispatch(updateTransaction(updatedTransaction.id, updatedTransaction));
        }

        onClose();
    };

    const handleDelete = () => {
        if (transaction && transaction.id) {
            dispatch(deleteTransaction(transaction.id));
        }
        onClose();
    };

    // Ensure that holdings is an array before mapping over it
    const holdingsOptions = holdings.length > 0 
        ? holdings.map(holding => (
              <option key={holding.id} value={holding.securityName}>
                  {holding.securityName}
              </option>
          ))
        : [<option key="no-holdings" disabled>No Holdings Available</option>];

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{isAdding ? 'Add' : 'Edit'} Transaction</h2>
                <form onSubmit={handleSubmit}>
                    {/* Dropdown for Security Names */}
                    <label>
                        Security Name:
                        <select
                            value={updatedTransaction.securityName}
                            onChange={handleSecuritySelection}
                            disabled={holdings.length === 0}>
                            <option value="">Select Security</option>
                            {holdings.map(holding => (
                                    <option key={holding} value={holding}>
                            {holding}
                                    </option>
                            ))}
                            {/* {holdingsOptions} */}
                        </select>
                    </label>
                    {/* Amount */}
                    <label>
                        Amount:
                        <input
                            type="number"
                            name="amount"
                            value={updatedTransaction.amount}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Date */}
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={updatedTransaction.date}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Description */}
                    <label>
                        Transaction Description:
                        <input
                            type="text"
                            name="description"
                            value={updatedTransaction.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Price */}
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={updatedTransaction.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Quantity */}
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={updatedTransaction.quantity}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Action Buttons */}
                    <button type="submit">{isAdding ? 'Add' : 'Save'} Transaction</button>
                    {!isAdding && (
                        <button type="button" onClick={handleDelete}>Delete Transaction</button>
                    )}
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionsModal;
