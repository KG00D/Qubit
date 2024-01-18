import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAccount, createAccount, deleteAccount } from '../../redux/account';

const EditAccountModal = ({ account, onClose, onUpdate, onDelete }) => {
    const [updatedAccount, setUpdatedAccount] = useState(account);

    useEffect(() => {
        setUpdatedAccount(account);
    }, [account]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAccount({ ...updatedAccount, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(account.id, updatedAccount);
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedAccount.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={updatedAccount.type}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Balance:
                        <input
                            type="number"
                            name="accountBalance"
                            value={updatedAccount.accountBalance}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => onDelete(account.id)}>Delete Account</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditAccountModal;
