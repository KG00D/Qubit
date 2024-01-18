import { csrfFetch } from './csrf';

const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START';
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL';

const FETCH_ACCOUNT_DETAIL_START = 'FETCH_ACCOUNT_DETAIL_START';
const FETCH_ACCOUNT_DETAIL_SUCCESS = 'FETCH_ACCOUNT_DETAIL_SUCCESS';
const FETCH_ACCOUNT_DETAIL_FAIL = 'FETCH_ACCOUNT_DETAIL_FAIL';

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
const fetchAccountDetailSuccess = account => ({ type: FETCH_ACCOUNT_DETAIL_SUCCESS, payload: account });
const fetchAccountDetailFail = error => ({ type: FETCH_ACCOUNT_DETAIL_FAIL, payload: error });

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
            const response = await csrfFetch(`/api/accounts/${accountId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch account details');
            }
            const accountDetails = await response.json();
            console.log(accountDetails, 'HERE ARE ACCT DETAILDDDD')
            dispatch(fetchAccountDetailSuccess(accountDetails));
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
            return { ...state, loading: false, accountDetail: action.payload };
        case FETCH_ACCOUNT_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CREATE_ACCOUNT_START:
            return { ...state, accounts: [...state.accounts, action.payload], loading: false };
        case CREATE_ACCOUNT_SUCCESS:
            return { ...state, accounts: [...state.accounts, action.payload], loading: false };
        case CREATE_ACCOUNT_FAIL:
            return { ...state, accounts: [...state.accounts, action.payload], loading: false };
        case UPDATE_ACCOUNT_START:
            return { ...state, loading: true };
        case UPDATE_ACCOUNT_SUCCESS:
            console.log(action);
            return { 
                ...state, 
                accounts: state.accounts.map(account => 
                    account.id === action.payload.id ? { ...account, ...action.payload } : account
                ), 
                loading: false 
            };
        case DELETE_ACCOUNT_START:
            return { 
                ...state, 
                accounts: state.accounts.filter(account => account.id !== action.payload), 
                loading: false 
            };
        default:
            return state;
    }
};

export default accountsReducer;