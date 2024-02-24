export const REQUEST_USER_DATA = 'userData/requestUserData';
export const RECEIVE_USER_DATA = 'userData/receiveUserData';
export const USER_DATA_ERROR = 'userData/userDataError';

export const requestUserData = () => ({
    type: REQUEST_USER_DATA,
});

export const receiveUserData = (userData) => ({
    type: RECEIVE_USER_DATA,
    payload: userData,
});

export const userDataError = (error) => ({
    type: USER_DATA_ERROR,
    error,
});

export const fetchUserData = () => async (dispatch) => {
    dispatch(requestUserData());
    try {
        const response = await fetch('/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const userData = await response.json();
            dispatch(receiveUserData(userData));
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        dispatch(userDataError(error.toString()));
    }
};

const initialState = {
  details: null, 
  isLoading: false,
  error: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return {
        ...state,
        isLoading: true,
        error: null, 
      };
    case RECEIVE_USER_DATA:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      };
    case USER_DATA_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userDataReducer;
