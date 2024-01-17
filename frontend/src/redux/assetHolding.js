const FETCH_ASSETHOLDINGS_START = 'FETCH_ASSETHOLDINGS_START';
const FETCH_ASSETHOLDINGS_SUCCESS = 'FETCH_ASSETHOLDINGS_SUCCESS';
const FETCH_ASSETHOLDINGS_FAIL = 'FETCH_ASSETHOLDINGS_FAIL';

const fetchAssetHoldingsStart = () => ({ type: FETCH_ASSETHOLDINGS_START });
const fetchAssetHoldingsSuccess = HOLDINGS => ({ type: FETCH_ASSETHOLDINGS_SUCCESS, payload: HOLDINGS });
const fetchAssetHoldingsFail = error => ({ type: FETCH_ASSETHOLDINGS_FAIL, payload: error });

export const fetchAssetHoldings = (accountId) => {
    return async dispatch => {
        dispatch(fetchAssetHoldingsStart());
        try {
            const response = await fetch(`/api/assetholdings/${accountId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch holdings');
            }
            const holdings = await response.json();
            console.log(holdings, 'HERE IS MY FETCH ASSET RESPONSE')

            dispatch(fetchAssetHoldingsSuccess(holdings));
        } catch (error) {
            dispatch(fetchAssetHoldingsFail(error.message));
        }
    };
};


const initialState = {
    assetHoldings: null,
    loading: false,
    error: null
};

const assetHoldingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSETHOLDINGS_START:
            return { ...state, loading: true, error: null };
        case FETCH_ASSETHOLDINGS_SUCCESS:
            return { ...state, loading: false, assetHoldings: action.payload };
        case FETCH_ASSETHOLDINGS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default assetHoldingsReducer;