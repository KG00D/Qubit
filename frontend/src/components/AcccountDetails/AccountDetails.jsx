import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountDetails } from "../../redux/account";

const AccountDetails = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();

    const { accountDetail, loading, error } = useSelector(state => state.accounts);

    useEffect(() => {
        dispatch(fetchAccountDetails(id)); 
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Account Details</h2>
            {accountDetail && (
                <div>
                    
                    <p>Name: {accountDetail.name}</p>
                    <p>Type: {accountDetail.type}</p>
                    <p>Balance: {accountDetail.accountBalance}</p>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
