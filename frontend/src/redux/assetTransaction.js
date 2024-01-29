const FETCH_TRANSACTIONS_START = 'FETCH_TRANSACTIONS_START';
const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
const FETCH_TRANSACTIONS_FAIL = 'FETCH_TRANSACTIONS_FAIL';

const fetchTransactionsStart = () => ({ type: FETCH_TRANSACTIONS_START });
const fetchTransactionsSuccess = TRANSACTIONS => ({ type: FETCH_TRANSACTIONS_SUCCESS, payload: TRANSACTIONS });
const fetchTransactionsFail = error => ({ type: FETCH_TRANSACTIONS_FAIL, payload: error });


export const fetchAccountTransactions = (accountId) => {
    return async dispatch => {
        dispatch(fetchTransactionsStart());
        try {
            const response = await fetch(`/api/assettransactions/${accountId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch holdings');
            }
            const holdings = await response.json();
            dispatch(fetchTransactionsSuccess(holdings));
        } catch (error) {
            dispatch(fetchTransactionsFail(error.message));
        }
    };
};

export const fetchHoldingsTransactions = (holdingId) => {
    return async dispatch => {
        dispatch(fetchTransactionsStart());
        try {
            const response = await fetch(`/api/assettransactions/${holdingId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch holdings');
            }
            const holdings = await response.json();
            dispatch(fetchTransactionsSuccess(holdings));
        } catch (error) {
            dispatch(fetchTransactionsFail(error.message));
        }
    };
};

const initialState = {
    accounts: [],
    assetTransactions: null,
    loading: false,
    error: null
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_START:
            return { ...state, loading: true, error: null };
        case FETCH_TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, assetHoldings: action.payload };
        case FETCH_TRANSACTIONS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default transactionsReducer;