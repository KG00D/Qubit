import { csrfFetch } from './csrf';

const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START';
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL';

const FETCH_ACCOUNT_DETAIL_START = 'FETCH_ACCOUNT_DETAIL_START';
const FETCH_ACCOUNT_DETAIL_SUCCESS = 'FETCH_ACCOUNT_DETAIL_SUCCESS';
const FETCH_ACCOUNT_DETAIL_FAIL = 'FETCH_ACCOUNT_DETAIL_FAIL'

const FETCH_ACCOUNT_HOLDINGS_START = 'FETCH_ACCOUNT_HOLDINGS_START';
const FETCH_ACCOUNT_HOLDINGS_SUCCESS = 'FETCH_ACCOUNT_HOLDINGS_SUCCESS';
const FETCH_ACCOUNT_HOLDINGS_FAIL = 'FETCH_ACCOUNT_HOLDINGS_FAIL';

const CREATE_ACCOUNT_START = 'CREATE_ACCOUNT_START';
const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
const CREATE_ACCOUNT_FAIL = 'CREATE_ACCOUNT_FAIL';

const UPDATE_ACCOUNT_START = 'UPDATE_ACCOUNT_START';
const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
const UPDATE_ACCOUNT_FAIL = 'UPDATE_ACCOUNT_FAIL';

const DELETE_ACCOUNT_START = 'DELETE_ACCOUNT_START';
const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
const DELETE_ACCOUNT_FAIL = 'DELETE_ACCOUNT_FAIL';

const fetchAccountsStart = () => ({ type: FETCH_ACCOUNTS_START });
const fetchAccountsSuccess = accounts => ({ type: FETCH_ACCOUNTS_SUCCESS, payload: accounts });
const fetchAccountsFail = error => ({ type: FETCH_ACCOUNTS_FAIL, payload: error });

const fetchAccountDetailStart = () => ({ type: FETCH_ACCOUNT_DETAIL_START });
const fetchAccountDetailSuccess = (data) => ({ type: FETCH_ACCOUNT_DETAIL_SUCCESS, payload: data });
const fetchAccountDetailFail = error => ({ type: FETCH_ACCOUNT_DETAIL_FAIL, payload: error });

const fetchAccountHoldingsStart = () => ({ type: FETCH_ACCOUNT_HOLDINGS_START });
const fetchAccountHoldingsSuccess = (accountId, holdings) => ({ 
    type: FETCH_ACCOUNT_HOLDINGS_SUCCESS, 
    payload: { accountId, holdings } 
});

const fetchAccountHoldingsFail = error => ({ type: FETCH_ACCOUNT_HOLDINGS_FAIL, payload: error });

const createAccountStart = () => ({ type: CREATE_ACCOUNT_START });
const createAccountSuccess = account => ({ type: CREATE_ACCOUNT_SUCCESS, payload: account });
const createAccountFail = error => ({ type: CREATE_ACCOUNT_FAIL, payload: error });

const updateAccountStart = () => ({ type: UPDATE_ACCOUNT_START });
const updateAccountSuccess = account => ({ type: UPDATE_ACCOUNT_SUCCESS, payload: account });
const updateAccountFail = error => ({ type: UPDATE_ACCOUNT_FAIL, payload: error });

const deleteAccountStart = () => ({ type: DELETE_ACCOUNT_START });
const deleteAccountSuccess = accountId => ({ type: DELETE_ACCOUNT_SUCCESS, payload: accountId });
const deleteAccountFail = error => ({ type: DELETE_ACCOUNT_FAIL, payload: error });

export const fetchAccounts = () => {
    return async dispatch => {
        dispatch(fetchAccountsStart());
        try {
            const response = await csrfFetch('/api/accounts');
            if (!response.ok) {
                throw new Error('Failed to fetch accounts');
            }
            const accounts = await response.json();
            dispatch(fetchAccountsSuccess(accounts));
        } catch (error) {
            dispatch(fetchAccountsFail(error.message));
        }
    };
};

