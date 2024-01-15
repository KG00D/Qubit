const FETCH_HOLDINGS_START = 'FETCH_HOLDINGS_START';
const FETCH_HOLDINGS_SUCCESS = 'FETCH_HOLDINGS_SUCCESS';
const FETCH_HOLDINGS_FAIL = 'FETCH_HOLDINGS_FAIL';

const fetchHoldingsStart = () => ({ type: FETCH_HOLDINGS_START });
const fetchHoldingsSuccess = HOLDINGS => ({ type: FETCH_HOLDINGS_SUCCESS, payload: HOLDINGS });
const fetchHoldingsFail = error => ({ type: FETCH_HOLDINGS_FAIL, payload: error });

export const fetchHoldings = (accountId) => {
    return async dispatch => {
        dispatch(fetchHoldingsStart());
        try {
            const response = await fetch(`/api/assetholdings/${accountId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch holdings');
            }
            const holdings = await response.json();
            dispatch(fetchHoldingsSuccess(holdings));
        } catch (error) {
            dispatch(fetchHoldingsFail(error.message));
        }
    };
};

const initialState = {
    holdings: [],
    loading: false,
    error: null
};

const holdingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOLDINGS_START:
            return { ...state, loading: true, error: null };
        case FETCH_HOLDINGS_SUCCESS:
            return { ...state, loading: false, HOLDINGS: action.payload };
        case FETCH_HOLDINGS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default holdingsReducer;