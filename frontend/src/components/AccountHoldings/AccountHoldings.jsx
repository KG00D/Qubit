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
            if (!holdingsData[account.id]) {
                dispatch(fetchAccountHoldings(account.id));
            }
        });
    }, [accounts, dispatch]);

    const calculateTotalGain = (quantity, averagePricePaid, currentValue) => {
    const qty = parseFloat(quantity);
    const avgPrice = parseFloat(averagePricePaid);
    const currValue = parseFloat(currentValue);
    if (isNaN(qty) || isNaN(avgPrice) || isNaN(currValue)) return 0;
    return currValue - (avgPrice * qty);
    };

    const calculateTotalGainPercent = (totalGain, totalCost) => {
    if (totalCost === 0 || isNaN(totalGain) || isNaN(totalCost)) return 0;
    return (totalGain / totalCost) * 100;
    };

    const calculateTotalValue = (quantity, currentValue) => {
        const qty = parseFloat(quantity);
        const currValue = parseFloat(currentValue);
        if (isNaN(qty) || isNaN(currValue)) return 0;
        return currValue * qty;
    };

    let totalPortfolioValue = 0;

    const handleEditClick = (holding) => {
        setCurrentHolding(holding);
        setIsAddingNewHolding(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentHolding(null);
    };

    const handleAddNewHoldingClick = (accountId) => {
    setCurrentHolding({ accountId });
    setIsAddingNewHolding(true);
    setIsModalOpen(true);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {accounts.map(account => {
                const accountHoldings = holdingsData[account.id]?.accountHoldings || {};
                const accountCalculations = Object.values(accountHoldings).reduce((acc, holding) => {
                    const totalCost = parseFloat(holding.quantity) * parseFloat(holding.averagePricePaid);
                    const totalGain = calculateTotalGain(parseFloat(holding.quantity), parseFloat(holding.averagePricePaid), parseFloat(holding.currentValue));
                    const totalGainPercent = calculateTotalGainPercent(totalGain, totalCost);
                    const value = calculateTotalValue(parseFloat(holding.quantity), parseFloat(holding.currentValue));
                    acc += value;
                    return acc;
                }, 0);

                totalPortfolioValue += accountCalculations;
                console.log('Account Holdings:', accountHoldings);

                return (
                    <div key={account.id}>
                        <h2 className="holdings-header">{account.name} Holdings & Performance</h2>
                        <hr className="divider" />
                        <button className="add-holding-btn" onClick={() => handleAddNewHoldingClick(account.id)}>Add New Holding</button>
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

                                {Object.values(accountHoldings).map(holding => {
                                    console.log('Holding:', holding);
                                    const totalCost = parseFloat(holding.quantity) * parseFloat(holding.averagePricePaid);
                                    const totalGain = calculateTotalGain(parseFloat(holding.quantity), parseFloat(holding.averagePricePaid), parseFloat(holding.currentValue));
                                    const totalGainPercent = calculateTotalGainPercent(totalGain, totalCost);
                                    const value = calculateTotalValue(parseFloat(holding.quantity), parseFloat(holding.currentValue));

                                    return (
                                        <tr key={holding.id}>
                                            <td>{holding.holdingName}</td>
                                            <td>{holding.securityName}</td>
                                            <td>{holding.quantity}</td>
                                            <td>${holding.averagePricePaid.toFixed(2)}</td>
                                            <td>${totalCost.toFixed(2)}</td>
                                            <td>${totalGain.toFixed(2)}</td>
                                            <td>{totalGainPercent.toFixed(2)}%</td>
                                            <td>${value.toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => handleEditClick(holding)}>Edit</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <p>Account Total Value: ${accountCalculations.toFixed(2)}</p>
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
                    onClose={handleCloseModal}
                    isAdding={isAddingNewHolding}
                />
            )}
        </div>
    );
};

export default AccountHoldings;