import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountHoldings } from "../../redux/accountHolding";
import EditHoldingsModal from "../EditHoldingsModal";
import "./AccountHoldings.css";

const AccountHoldings = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHolding, setCurrentHolding] = useState(null);
  const [isAddingNewHolding, setIsAddingNewHolding] = useState(false);
  const [currentAccountHoldings, setCurrentAccountHoldings] = useState([]);

  const accounts = useSelector((state) => state.accounts.accounts);
  const holdingsData = useSelector((state) => state.holdings);
  const loading = useSelector((state) => state.holdings.loading);
  const error = useSelector((state) => state.holdings.error);

  useEffect(() => {
    accounts.forEach((account) => {
      if (!holdingsData[account.id]) {
        dispatch(fetchAccountHoldings(account.id));
      }
    });
  }, [accounts, dispatch]);

  const calculateTotalGain = (quantity, averagePricePaid, currentValue) =>
    currentValue - averagePricePaid * quantity;
  const calculateTotalGainPercent = (totalGain, totalCost) =>
    (totalGain / totalCost) * 100;

  let totalPortfolioValue = 0;

  const handleEditClick = (holding) => {
    const accountType = accounts.find(
      (account) => account.id === holding.accountId
    )?.type;

    setCurrentHolding({ ...holding, type: accountType });
    setIsAddingNewHolding(false);
    setIsModalOpen(true);
    setCurrentAccountHoldings(
      holdingsData[holding.accountId]?.accountHoldings || []
    );
  };

  const toFixedSafe = (value, digits = 2) => {
    if (value === null || value === undefined || isNaN(value)) {
      return (0).toFixed(digits);
    }
    return value.toFixed(digits);
  };

  const handleAddNewHoldingClick = (accountId) => {
    const accountType = accounts.find(
      (account) => account.id === accountId
    )?.type;
    setCurrentHolding({ accountId, type: accountType });
    setIsAddingNewHolding(true);
    setIsModalOpen(true);
    setCurrentAccountHoldings(holdingsData[accountId]?.accountHoldings || []);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentHolding(null);
    setCurrentAccountHoldings([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {accounts.map((account) => {
        const accountHoldings = holdingsData[account.id]?.accountHoldings || [];
        const accountCalculations = accountHoldings.reduce((acc, holding) => {
          const averagePricePaid = holding.totalCost / holding.quantity;
          const totalGain = calculateTotalGain(
            holding.quantity,
            averagePricePaid,
            holding.currentValue
          );
          const totalGainPercent = calculateTotalGainPercent(
            totalGain,
            holding.totalCost
          );
          acc += holding.currentValue;
          return acc;
        }, 0);

        totalPortfolioValue += accountCalculations;

        return (
          <div key={account.id}>
            <h2 className="reports-header">
              {account.name} Holdings & Performance
            </h2>
            <hr className="divider" />
            <button
              className="add-holding-btn"
              onClick={() => handleAddNewHoldingClick(account.id)}
            >
              Add New Holding
            </button>
            <table>
              <thead>
                <tr>
                  <th>Holding Name</th>
                  <th>Security</th>
                  <th>Qty #</th>
                  <th>Average Price Paid</th>
                  <th>Total Cost</th>
                  <th>Total Gain</th>
                  <th>Total Gain %</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accountHoldings.map((holding) => {
                  const averagePricePaid = holding.totalCost / holding.quantity;
                  const totalGain = calculateTotalGain(
                    holding.quantity,
                    averagePricePaid,
                    holding.currentValue
                  );
                  const totalGainPercent = calculateTotalGainPercent(
                    totalGain,
                    holding.totalCost
                  );

                  return (
                    <tr key={holding.id}>
                      <td>{holding.holdingName}</td>
                      <td>{holding.securityName}</td>
                      <td>{holding.quantity}</td>
                      <td>${toFixedSafe(averagePricePaid)}</td>
                      <td>${toFixedSafe(holding.totalCost)}</td>
                      <td>${toFixedSafe(totalGain)}</td>
                      <td>${toFixedSafe(totalGainPercent)}%</td>
                      <td>${toFixedSafe(holding.currentValue)}</td>
                      <td>
                        <button onClick={() => handleEditClick(holding)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="account-total-value">
              Account Total Value: ${accountCalculations.toFixed(2)}
            </p>
          </div>
        );
      })}
      <div className="portfolio-total">
        <h3>Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}</h3>
      </div>
      {isModalOpen && (
        <EditHoldingsModal
          accountId={currentHolding?.accountId}
          type={currentHolding?.type}
          holding={isAddingNewHolding ? null : currentHolding}
          onClose={handleCloseModal}
          isAdding={isAddingNewHolding}
          existingHoldings={currentAccountHoldings}
        />
      )}
    </div>
  );
};

export default AccountHoldings;
