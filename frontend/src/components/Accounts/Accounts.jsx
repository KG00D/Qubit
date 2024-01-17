import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchAccounts, createAccount, updateAccount, deleteAccount } from "../../redux/account";
import { fetchAccounts } from "../../redux/account";


const Accounts = () => {
    const dispatch = useDispatch();

    const { accounts, loading, error } = useSelector(state => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    return (
        <div>
            <h2>Accounts List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>
                        Name: {account.name}, 
                        Type: {account.type}, 
                        Balance: {account.accountBalance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Accounts;
