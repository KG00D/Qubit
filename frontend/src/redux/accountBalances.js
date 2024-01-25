// Action Types
const FETCH_BALANCES_START = 'FETCH_BALANCES_START';
const FETCH_BALANCES_SUCCESS = 'FETCH_BALANCES_SUCCESS';
const FETCH_BALANCES_FAIL = 'FETCH_BALANCES_FAIL';

const ADD_BALANCE_SUCCESS = 'ADD_BALANCE_SUCCESS';
const ADD_BALANCE_FAIL = 'ADD_BALANCE_FAIL';

const UPDATE_BALANCE_START = 'UPDATE_BALANCE_START';
const UPDATE_BALANCE_SUCCESS = 'UPDATE_BALANCE_SUCCESS';
const UPDATE_BALANCE_FAIL = 'UPDATE_BALANCE_FAIL';

const FETCH_TOTAL_BALANCES_START = 'FETCH_TOTAL_BALANCES_START';
const FETCH_TOTAL_BALANCES_SUCCESS = 'FETCH_TOTAL_BALANCES_SUCCESS';
const FETCH_TOTAL_BALANCES_FAIL = 'FETCH_TOTAL_BALANCES_FAIL';

const fetchBalancesStart = () => ({ type: FETCH_BALANCES_START });
const fetchBalancesSuccess = balances => ({ type: FETCH_BALANCES_SUCCESS, payload: balances });
const fetchBalancesFail = error => ({ type: FETCH_BALANCES_FAIL, payload: error });

const fetchTotalBalancesStart = () => ({ type: FETCH_TOTAL_BALANCES_START });
const fetchTotalBalancesSuccess = totalBalances => ({ type: FETCH_TOTAL_BALANCES_SUCCESS, payload: totalBalances });
const fetchTotalBalancesFail = error => ({ type: FETCH_TOTAL_BALANCES_FAIL, payload: error });

const addBalanceSuccess = balance => ({ type: ADD_BALANCE_SUCCESS, payload: balance });
const addBalanceFail = error => ({ type: ADD_BALANCE_FAIL, payload: error });

const updateBalanceStart = () => ({ type: UPDATE_BALANCE_START });
const updateBalanceSuccess = balance => ({ type: UPDATE_BALANCE_SUCCESS, payload: balance });
const updateBalanceFail = error => ({ type: UPDATE_BALANCE_FAIL, payload: error });

export const fetchAccountBalances = accountId => async dispatch => {
    dispatch(fetchBalancesStart());
    try {
        const response = await fetch(`/api/accounts/${accountId}/balances`);
        if (!response.ok) {
            throw new Error('Failed to fetch balances');
        }
        const balances = await response.json();
        dispatch(fetchBalancesSuccess(balances));
    } catch (error) {
        dispatch(fetchBalancesFail(error.message));
    }
};

export const addAccountBalance = (accountId, balanceData) => async dispatch => {
    try {
        const response = await fetch(`/api/accounts/${accountId}/balances`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(balanceData)
        });
        if (!response.ok) {
            throw new Error('Failed to add balance');
        }
        const newBalance = await response.json();
        dispatch(addBalanceSuccess(newBalance));
    } catch (error) {
        dispatch(addBalanceFail(error.message));
    }
};

export const fetchTotalBalancesByDate = () => async dispatch => {
    dispatch(fetchTotalBalancesStart());
    try {
        const response = await fetch('/api/accountbalancesbydate');
        if (!response.ok) {
            throw new Error('Failed to fetch total balances');
        }
        const totalBalances = await response.json();
        console.log(totalBalances, 'HERES TOTAL BALANCES')
        dispatch(fetchTotalBalancesSuccess(totalBalances));
    } catch (error) {
        dispatch(fetchTotalBalancesFail(error.message));
    }
};

export const updateAccountBalance = (balanceId, balanceData) => async dispatch => {
    dispatch(updateBalanceStart());
    try {
        const response = await fetch(`/api/balances/${balanceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(balanceData),
        });
        if (!response.ok) {
            throw new Error('Failed to update balance');
        }
        const updatedBalance = await response.json();
        dispatch(updateBalanceSuccess(updatedBalance));
    } catch (error) {
        dispatch(updateBalanceFail(error.message));
    }
};

const initialState = {
    totalBalancesByDate: [],
    loadingTotalBalances: false,
    balances: [],
    loading: false,
    error: null
};

const balancesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOTAL_BALANCES_START:
            return { ...state, loadingTotalBalances: true, error: null };
        case FETCH_TOTAL_BALANCES_SUCCESS:
            return { ...state, loadingTotalBalances: false, totalBalancesByDate: action.payload };
        case FETCH_TOTAL_BALANCES_FAIL:
            return { ...state, loadingTotalBalances: false, error: action.payload };
        case FETCH_BALANCES_START:
            return { ...state, loading: true, error: null };
        case FETCH_BALANCES_SUCCESS:
            return { ...state, loading: false, balances: action.payload };
        case FETCH_BALANCES_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ADD_BALANCE_SUCCESS:
            return { ...state, loading: false, balances: [...state.balances, action.payload] };
        case ADD_BALANCE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_BALANCE_START:
            return { ...state, loading: true };
        case UPDATE_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                balances: state.balances.map(balance =>
                    balance.id === action.payload.id ? action.payload : balance
                )
            };
        case UPDATE_BALANCE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default balancesReducer;
