import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetTransactions } from "../../redux/assetTransaction";

const AssetTransactions = () => {
    const { holdingId } = useParams(); 
    const dispatch = useDispatch();
    const { assetTransactions, loading, error } = useSelector(state => state.accounts);
    
    useEffect(() => {
        dispatch(fetchAssetTransactions(holdingId)); 
    }, [dispatch, holdingId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Asset Transactions</h2>
            {assetTransactions && (
                <div>
                    <p>Name: {assetTransactions.name}</p>
                    <p>Type: {assetTransactions.type}</p>
                    <p>Balance: {assetTransactions.accountBalance}</p>




                    
                </div>
            )}
        </div>
    );
};

export default AssetTransactions;
