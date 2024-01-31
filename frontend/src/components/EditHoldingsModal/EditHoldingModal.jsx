import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateHolding, deleteHolding, createHolding } from "../../redux/accountHolding";

const EditHoldingModal = ({ accountId, holding, onClose, isAdding }) => {
    const dispatch = useDispatch();

    const defaultHolding = {
        holdingName: '',
        holdingIdentifier: '',
        quantity: '',
        averagePricePaid: '',
        positionOpenDate: '',
        currency: '',
    };
    
    const initialHolding = isAdding ? defaultHolding : holding;
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

    const handleUpdate = (updatedHolding) => {
        dispatch(updateHolding(accountId, holding.id, updatedHolding))
            .finally(onClose);
    };

    const handleDelete = () => {
        dispatch(deleteHolding(accountId, holding.id))
            .finally(onClose);
    };
    
        const handleAddNewHolding = () => {
        dispatch(createHolding(accountId, updatedHolding))
        .finally(onClose);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdding) {
            handleAddNewHolding(updatedHolding);
        } else {
            handleUpdate(updatedHolding); 
        }
    };

 
  return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{isAdding ? 'Add New Holding' : 'Edit Holding'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Holding Name:
                        <input
                            type="text"
                            name="holdingName"
                            value={updatedHolding.holdingName || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Identifier:
                        <input
                            type="text"
                            name="holdingIdentifier"
                            value={updatedHolding.holdingIdentifier || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={updatedHolding.quantity || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Average Price Paid:
                        <input
                            type="number"
                            name="averagePricePaid"
                            value={updatedHolding.averagePricePaid || ''}
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
                        Currency:
                        <input
                            type="text"
                            name="currency"
                            value={updatedHolding.currency || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">{isAdding ? 'Add Holding' : 'Save Changes'}</button>
                    {!isAdding && (
                        <button type="button" onClick={() => handleDelete(holding.id)}>Delete Holding</button>
                    )}
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditHoldingModal;