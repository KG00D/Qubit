const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START';
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL';

const fetchAccountsStart = () => ({ type: FETCH_ACCOUNTS_START });
const fetchAccountsSuccess = accounts => ({ type: FETCH_ACCOUNTS_SUCCESS, payload: accounts });
const fetchAccountsFail = error => ({ type: FETCH_ACCOUNTS_FAIL, payload: error });

export const fetchAccounts = () => {
    return async dispatch => {
        dispatch(fetchAccountsStart());
        try {
            const response = await fetch('/accounts');
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

const initialState = {
    accounts: [],
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
        default:
            return state;
    }
};

export default accountsReducer;