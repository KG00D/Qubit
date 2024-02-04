import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftPanelComponent from "../LeftPanelComponent";
import AccountHoldings from "../AccountHoldings";
import AccountTransactions from "../AccountTransactions";
import { fetchAccounts } from "../../redux/account";
import "./HomePageComponent.css";

const HomepageComponent = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const [viewAccountHoldings, setViewAccountHoldings] = useState(false);
  const [viewAccountTransactions, setViewAccountTransactions] = useState(false);

  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
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
        {/* .yadda yadda yadda */}
      </div>
      <div className="right-content">
        {accounts.length === 0 ? (
          <h2>Add Your First Account</h2>
        ) : (
          <>
            {viewAccountHoldings && selectedAccountId && (
              <AccountHoldings accountId={selectedAccountId} />
            )}
            {viewAccountTransactions && selectedAccountId && (
              <AccountTransactions accountId={selectedAccountId} />
            )}
            {/* ... naything else I add TODO: remove all my weird comments and prose */}
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
