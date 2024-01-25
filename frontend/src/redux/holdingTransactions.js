// Action Types
const FETCH_TRANSACTIONS_START = 'FETCH_TRANSACTIONS_START';
const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
const FETCH_TRANSACTIONS_FAIL = 'FETCH_TRANSACTIONS_FAIL';

const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
const ADD_TRANSACTION_FAIL = 'ADD_TRANSACTION_FAIL';

const UPDATE_TRANSACTION_START = 'UPDATE_TRANSACTION_START';
const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
const UPDATE_TRANSACTION_FAIL = 'UPDATE_TRANSACTION_FAIL';

const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
const DELETE_TRANSACTION_FAIL = 'DELETE_TRANSACTION_FAIL';

const fetchTransactionsStart = () => ({ type: FETCH_TRANSACTIONS_START });
const fetchTransactionsSuccess = transactions => ({ type: FETCH_TRANSACTIONS_SUCCESS, payload: transactions });
const fetchTransactionsFail = error => ({ type: FETCH_TRANSACTIONS_FAIL, payload: error });

const addTransactionSuccess = transaction => ({ type: ADD_TRANSACTION_SUCCESS, payload: transaction });
const addTransactionFail = error => ({ type: ADD_TRANSACTION_FAIL, payload: error });

const updateTransactionStart = () => ({ type: UPDATE_TRANSACTION_START });
const updateTransactionSuccess = transaction => ({ type: UPDATE_TRANSACTION_SUCCESS, payload: transaction });
const updateTransactionFail = error => ({ type: UPDATE_TRANSACTION_FAIL, payload: error });

const deleteTransactionSuccess = transactionId => ({ type: DELETE_TRANSACTION_SUCCESS, payload: transactionId });
const deleteTransactionFail = error => ({ type: DELETE_TRANSACTION_FAIL, payload: error });

export const fetchHoldingTransactions = (accountId, holdingId) => async dispatch => {
    dispatch(fetchTransactionsStart());
    try {
        const response = await fetch(`/api/accounts/${accountId}/accountholdings/${holdingId}/accounttransactions`);
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        const transactions = await response.json();
        dispatch(fetchTransactionsSuccess(transactions));
    } catch (error) {
        dispatch(fetchTransactionsFail(error.message));
    }
};

export const addTransaction = (accountId, holdingId, transactionData) => async dispatch => {
    try {
        const response = await fetch(`/api/accounts/${accountId}/accountholdings/${holdingId}/accounttransactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transactionData)
        });
        if (!response.ok) {
            throw new Error('Failed to add transaction');
        }
        const newTransaction = await response.json();
        dispatch(addTransactionSuccess(newTransaction));
    } catch (error) {
        dispatch(addTransactionFail(error.message));
    }
};

export const updateTransaction = (accountId, holdingId, transactionId, transactionData) => async dispatch => {
    dispatch(updateTransactionStart());
    try {
        const response = await fetch(`/api/accounts/${accountId}/accountholdings/${holdingId}/accounttransactions/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });
        if (!response.ok) {
            throw new Error('Failed to update transaction');
        }
        const updatedTransaction = await response.json();
        dispatch(updateTransactionSuccess(updatedTransaction));
    } catch (error) {
        dispatch(updateTransactionFail(error.message));
    }
};

export const deleteTransaction = (accountId, holdingId, transactionId) => async dispatch => {
    try {
        const response = await fetch(`/api/accounts/${accountId}/accountholdings/${holdingId}/accounttransactions/${transactionId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete transaction');
        }
        dispatch(deleteTransactionSuccess(transactionId));
    } catch (error) {
        dispatch(deleteTransactionFail(error.message));
    }
};

const initialState = {
    accounts: [],
    accountTransactions: null,
    loading: false,
    error: null
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_START:
            return { ...state, loading: true, error: null };
        case FETCH_TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, accountTransactions: action.payload };
        case FETCH_TRANSACTIONS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ADD_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                accountTransactions: [...state.accountTransactions, action.payload]
            };
        case ADD_TRANSACTION_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_TRANSACTION_START:
            return { ...state, loading: true };
        case UPDATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                accountTransactions: state.accountTransactions.map(transaction =>
                    transaction.id === action.payload.id ? action.payload : transaction
                )
            };
        case UPDATE_TRANSACTION_FAIL:
            return { ...state, loading: false, error: action.payload };
        case DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                accountTransactions: state.accountTransactions.filter(transaction => transaction.id !== action.payload)
            };
        case DELETE_TRANSACTION_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default transactionsReducer;
