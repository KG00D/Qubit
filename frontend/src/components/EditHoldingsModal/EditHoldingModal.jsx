import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateHolding, deleteHolding, createHolding } from "../../redux/accountHolding";
import "./EditHoldingModal.css";

const EditHoldingModal = ({ accountId, type: accountType, holding, onClose, isAdding, existingHoldings }) => {
    const dispatch = useDispatch();

    const defaultHolding = {
        holdingName: '',
        securityName: '',
        quantity: '',
        averagePricePaid: '',
        positionOpenDate: '',
        currentValue: 0
    };

    const [updatedHolding, setUpdatedHolding] = useState(isAdding ? defaultHolding : holding);

    useEffect(() => {
        if (!isAdding && holding) {
            setUpdatedHolding(holding);
        }
    }, [holding, isAdding]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedHolding({ ...updatedHolding, [name]: value });
    };

    const handleAddNewHolding = (newHolding) => {
        const holdingExists = existingHoldings.some(existingHolding => 
            existingHolding.securityName === newHolding.securityName);

        if (holdingExists) {
            alert('This holding already exists in the account. Please add a transaction or remove the holding');
            return;
        }

        dispatch(createHolding(accountId, newHolding))
            .finally(onClose);
    };

    const handleUpdate = () => {
        dispatch(updateHolding(accountId, holding.id, updatedHolding))
            .finally(onClose);
    };

    const handleDelete = () => {
        dispatch(deleteHolding(accountId, holding.id))
            .finally(onClose);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdding) {
            handleAddNewHolding(updatedHolding);
        } else {
            handleUpdate(); 
        }
    };

    const disabledConditions = [
        'Retirement',
        'Brokerage'
    ];

    const shouldDisableCurrentValue = (accountType) => {
        return disabledConditions.includes(accountType);
    };

    const disableCurrentValue = shouldDisableCurrentValue(accountType);

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{isAdding ? 'Add New Holding' : 'Edit Holding'}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Holding Name:
                        <input
                            type="text"
                            name="holdingName"
                            value={updatedHolding.holdingName || ''}
                            minLength="1"
                            maxLength="15" 
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Security:
                        <input
                            type="text"
                            name="securityName"
                            value={updatedHolding.securityName || ''}
                            minLength="1"
                            maxLength="6"      
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={updatedHolding.quantity || ''}
                            min="1"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Total Cost:
                        <input
                            type="number"
                            name="totalCost"
                            value={updatedHolding.totalCost || ''}
                            min="1"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Open Date:
                        <input
                            type="date"
                            name="positionOpenDate"
                            value={updatedHolding.positionOpenDate || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Current Value:
                        <input
                            type="number"
                            name="currentValue"
                            value={updatedHolding.currentValue || ''}
                            onChange={handleInputChange}
                            disabled={disableCurrentValue} 
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-button submit">{isAdding ? 'Add Holding' : 'Save Changes'}</button>
                        {!isAdding && (
                            <button type="button" className="modal-button delete" onClick={() => handleDelete(holding.id)}>Delete Holding</button>
                        )}
                        <button type="button" className="modal-button cancel" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditHoldingModal;