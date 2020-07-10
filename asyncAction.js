const redux = require('redux');
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;


const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type:FETCH_USERS_FAILURE,
    payload: error
  }
}

const initialState = {
  loading: true,
  data: [],
  error:''
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: ''
        }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
  }
}

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('http://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data.map(user => user.id);
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer,applyMiddleWare(thunkMiddleWare));

store.subscribe(() => {console.log(store.getState())})

store.dispatch(fetchUsers());
