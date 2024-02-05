import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftPanelComponent from "../LeftPanelComponent";
import AccountHoldings from "../AccountHoldings";
import AccountTransactions from "../AccountTransactions";
import { fetchAccountHoldings } from "../../redux/accountHolding";
import { fetchAccounts } from "../../redux/account";
import "./HomePageComponent.css";

const HomepageComponent = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const [viewAccountHoldings, setViewAccountHoldings] = useState(false);
  const [viewAccountTransactions, setViewAccountTransactions] = useState(false);

  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);
  const holdingsData = useSelector((state) => state.holdings);
  const [showComingSoon, setShowComingSoon] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  useEffect(() => {
    const shouldFetchHoldings = (account) => {
      const holdings = holdingsData[account.id];
      return !holdings || holdings.status !== "complete";
    };

    const accountsNeedingHoldings = accounts.filter(shouldFetchHoldings);

    if (accountsNeedingHoldings.length > 0) {
      accountsNeedingHoldings.forEach((account) => {
        dispatch(fetchAccountHoldings(account.id));
      });
    }
  }, [accounts, dispatch]);

  const handleAccountClick = (accountId) => {
    setSelectedAccountId(accountId);
    setViewAccountHoldings(true);
    setShowComingSoon(false);
  };

  const handleAccountPerformanceClick = () => {
    if (accounts.length === 0) {
      alert(
        "No accounts found. Please add an account to view account performance."
      );
    } else {
      setSelectedAccountId(accounts[0].id);
      setViewAccountHoldings(true);
      setViewAccountTransactions(false);
    }
  };

  const handleAccountTransactionsClick = (accountId) => {
    setSelectedAccountId(accountId);
    setViewAccountHoldings(false);
    setViewAccountTransactions(true);
    setShowComingSoon(false);
  };

  const handleResetToDefaultView = () => {
    setViewAccountHoldings(false);
    setViewAccountTransactions(false);
    setSelectedAccountId(null);
    setShowComingSoon(true);
  };

  const handleStartHereClick = () => {
    console.log("Start Here button clicked!");
    // TODO: Not sure I'm going to do this. Maybe?
  };

  const totalBalancesData = useSelector(
    (state) => state.balances.totalBalancesByDate
  );
  console.log(totalBalancesData);
  const latestBalance =
    totalBalancesData[totalBalancesData.length - 1]?.totalBalance || 0;
  const netWorth = latestBalance;

  return (
    <div className="homepage">
      <div className="left-panel">
        <LeftPanelComponent
          data={netWorth}
          accounts={accounts}
          onAccountClick={handleAccountClick}
          onAccountPerformanceClick={handleAccountPerformanceClick}
          onAccountTransactionsClick={handleAccountTransactionsClick}
        />
      </div>
      <div className="right-content">
        {accounts.length === 0 ? (
          <div>
            <h2>Add Your First Account</h2>
          </div>
        ) : (
          <>
            {viewAccountHoldings && selectedAccountId && (
              <AccountHoldings accountId={selectedAccountId} />
            )}
            {viewAccountTransactions && selectedAccountId && (
              <AccountTransactions accountId={selectedAccountId} />
            )}
            {!viewAccountHoldings && !viewAccountTransactions && (
              <h1>Coming Soon!</h1>
            )}
          </>
        )}
      </div>
      <footer className="footer--pin">
        <button className="footer--button" onClick={handleResetToDefaultView}>
          Back to Net Worth Overview
        </button>
      </footer>
    </div>
  );
};

export default HomepageComponent;
