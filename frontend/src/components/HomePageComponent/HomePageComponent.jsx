import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftPanelComponent from "../LeftPanelComponent";
import AccountHoldings from "../AccountHoldings";
import AccountTransactions from "../AccountTransactions";
import DebtPaymentsChart from "../DebtPaymentsChart";
import CreditScoreChart from "../CreditScoreChart";
import MonthlyIncomeChart from "../MonthlyIncomeChart";
import FinancialHealthChart from "../FinancialHealthChart";
import { fetchAccountHoldings } from "../../redux/accountHolding";
import { fetchAccounts } from "../../redux/account";
import { fetchUserData } from "../../redux/userData";
import "./HomePageComponent.css";

const HomepageComponent = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [viewAccountHoldings, setViewAccountHoldings] = useState(false);
  const [viewAccountTransactions, setViewAccountTransactions] = useState(false);

  const [showChart, setShowChart] = useState(false);

  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);
  const holdingsData = useSelector((state) => state.holdings);
  const userData = useSelector((state) => state.userData?.details);

  const [showComingSoon, setShowComingSoon] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    const shouldFetchHoldings = (account) => {
      const holdings = holdingsData[account.id];
      return !holdings || holdings.status !== "complete";
    };

    const handleShowDebtPaymentsChart = () => {
      setShowChart(true);
      setViewAccountHoldings(false);
      setViewAccountTransactions(false);
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
      <div className="left-section"></div>

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
            {!viewAccountHoldings && !viewAccountTransactions && !userData && (
              <h1>Coming Soon!</h1>
            )}
          </>
        )}
        {!viewAccountHoldings && (
          <div className="charts-section">
            <div className="chart-row">
              {userData ? (
                <div className="chart-small">
                  <DebtPaymentsChart userData={userData} />
                </div>
              ) : null}
              {userData ? (
                <div className="chart-small">
                  <CreditScoreChart userData={userData} />
                </div>
              ) : null}
              {/* {userData ? (
              <div className="chart-small">
                <MonthlyIncomeChart userData={userData} />
              </div>
            ) : null} */}
            </div>

            <div className="chart-row">
              {userData ? (
                <div className="chart-small">
                  <FinancialHealthChart userData={userData} />
                </div>
              ) : null}
            </div>
          </div>
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
