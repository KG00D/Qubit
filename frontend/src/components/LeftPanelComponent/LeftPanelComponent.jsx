import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faMinus, faPlus);

import { useSelector } from "react-redux";
import "./LeftPanelComponent.css";
import EditAccountModal from "../EditAccountModal";

const LeftPanelComponent = ({
  data: netWorth,
  accounts,
  onAccountClick,
  onAccountPerformanceClick,
  onAccountTransactionsClick,
}) => {
  const dispatch = useDispatch();

  const holdingsData = useSelector((state) => state.holdings);

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

  const handleAccountPerformanceClick = () => {
    onAccountPerformanceClick();
  };

  const handleAccountTransactionsClick = (accountId) => {
    if (typeof onAccountTransactionsClick === "function") {
      onAccountTransactionsClick(accountId);
    } else {
      console.error("onAccountTransactionsClick is not defined");
    }
  };

  const handleAddAccountClick = () => {
    setIsAddMode(true);
    setIsEditModalOpen(true);
  };

  const calculateTotalPortfolioValue = (accounts, holdingsData) => {
    return accounts.reduce((total, account) => {
      const accountHoldings = holdingsData[account.id]?.accountHoldings || {};
      const accountTotal = Object.values(accountHoldings).reduce(
        (acc, holding) => {
          return acc + holding.currentValue;
        },
        0
      );
      return total + accountTotal;
    }, 0);
  };

  const totalPortfolioValue = calculateTotalPortfolioValue(
    accounts,
    holdingsData
  );
  return (
    <div className="left-panel">
      <div className="greeting"></div>
      <div className="net-worth">
        <p>Net Worth</p>
        <p className="net-worth-value">
          $
          {new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
          }).format(totalPortfolioValue)}
          {/* ${totalPortfolioValue} */}
        </p>
      </div>
      <div className="accounts-section">
        <h2 className="reports-headings" onClick={toggleAccounts}>
          Accounts
          <FontAwesomeIcon icon={isAccountsOpen ? faPlus : faMinus} />
        </h2>
        {isAccountsOpen &&
          accounts.map((account) => (
            <div key={account.id} className="account-item">
              <p className="accounts-dropdown">{account.name}</p>
              <button
                className="edit-icon"
                onClick={(e) => handleEditIconClick(e, account)}
              >
                {" "}
                <FiMoreHorizontal />
              </button>
            </div>
          ))}
      </div>

      {isEditModalOpen && (
        <EditAccountModal
          account={isAddMode ? {} : selectedAccountForEdit}
          onClose={handleCloseEditModal}
          isAddMode={isAddMode}
        />
      )}
      <div className="reports-section">
        <h2 className="reports-headings" onClick={toggleReports}>
          Reports
          <FontAwesomeIcon icon={isReportsOpen ? faMinus : faPlus} />
        </h2>
        {isReportsOpen && (
          <div className="reports-dropdown">
            <ul className="reports-list">
              <button onClick={handleAccountPerformanceClick}>
                Account Performance
              </button>
            </ul>
            <ul>
              {/* <button onClick={handleAccountTransactionsClick}>
                Account Transactions
              </button> */}
            </ul>
          </div>
        )}
      </div>
      <button className="add-account-button" onClick={handleAddAccountClick}>
        Add Account
      </button>
    </div>
  );
};

export default LeftPanelComponent;
