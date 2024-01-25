import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountHoldings, deleteHolding, updateHolding } from "../../redux/accountHolding";
import EditHoldingsModal from '../EditHoldingsModal'; 
import "./AccountHoldings.css";

const AccountHoldings = ({ accountId }) => { 
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentHolding, setCurrentHolding] = useState(null);
    
    const holdingsData = useSelector(state => state.holdings[accountId]?.accountHoldings);
    const loading = useSelector(state => state.holdings.loading);
    const error = useSelector(state => state.holdings.error);
    
    useEffect(() => {
        if (accountId) {
            dispatch(fetchAccountHoldings(accountId));
        }
    }, [dispatch, accountId]);

    const calculateTotalGain = (quantity, averagePricePaid, currentPrice) => {
        // I need to get the current price from somewhere....
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
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentHolding(null);
    };

    const handleUpdate = (holdingId, updatedHolding) => {
        dispatch(updateHolding(accountId, holdingId, updatedHolding))
            .then(() => {
                dispatch(fetchAccountHoldings(accountId));
            })
            .finally(handleCloseModal);
    };

    const handleDelete = (holdingId) => {
        dispatch(deleteHolding(accountId, holdingId))
            .then(() => {
                dispatch(fetchAccountHoldings(accountId));
            })
            .finally(handleCloseModal);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <table>
                <thead>
                    <h2 className='holdings-performance'>Account Holdings & Performance</h2>
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
                    {holdingsData && Object.values(holdingsData).map((holding) => {
                        const totalGain = calculateTotalGain(holding.quantity, holding.averagePricePaid, holding.currentPrice); // Assume holding.currentPrice exists
                        const totalGainPercent = calculateTotalGainPercent(totalGain, holding.averagePricePaid, holding.quantity);
                        const value = calculateValue(holding.quantity, holding.currentPrice);
                        const totalCost = calculateValue(holding.averagePricePaid, holding.quantity);
    
                        return (
                            <tbody>
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
                                </tbody>
//                             <tfoot>
//   <tr>
//     <td colSpan="8">Sum of account values or other footer content here</td>
//   </tr>
// </tfoot>

                        );
                    })}
                </tbody>
            </table>
            {holdingsData && Object.values(holdingsData).length === 0 && <p>No holdings found for this account.</p>}
            {isModalOpen && (
                <EditHoldingsModal
                    holding={currentHolding}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default AccountHoldings;



