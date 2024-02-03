import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateHolding, deleteHolding, createHolding } from "../../redux/accountHolding";
import "./EditHoldingModal.css";

const EditHoldingModal = ({ accountId, holding, onClose, isAdding }) => {
    const dispatch = useDispatch();

    const defaultHolding = {
        holdingName: '',
        securityName: '',
        quantity: '',
        averagePricePaid: '',
        positionOpenDate: '',
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
        <div className="modal">
            <h2>{isAdding ? 'Add New Holding' : 'Edit Holding'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
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
                        Security:
                        <input
                            type="text"
                            name="securityName"
                            value={updatedHolding.securityName || ''}
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