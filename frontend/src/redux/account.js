const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START';
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL';
const FETCH_ACCOUNT_DETAIL_START = 'FETCH_ACCOUNT_DETAIL_START';
const FETCH_ACCOUNT_DETAIL_SUCCESS = 'FETCH_ACCOUNT_DETAIL_SUCCESS';
const FETCH_ACCOUNT_DETAIL_FAIL = 'FETCH_ACCOUNT_DETAIL_FAIL';


const fetchAccountsStart = () => ({ type: FETCH_ACCOUNTS_START });
const fetchAccountsSuccess = accounts => ({ type: FETCH_ACCOUNTS_SUCCESS, payload: accounts });
const fetchAccountsFail = error => ({ type: FETCH_ACCOUNTS_FAIL, payload: error });
const fetchAccountDetailStart = () => ({ type: FETCH_ACCOUNT_DETAIL_START });
const fetchAccountDetailSuccess = account => ({ type: FETCH_ACCOUNT_DETAIL_SUCCESS, payload: account });
const fetchAccountDetailFail = error => ({ type: FETCH_ACCOUNT_DETAIL_FAIL, payload: error });


export const fetchAccounts = () => {
    return async dispatch => {
        dispatch(fetchAccountsStart());
        try {
            const response = await fetch('/api/accounts');
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
            const response = await fetch(`/api/accounts/${accountId}`);
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
        default:
            return state;
    }
};

export default accountsReducer;