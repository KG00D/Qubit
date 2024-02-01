import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanelComponent from '../LeftPanelComponent';
import AccountHoldings from '../AccountHoldings';
import AccountTransactions from '../AccountTransactions';
import NetWorthOverTime from '../NetWorthOverTime';
import { fetchAccounts } from '../../redux/account';
import { fetchTotalBalancesByDate } from '../../redux/accountBalances';
import "./HomePageComponent.css";

const HomepageComponent = () => {
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    
    const [viewAccountHoldings, setViewAccountHoldings] = useState(false);
    const [viewAccountTransactions, setViewAccountTransactions] = useState(false);

    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(fetchTotalBalancesByDate());
    }, [dispatch]);

    const handleAccountClick = (accountId) => {
        setSelectedAccountId(accountId);
        setViewAccountHoldings(true);
    };

    const handleAccountPerformanceClick = () => {
        setSelectedAccountId(accounts.length > 0 ? accounts[0].id : null);
        setViewAccountHoldings(true);
        setViewAccountTransactions(false);
    };

    const handleAccountTransactionsClick = (accountId) => {
        setSelectedAccountId(accountId);
        setViewAccountHoldings(false); 
        setViewAccountTransactions(true); 
    };

    const handleResetToDefaultView = () => {
        setViewAccountHoldings(false);
        setViewAccountTransactions(false); 
        setSelectedAccountId(null); 
    };

    const handleStartHereClick = () => {
    console.log("Start Here button clicked!");
        // Add your logic here for what should happen when the button is clicked
    };


    const totalBalancesData = useSelector(state => state.balances.totalBalancesByDate);
    const latestBalance = totalBalancesData[totalBalancesData.length - 1]?.totalBalance || 0;
    const netWorth = latestBalance;

    return (
        <div className="homepage">
            <div className="left-panel">
                <LeftPanelComponent
                    data={netWorth}
                    onAccountClick={handleAccountClick}
                    onAccountPerformanceClick={handleAccountPerformanceClick}
                    onAccountTransactionsClick={handleAccountTransactionsClick}
                />
                {/* ... other sidebar content ... */}
            </div>
            <div className="right-content">
                {accounts.length === 0 ? (
                    <button onClick={handleStartHereClick}>Start Here</button>
                ) : (
                    <>
                        {viewAccountHoldings && selectedAccountId && (
                            <AccountHoldings accountId={selectedAccountId} />
                        )}
                        {viewAccountTransactions && selectedAccountId && (
                            <AccountTransactions accountId={selectedAccountId} />
                        )}
                        {!viewAccountHoldings && !viewAccountTransactions && (
                            <NetWorthOverTime data={totalBalancesData} />
                        )}
                        <button onClick={handleResetToDefaultView}>Back to Net Worth Overview</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomepageComponent;
