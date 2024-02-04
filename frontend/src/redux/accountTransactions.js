import { csrfFetch } from "./csrf";

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

export const fetchAccountTransactions = (accountId = null, holdingId = null) => async dispatch => {
    dispatch(fetchTransactionsStart());

    let endpoint = `/api/accounttransactions`; 
    const params = new URLSearchParams();

    if (accountId) params.append('accountId', accountId);
    if (holdingId) params.append('holdingId', holdingId);

    endpoint += params.toString() ? `?${params.toString()}` : '';

    try {
        const response = await csrfFetch(endpoint); 
        const transactionsData = await response.json();
        dispatch(fetchTransactionsSuccess(transactionsData));
    } catch (error) {
        console.error('API Error:', error.message);
        dispatch(fetchTransactionsFail(error.message));
    }
};

export const addTransaction = (transactionData) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/accounttransactions`, {
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


export const updateTransaction = (transactionId, transactionData) => async dispatch => {
    console.log("Updating transaction:", transactionId, transactionData);

    dispatch(updateTransactionStart());
    try {
        const response = await csrfFetch(`/api/accounttransactions/${transactionId}`, {
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

        const accountId = updatedTransaction.accountId;
        dispatch(fetchAccountHoldings(accountId));
        dispatch(fetchAccountDetails(accountId));
    } catch (error) {
        console.error("Error in updating transaction:", error);
        dispatch(updateTransactionFail(error.message));
    }
};


export const deleteTransaction = (transactionId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/accounttransactions/${transactionId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete transaction');
            
        }
        dispatch(deleteTransactionSuccess(transactionId));
        const accountId = updatedTransaction.accountId;
        dispatch(fetchAccountHoldings(accountId));
        dispatch(fetchAccountDetails(accountId));
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
