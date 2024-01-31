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
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{isAddMode ? 'Add Account' : 'Edit Account'}</h2>
                <form onSubmit={handleSubmit}>
                <button type="button" onClick={onClose}>Cancel</button>

                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedAccount.name || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={updatedAccount.type || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Sub Type:
                        <input
                            type="text"
                            name="subType"
                            value={updatedAccount.subType || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                           <label>
                        Sub Type:
                        <input
                            type="text"
                            name="accountBalance"
                            value={updatedAccount.accountBalance || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">{isAddMode ? 'Add Account' : 'Save Changes'}</button>
                    {/* <button type="button" onClick={onClose}>Cancel</button> */}

                    {!isAddMode && (
                        <>
                            <button type="button" onClick={handleDelete}>Delete Account</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditAccountModal;
