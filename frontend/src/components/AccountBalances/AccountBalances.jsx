import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountBalances, addAccountBalance, updateAccountBalance } from "../../redux/accountBalances";
import EditHoldingsModal from '../EditHoldingsModal'; 

const AccountBalances = ({ accountId }) => { 
    const dispatch = useDispatch();
    const { balances, loading, error } = useSelector(state => state.balances);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        dispatch(fetchAccountBalances());
    }, [dispatch]);

    const handleEdit = (account) => {
        setCurrentAccount(account);
        setIsModalOpen(true);
    };

    const handleUpdate = (id, updatedAccount) => {
        dispatch(updateAccountBalance(id, updatedAccount))
            .then(() => {
                dispatch(fetchAccountBalances());
            })
            .finally(() => {
                closeModal();
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAccount(null);
    };

    return (
        <div>
            <h2>Accounts Balances</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {balances.map(balances => (
                    <li key={balances.id}>
                        Balance: {balances.balances}
                        <button onClick={() => handleEdit(balances)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountBalances;
