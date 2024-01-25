import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountDetails } from "../../redux/account";
import EditHoldingsModal from '../EditHoldingsModal';

const AccountDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentHolding, setCurrentHolding] = useState(null);

    const accountDetails = useSelector(state => state.accountHoldings[id]);

    const accountData = accountDetails?.account;
    const holdingsData = accountDetails?.accountHoldings;

    const loading = useSelector(state => state.accounts.loading);
    const error = useSelector(state => state.accounts.error);

    useEffect(() => {
        dispatch(fetchAccountDetails(id));
    }, [dispatch, id]);

    const handleEditHolding = (holding) => {
        setCurrentHolding(holding);
        setIsModalOpen(true);
    };

    const handleUpdateHolding = (holdingId, updatedHolding) => {
        // Dispatch updateHolding action
        // Example: dispatch(updateHolding(holdingId, updatedHolding))
        closeModal();
    };

    const handleDeleteHolding = (holdingId) => {
        // Dispatch deleteHolding action
        // Example: dispatch(deleteHolding(holdingId))
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentHolding(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!accountData) return <p>Account data not found</p>;

    return (
        <div>
            <h2>Account Details</h2>
            <div>
                <p>Name: {accountData.name}</p>
                <p>Type: {accountData.type}</p>
                <p>Balance: {accountData.accountBalance}</p>
                <h3>Account Holdings</h3>
                {holdingsData && Object.entries(holdingsData).map(([key, holding]) => (
                    <li key={key}>
                        {holding.holdingName} - Quantity: {holding.quantity}
                        <button onClick={() => handleEditHolding(holding)}>Edit</button>
                        <button onClick={() => handleDeleteHolding(holding.id)}>Delete</button>
                    </li>
                ))}
            </div>

            {isModalOpen && 
                <EditHoldingsModal 
                    holding={currentHolding} 
                    onClose={closeModal} 
                    onUpdate={handleUpdateHolding} 
                    onDelete={handleDeleteHolding}
                />
            }
        </div>
    );
};

export default AccountDetails;
