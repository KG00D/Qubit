import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanelComponent from '../LeftPanelComponent';
import AccountHoldings from '../AccountHoldings';
import NetWorthOverTime from '../NetWorthOverTime';
import { fetchAccounts } from '../../redux/account';
import { fetchTotalBalancesByDate } from '../../redux/accountBalances';
import "./HomePageComponent.css";

const HomepageComponent = () => {
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [viewAccountHoldings, setViewAccountHoldings] = useState(false);
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
        if (accounts.length > 0) {
            setSelectedAccountId(accounts.length > 0 ? accounts[0].id : null);
            setViewAccountHoldings(true);
        }
    };

    const handleResetToDefaultView = () => {
        setViewAccountHoldings(false);
        setSelectedAccountId(null); 
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
                />
                {/* ... other sidebar content ... */}
            </div>
            <div className="right-content">
                {viewAccountHoldings && selectedAccountId ? (
                    <AccountHoldings accountId={selectedAccountId} />
                ) : (
                    <NetWorthOverTime data={totalBalancesData} />
                )}
                {/* <button onClick={handleResetToDefaultView}>Back to Net Worth Overview</button> */}
            </div>
        </div>
    );
};

export default HomepageComponent;
