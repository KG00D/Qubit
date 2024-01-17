import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetHoldings } from "../../redux/assetHolding";

const AssetHoldings = () => {
    const { accountId } = useParams(); 
    const dispatch = useDispatch();
    
    const { assetHoldings, loading, error } = useSelector(state => state.holdings?.assetHoldings || {});

    useEffect(() => {
        dispatch(fetchAssetHoldings(accountId)); 
    }, [dispatch, accountId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!assetHoldings || Object.keys(assetHoldings).length === 0) return <p>No asset holdings found.</p>;

    return (
        <div>
            <h2>Asset Details</h2>
            {Object.values(assetHoldings).map((holding, index) => (
                <div key={index}>
                    <p>Name: {holding.holdingName}</p>
                    <p>Type: {holding.holdingIdentifier}</p>
                    <p>Quantity: {holding.quantity}</p>
                    <p>Balance: {holding.averagePricePaid}</p>
                </div>
            ))}
        </div>
    );
};

export default AssetHoldings;