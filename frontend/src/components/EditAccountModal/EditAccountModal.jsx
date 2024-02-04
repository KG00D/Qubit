import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAccount, deleteAccount, addAccount } from "../../redux/account";
import "./EditAccountModal.css";

const EditAccountModal = ({ account, onClose, isAddMode }) => {
  const dispatch = useDispatch();
  const [availableSubtypes, setAvailableSubtypes] = useState([]);

  const initialAccount = isAddMode ? emptyAccount : account;
  const [updatedAccount, setUpdatedAccount] = useState(initialAccount);

  const [selectedAssetType, setSelectedAssetType] = useState(
    isAddMode ? "" : account.type || ""
  );

  const emptyAccount = {
    name: "",
    type: "",
    subType: "",
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (selectedAssetType) {
      setAvailableSubtypes(assetOptions[selectedAssetType] || []);
    } else {
      setAvailableSubtypes([]);
    }

    if (account && account.positionOpenDate) {
      const formattedDate = account.positionOpenDate.split("T")[0];
      setUpdatedAccount({ ...updatedAccount, positionOpenDate: formattedDate });
    }
  }, [selectedAssetType, account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({ ...updatedAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...updatedAccount,
      type: selectedAssetType,
    };

    if (isAddMode) {
      await dispatch(addAccount(payload));
    } else {
      await dispatch(updateAccount(account.id, payload));
    }
    onClose();
  };

  const handleDelete = () => {
    if (!isAddMode) {
      dispatch(deleteAccount(account.id));
      onClose();
    }
  };

  const assetOptions = {
    Retirement: ["401k", "403b", "ROTH 401k", "ROTH IRA", "IRA"],
    Brokerage: ["Individual", "Joint", "Custodial"],
    Crypto: ["CoinBase", "Cold Wallet", "Hot Wallet", "NFT"],
    RealEstate: ["Residential", "Commercial", "Land"],
    PersonalProperty: ["Vehicle", "Boats", "Art", "Jewlery"],
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <h2>{isAddMode ? "Add Account" : "Edit Account"}</h2>
        <form onSubmit={handleSubmit} className="account-form">
          <label className="account-label">
            Name:
            <input
              type="text"
              name="name"
              value={updatedAccount.name || ""}
              onChange={handleInputChange}
              className="account-input"
              maxLength={12}
              minLength={5}
            />
          </label>
          <label>
            Asset Type:
            <select
              name="type"
              value={selectedAssetType}
              onChange={(e) => setSelectedAssetType(e.target.value)}
              className="asset-input"
            >
              <option value="">Select Asset Type</option>
              {Object.keys(assetOptions).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Asset Subtype:
            <select
              name="subType"
              value={updatedAccount.subType || ""}
              onChange={handleInputChange}
              className="asset-input"
              disabled={!selectedAssetType}
            >
              <option value="">Select Asset Subtype</option>
              {availableSubtypes.map((subType) => (
                <option key={subType} value={subType}>
                  {subType}
                </option>
              ))}
            </select>
          </label>
          <div className="account-buttons">
            <button type="submit" className="account-button submit">
              {isAddMode ? "Add Account" : "Save Changes"}
            </button>
            {!isAddMode && (
              <>
                <button
                  type="button"
                  className="account-button delete"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  className="account-button cancel-account-add-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
