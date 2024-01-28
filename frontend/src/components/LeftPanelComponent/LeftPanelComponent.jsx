import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import "./LeftPanelComponent.css";
import EditAccountModal from '../EditAccountModal';

const LeftPanelComponent = ({ data: netWorth, onAccountClick, onAccountPerformanceClick }) => {
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
   
    //    if (newIsAccountsOpen) {
    //     dispatch(fetchAccounts());
    // }
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
    };

    const handleUpdateAccount = (accountId, updatedAccount) => {
        //dispatch(updateAccount(accountId, updatedAccount));
        handleCloseEditModal();
    };

    const handleDeleteAccount = (accountId) => {
        //dispatch(deleteAccount(accountId))
        handleCloseEditModal();
    };

        const handleAccountPerformanceClick = () => {
        onAccountPerformanceClick();
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
            <div className='assets'>
                <p>Assets</p>
                {/* TODO: Add line chart stuff */}
            </div>
            <div className='liabilities'>
                <p>Liabilities</p>
                {/* TODO: Add line chart stuff */}
            </div>

            {/* Accounts Section with Edit Icon */}
            {/* Accounts Section with Add Icon */}
            <div className="accounts-section">
                <h1 onClick={toggleAccounts}>Accounts</h1>
                <span className="add-icon" onClick={handleAddAccountClick}> + </span>
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
                <h1 onClick={toggleReports}>Reports</h1>
                {isReportsOpen && (
                    <div className="reports-dropdown">
                        <ul><a href="#" onClick={handleAccountPerformanceClick}>Account Performance</a></ul>
                        <ul><a href="/report-1">Portfolio Performance</a></ul>
                        <ul><a href="/report-2">Account Performance</a></ul>
                        <ul><a href="/report-3">Asset Performance</a></ul>
                        <ul><a href="/report-4">Gains & Losses</a></ul>
                        <ul><a href="/report-5">Portfolio Value & Benchmark</a></ul>
                    </div>
                )}
            </div>
            <p>Arbitrage-AI</p>
            <p>Qubit Score</p>
        </div>
    );
};

export default LeftPanelComponent;