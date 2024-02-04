import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../../redux/account";
// import EditAccountModal from '../EditAccountModal';

const Accounts = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.accounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleEdit = (account) => {
    setCurrentAccount(account);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Accounts List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={() => handleEdit({})}>Create New Account</button>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            Name: {account.name}, Type: {account.type}, Balance:{" "}
            {account.accountBalance}
            <button onClick={() => handleEdit(account)}>Edit</button>
          </li>
        ))}
      </ul>
      {/* {isModalOpen && 
                <EditAccountModal 
                    account={currentAccount} 
                    onClose={closeModal} 
                    onDelete={handleDelete} 
                    onUpdate={handleUpdate} 
                />
            } */}
    </div>
  );
};

export default Accounts;