export const fetchAccountDetails = (accountId) => {
    return async dispatch => {
        dispatch(fetchAccountDetailStart());
        try {

            const detailsResponse = await csrfFetch(`/api/accounts/${accountId}`);
            if (!detailsResponse.ok) {
                throw new Error('Failed to fetch account details');
            }
            const detailsData = await detailsResponse.json();

            const holdingsResponse = await csrfFetch(`/api/accounts/${accountId}/holdings`);
            if (!holdingsResponse.ok) {
                throw new Error('Failed to fetch account holdings');
            }
            const holdingsData = await holdingsResponse.json();

            dispatch(fetchAccountDetailSuccess({
                account: detailsData,
                accountHoldings: holdingsData.accountHoldings, 
            }));
        } catch (error) {
            dispatch(fetchAccountDetailFail(error.message));
        }
    };
};


export const createAccount = accountDetails => async dispatch => {
    dispatch(createAccountStart());
    try {
        const response = await csrfFetch('/api/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(accountDetails),
        });
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        const data = await response.json();
        dispatch(createAccountSuccess(data));
    } catch (error) {
        dispatch(createAccountFail(error.message));
    }
};
  
export const updateAccount = (accountId, updatedDetails) => async dispatch => {
    dispatch(updateAccountStart());
    try {
        const response = await csrfFetch(`/api/accounts/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(updatedDetails),
        });
        if (!response.ok) {
            throw new Error('Failed to update account');
        }
        const data = await response.json();
        dispatch(updateAccountSuccess(data));
    } catch (error) {
        dispatch(updateAccountFail(error.message));
    }
};

export const fetchAccountHoldings = (accountId) => {
    return async dispatch => {
        dispatch(fetchAccountHoldingsStart());
        try {
            const response = await csrfFetch(`/api/accounts/${accountId}/holdings`);
            if (!response.ok) {
                throw new Error('Failed to fetch account holdings');
            }
            const holdings = await response.json();
            dispatch(fetchAccountHoldingsSuccess(accountId, holdings));
        } catch (error) {
            dispatch(fetchAccountHoldingsFail(error.message));
        }
    };
};

export const deleteAccount = id => async dispatch => {
    dispatch(deleteAccountStart());
    try {
        const response = await csrfFetch(`/api/accounts/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete account');
        }
        dispatch(deleteAccountSuccess(id));
    } catch (error) {
        dispatch(deleteAccountFail(error.message));
    }
};

const initialState = {
    accounts: [],
    accountDetail: null,
    accountHoldings: {},
    loading: false,
    error: null
};

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS_START:
            return { ...state, loading: true, error: null };

        case FETCH_ACCOUNTS_SUCCESS:
            return { ...state, loading: false, accounts: action.payload };

        case FETCH_ACCOUNTS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ACCOUNT_DETAIL_START:
            return { ...state, loading: true, error: null };

        case FETCH_ACCOUNT_DETAIL_SUCCESS:
            const { account, accountHoldings } = action.payload;
            return {
                ...state,
                accountDetail: account,
                accountHoldings: {
                    ...state.accountHoldings,
                    [account.id]: {
                        account: account,
                        assetHoldings: accountHoldings,
                    },
                },
                loading: false,
                error: null,
            };

        case FETCH_ACCOUNT_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CREATE_ACCOUNT_START:
            return { ...state, loading: true };

        case CREATE_ACCOUNT_SUCCESS:
            return { ...state, accounts: [...state.accounts, action.payload], loading: false };

        case CREATE_ACCOUNT_FAIL:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_ACCOUNT_START:
            return { ...state, loading: true };

        case UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.map(acc =>
                    acc.id === action.payload.id ? { ...acc, ...action.payload } : acc
                ),
                loading: false
            };

        case DELETE_ACCOUNT_START:
            return { ...state, loading: true };

        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.filter(acc => acc.id !== action.payload),
                loading: false
            };

        case DELETE_ACCOUNT_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default accountsReducer;