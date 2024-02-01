import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount, deleteAccount, addAccount } from '../../redux/account';
import './EditAccountModal.css'

const EditAccountModal = ({ account, onClose, isAddMode }) => {
    const dispatch = useDispatch();

    const emptyAccount = {
        name: '',
        type: '',
        subType: '',
        accountBalance: '',
    };

    // const initialAccount = isAddMode ? emptyAccount : account;
    // const [updatedAccount, setUpdatedAccount] = useState(initialAccount);

    const initialAccount = isAddMode ? emptyAccount : account;
    const [updatedAccount, setUpdatedAccount] = useState(initialAccount);
    
    // useEffect(() => {
    //     setUpdatedAccount(initialAccount);
    // }, [isAddMode]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };


    useEffect(() => {
            console.log('useEffect triggered');
            console.log('isAddMode:', isAddMode);
            console.log('account:', account);
        setUpdatedAccount(isAddMode ? emptyAccount : account);
    }, [isAddMode, account]);


    const handleInputChange = (e) => {
         const { name, value } = e.target;
        console.log('Input Change:', name, value);
        setUpdatedAccount({ ...updatedAccount, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (isAddMode) {
    //         dispatch(addAccount(updatedAccount));
    //     } else {
    //         dispatch(updateAccount(account.id, updatedAccount));
    //     }
    //     onClose();
    // };
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddMode) {
        await dispatch(addAccount(updatedAccount));
    } else {
        await dispatch(updateAccount(account.id, updatedAccount));
    }
    onClose();
};


    const handleDelete = () => {
        if (!isAddMode) {
            dispatch(deleteAccount(account.id));
            onClose();
        }
    };

      return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <h2>{isAddMode ? 'Add Account' : 'Edit Account'}</h2>
                <form onSubmit={handleSubmit} className="account-form">
                    <label className="account-label">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedAccount.name || ''}
                            onChange={handleInputChange}
                            className="account-input"
                        />
                    </label>
                    <label className="account-label">
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={updatedAccount.type || ''}
                            onChange={handleInputChange}
                            className="account-input"
                        />
                    </label>
                    <label className="account-label">
                        Sub Type:
                        <input
                            type="text"
                            name="subType"
                            value={updatedAccount.subType || ''}
                            onChange={handleInputChange}
                            className="account-input"
                        />
                    </label>
                    <label className="account-label">
                        Account Balance:
                        <input
                            type="text"
                            name="accountBalance"
                            value={updatedAccount.accountBalance || ''}
                            onChange={handleInputChange}
                            className="account-input"
                        />
                    </label>
                    <div className="account-buttons">
                        <button type="submit" className="account-button submit">{isAddMode ? 'Add Account' : 'Save Changes'}</button>
                        {!isAddMode && (
                            <>
                                <button type="button" className="account-button delete" onClick={handleDelete}>Delete Account</button>
                                <button type="button" className="account-button cancel-account-add-button" onClick={onClose}>Cancel</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountModal;