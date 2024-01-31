import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


import { useSelector } from 'react-redux';
import "./LeftPanelComponent.css";
import EditAccountModal from '../EditAccountModal';

const LeftPanelComponent = ({ data: netWorth,
    onAccountClick,
    onAccountPerformanceClick,
    onAccountTransactionsClick
    }) => {
    
    const dispatch = useDispatch();

    const { accounts } = useSelector(state => state.accounts);
    
    const [isAccountsOpen, setIsAccountsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false);
    const [selectedAccountForEdit, setSelectedAccountForEdit] = useState(null);

    const toggleAccounts = () => {
    const newIsAccountsOpen = !isAccountsOpen;
    setIsAccountsOpen(newIsAccountsOpen);   
    };

    const toggleReports = () => { 
        setIsReportsOpen(!isReportsOpen);
    };

    const handleEditIconClick = (event, account) => {
        event.stopPropagation(); 
        setSelectedAccountForEdit(account);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAccountForEdit(null);
        setIsAddMode(false);
    };

    // const handleUpdateAccount = (accountId, updatedAccount) => {
    //     handleCloseEditModal();
    // };

    // const handleDeleteAccount = (accountId) => {
    //     handleCloseEditModal();
    // };

    const handleAccountPerformanceClick = () => {
        onAccountPerformanceClick();
    };

    const handleAccountTransactionsClick = (accountId) => {
    if (typeof onAccountTransactionsClick === 'function') {
        onAccountTransactionsClick(accountId);
    } else {
        console.error("onAccountTransactionsClick is not defined");
        }
    };

    const handleAddAccountClick = () => {
    setIsAddMode(true);
    setIsEditModalOpen(true);
    };

    return (
        <div className="left-panel">
            <div className='net-worth'>
                <p>Net Worth</p>
                <p className='net-worth-value'>${netWorth.toLocaleString()}</p>
            </div>
            <div className="accounts-section">
                <h1 onClick={toggleAccounts}>
                    Accounts
                    <FontAwesomeIcon icon={isAccountsOpen ? faMinus : faPlus} />
                </h1>
                {isAccountsOpen && accounts.map(account => (
                    <div key={account.id} className="account-item">
                        <p className='accounts-dropdown'>{account.name}</p>
                        <button className="edit-icon" onClick={(e) => handleEditIconClick(e, account)}>✏️</button>
                    </div>
                ))}
            </div>

            {/* Edit/Add Account Modal */}
            {isEditModalOpen && (
                <EditAccountModal
                    account={isAddMode ? {} : selectedAccountForEdit}
                    onClose={handleCloseEditModal}
                    isAddMode={isAddMode}
                />
            )}

            {/* Edit Account Modal */}
            {/* {isEditModalOpen && selectedAccountForEdit && (
                <EditAccountModal
                    account={selectedAccountForEdit}
                    onClose={handleCloseEditModal}
                    onUpdate={handleUpdateAccount}
                    onDelete={handleDeleteAccount}
                />
            )} */}

            {/* Reports Section */}
             <div className="reports-section">
                <h1 onClick={toggleReports}>
                    Reports
                    <FontAwesomeIcon icon={isReportsOpen ? faMinus : faPlus} />
                </h1>
                {isReportsOpen && (
                    <div className="reports-dropdown">
                        <ul><button onClick={handleAccountPerformanceClick}>Account Performance</button></ul>
                        <ul><button onClick={handleAccountTransactionsClick}>Account Transactions</button></ul>
                    
                    </div>
                )}
            </div>
            <p>Arbitrage-AI</p>
            <p>Qubit Score</p>
             <button className="add-account-button" onClick={handleAddAccountClick}>
        Add Account
    </button>
        </div>
    );
};

export default LeftPanelComponent;