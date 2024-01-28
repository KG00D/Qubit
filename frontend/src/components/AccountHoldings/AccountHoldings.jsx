import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountHoldings } from "../../redux/accountHolding";
import EditHoldingsModal from '../EditHoldingsModal';
import "./AccountHoldings.css";

const AccountHoldings = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentHolding, setCurrentHolding] = useState(null);
    const [isAddingNewHolding, setIsAddingNewHolding] = useState(false);

    const accounts = useSelector(state => state.accounts.accounts);
    const holdingsData = useSelector(state => state.holdings);
    const loading = useSelector(state => state.holdings.loading);
    const error = useSelector(state => state.holdings.error);

    useEffect(() => {
        accounts.forEach(account => {
            dispatch(fetchAccountHoldings(account.id));
        });
    }, [dispatch, accounts]);

    const calculateTotalGain = (quantity, averagePricePaid, currentPrice) => {
        return (currentPrice - averagePricePaid) * quantity;
    };

    const calculateTotalGainPercent = (totalGain, averagePricePaid, quantity) => {
        return (totalGain / (averagePricePaid * quantity)) * 100;
    };

    const calculateValue = (quantity, currentPrice) => {
        return quantity * currentPrice;
    };

    const handleEditClick = (holding) => {
        setCurrentHolding(holding);
        setIsAddingNewHolding(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentHolding(null);
    };

    let totalPortfolioValue = 0;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {accounts.map(account => {
                let accountTotalValue = 0;

                const accountHoldings = holdingsData[account.id]?.accountHoldings;
                if (accountHoldings) {
                    accountTotalValue = Object.values(accountHoldings).reduce((total, holding) => {
                        const value = calculateValue(holding.quantity, holding.currentPrice);
                        return total + value;
                    }, 0);
                }

                totalPortfolioValue += accountTotalValue;

                return (
                    <div key={account.id}>
                        <h2>{account.name} Holdings & Performance</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Holding Name</th>
                                    <th>Symbol</th>
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
                                {accountHoldings
                                    ? Object.values(accountHoldings).map(holding => {
                                        const totalGain = calculateTotalGain(holding.quantity, holding.averagePricePaid, holding.currentPrice);
                                        const totalGainPercent = calculateTotalGainPercent(totalGain, holding.averagePricePaid, holding.quantity);
                                        const value = calculateValue(holding.quantity, holding.currentPrice);
                                        const totalCost = calculateValue(holding.averagePricePaid, holding.quantity);

                                        return (
                                            <tr key={holding.holdingIdentifier}>
                                                <td>{holding.holdingName}</td>
                                                <td>{holding.holdingIdentifier}</td>
                                                <td>{holding.quantity}</td>
                                                <td>${holding.averagePricePaid}</td>
                                                <td>${totalCost.toFixed(2)}</td>
                                                <td>${totalGain.toFixed(2)}</td>
                                                <td>{totalGainPercent.toFixed(2)}%</td>
                                                <td>${value.toFixed(2)}</td>
                                                <td>
                                                    <button onClick={() => handleEditClick(holding)}>Edit</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : <tr><td colSpan="9">No holdings found for this account.</td></tr>
                                }
                            </tbody>
                        </table>
                        <p>Account Total Value: ${accountTotalValue.toFixed(2)}</p>
                    </div>
                );
            })}
            <div className="portfolio-total">
                <h3>Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}</h3>
            </div>

            {isModalOpen && (
                <EditHoldingsModal
                    accountId={currentHolding?.accountId}
                    holding={isAddingNewHolding ? null : currentHolding}
                    onClose={() => setIsModalOpen(false)}
                    onRefresh={() => accounts.forEach(account => dispatch(fetchAccountHoldings(account.id)))}
                    isAdding={isAddingNewHolding}
                />
            )}
        </div>
    );
}

export default AccountHoldings;
