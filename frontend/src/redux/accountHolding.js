import { csrfFetch } from './csrf';

const FETCH_ACCOUNTHOLDINGS_START = 'FETCH_ACCOUNTHOLDINGS_START';
const FETCH_ACCOUNTHOLDINGS_SUCCESS = 'FETCH_ACCOUNTHOLDINGS_SUCCESS';
const FETCH_ACCOUNTHOLDINGS_FAIL = 'FETCH_ACCOUNTHOLDINGS_FAIL';

const UPDATE_HOLDING_START = 'UPDATE_HOLDING_START';
const UPDATE_HOLDING_SUCCESS = 'UPDATE_HOLDING_SUCCESS';
const UPDATE_HOLDING_FAIL = 'UPDATE_HOLDING_FAIL';

const DELETE_HOLDING_START = 'DELETE_HOLDING_START';
const DELETE_HOLDING_SUCCESS = 'DELETE_HOLDING_SUCCESS';
const DELETE_HOLDING_FAIL = 'DELETE_HOLDING_FAIL';

const CREATE_HOLDING_START = 'CREATE_HOLDING_START';
const CREATE_HOLDING_SUCCESS = 'CREATE_HOLDING_SUCCESS';
const CREATE_HOLDING_FAIL = 'CREATE_HOLDING_FAIL';

const updateHoldingStart = () => ({ type: UPDATE_HOLDING_START });
const updateHoldingSuccess = updatedHolding => ({ type: UPDATE_HOLDING_SUCCESS, payload: updatedHolding });
const updateHoldingFail = error => ({ type: UPDATE_HOLDING_FAIL, payload: error });

const createHoldingStart = () => ({ type: CREATE_HOLDING_START });
const createHoldingSuccess = newHolding => ({ type: CREATE_HOLDING_SUCCESS, payload: newHolding });
const createHoldingFail = error => ({ type: CREATE_HOLDING_FAIL, payload: error });

const deleteHoldingStart = () => ({ type: DELETE_HOLDING_START });
const deleteHoldingSuccess = id => ({ type: DELETE_HOLDING_SUCCESS, payload: id });
const deleteHoldingFail = error => ({ type: DELETE_HOLDING_FAIL, payload: error });

const fetchAccountHoldingsStart = () => ({ 
    type: FETCH_ACCOUNTHOLDINGS_START });

const fetchAccountHoldingsSuccess = data => ({ 
    type: FETCH_ACCOUNTHOLDINGS_SUCCESS, 
    payload: data });

    const fetchAccountHoldingsFail = error => ({ 
    type: FETCH_ACCOUNTHOLDINGS_FAIL, 
    payload: error });

export const fetchAccountHoldings = (accountId) => {
    return async dispatch => {
        dispatch(fetchAccountHoldingsStart());
        try {
            const response = await csrfFetch(`/api/accounts/${accountId}/accountholdings`);

            if (!response.ok) {
                throw new Error('Failed to fetch holdings');
            }

            const holdings = await response.json();

            dispatch(fetchAccountHoldingsSuccess(holdings));
        } catch (error) {
            console.error('Fetch error:', error);
            dispatch(fetchAccountHoldingsFail(error.message));
            }
        };
    };


    export const createHolding = (accountId, holdingDetails) => async dispatch => {
    dispatch(createHoldingStart());
    try {
        const response = await csrfFetch(`/api/accounts/${accountId}/accountholdings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(holdingDetails),
        });
        if (!response.ok) {
            throw new Error('Failed to create holding');
        }
        const data = await response.json();
        dispatch(createHoldingSuccess(data));

        dispatch(fetchAccountHoldings(accountId));
    } catch (error) {
        dispatch(createHoldingFail(error.message));
    }
};

    
export const updateHolding = (accountId, holdingId, updatedDetails) => async dispatch => {
        dispatch(updateHoldingStart());
        try {
            const response = await csrfFetch(`/api/accounts/${accountId}/accountholdings/${holdingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to update holding');
            }
            const data = await response.json();
            dispatch(updateHoldingSuccess(data));
            dispatch(fetchAccountHoldings(accountId));
        } catch (error) {
            dispatch(updateHoldingFail(error.message));
        }
    };
    
  
export const deleteHolding = (accountId, holdingId) => async dispatch => {
        dispatch(deleteHoldingStart());
        try {
            const response = await csrfFetch(`/api/accounts/${accountId}/accountholdings/${holdingId}`,
            { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete holding');
            }
            dispatch(deleteHoldingSuccess(holdingId));
            dispatch(fetchAccountHoldings(accountId));

        } catch (error) {
            dispatch(deleteHoldingFail(error.message));
        }
    };
    

const initialState = {
    holdings: {},
    // holdingDetail: null,
    loading: false,
    error: null
};

const accountHoldingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTHOLDINGS_START:
            return { ...state, loading: true, error: null };
        case FETCH_ACCOUNTHOLDINGS_SUCCESS:
            return { 
                ...state,
                [action.payload.account.id]: {
                    account: action.payload.account,
                    accountHoldings: action.payload.accountHoldings
                },
                loading: false,
                error: null
            }        
        case FETCH_ACCOUNTHOLDINGS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CREATE_HOLDING_START:
            return { ...state, loading: true };
        case CREATE_HOLDING_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    [action.payload.id]: action.payload
                };
        case CREATE_HOLDING_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_HOLDING_START:
            return { ...state, loading: true };
        case UPDATE_HOLDING_SUCCESS:
            return {
                ...state,
                loading: false,
                holdings: {
                    ...state.holdings,
                    [action.payload.id]: action.payload
                }
            };
        case UPDATE_HOLDING_FAIL:
            return { ...state, loading: false, error: action.payload };
        case DELETE_HOLDING_START:
            return { ...state, loading: true, error: null};
        case DELETE_HOLDING_SUCCESS:
            const { accountId, holdingIdentifier } = action.payload;
        const newState = { ...state };
        if (newState[accountId] && newState[accountId].accountHoldings && newState[accountId].accountHoldings[holdingIdentifier]) {
        delete newState[accountId].accountHoldings[holdingIdentifier];
                }
                return {
                    ...newState,
                    loading: false,
                };
        case DELETE_HOLDING_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default accountHoldingsReducer;