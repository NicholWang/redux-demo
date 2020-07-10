const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const loger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';


//action
const buycake = () => {
  return {
    type: BUY_CAKE,
    info: 'cake'
  }
}

const buyIceCream = () => {
  return {
    type: BUY_ICECREAM,
    info: 'icecream'
  }
}

const initialCakeState = {
  numOfCakes: 10,
}

const initialIceCreamState = {
  numOfIceCream:20
}

//reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type){
    case 'BUY_CAKE':
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    default: return state;
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type){
    case 'BUY_ICECREAM':
        return {
          ...state,
          numOfIceCream: state.numOfIceCream - 1
        };
    
    default: return state;
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer
})
const store = createStore(rootReducer,applyMiddleware(loger));

console.log('Initial State',store.getState());

const unsubscribe = store.subscribe(() => console.log('Update state',store.getState()))

store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe();
