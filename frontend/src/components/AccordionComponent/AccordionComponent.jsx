import { useState } from "react";

function AccountAccordion({ accounts }) {
  const [openAccountId, setOpenAccountId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (accountId) => {
    if (openAccountId === accountId) {
      setOpenAccountId(null);
    } else {
      setOpenAccountId(accountId);
    }
  };

  return (
    <div>
      <div className="account-item" onClick={() => setIsOpen(!isOpen)}>
        <p className="account-name">{name}</p>
      </div>
      {isOpen && (
        <div className="account-details">
          <button onClick={() => onAccountClick(accountId)}>
            View Details
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountAccordion;
