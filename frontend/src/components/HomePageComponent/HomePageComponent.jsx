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

  //   useEffect(() => {
  //     dispatch(fetchAccounts());
  //     dispatch(fetchAccountHoldings());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(fetchAccounts());
  //     accounts.forEach((account) => {
  //       if (!holdingsData[account.id]) {
  //         dispatch(fetchAccountHoldings(account.id));
  //       }
  //     });
  //   }, [accounts, dispatch]);

  useEffect(() => {
    if (accounts.length && !holdingsAlreadyFetched(accounts, holdingsData)) {
      accounts.forEach((account) => {
        if (!holdingsData[account.id]) {
          dispatch(fetchAccountHoldings(account.id));
        }
      });
    }
  }, [accounts, dispatch]);

  function holdingsAlreadyFetched(accounts, holdingsData) {
    return accounts.every((account) => holdingsData.hasOwnProperty(account.id));
  }

  const handleAccountClick = (accountId) => {
    setSelectedAccountId(accountId);
    setViewAccountHoldings(true);
    setShowComingSoon(false);
  };

  const handleAccountPerformanceClick = () => {
    setSelectedAccountId(accounts.length > 0 ? accounts[0].id : null);
    setViewAccountHoldings(true);
    setViewAccountTransactions(false);
    setShowComingSoon(false);
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
