import { useState, useEffect } from 'react';

const EditHoldingModal = ({ holding, onClose, onUpdate, onDelete }) => {
    const [updatedHolding, setUpdatedHolding] = useState(holding);

    useEffect(() => {
        setUpdatedHolding(holding);
    }, [holding]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedHolding({ ...updatedHolding, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(holding.id, updatedHolding); 
        onClose();
    };

 
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Holding</h2>
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
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => onDelete(holding.id)}>Delete Holding</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditHoldingModal;
