const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;


function actionCreator()
{
    return {
        type: 'AN_ACTION',
    }
}

function reducer(state, action)
{
  console.log("reducer called with state", state, "and action ", action);
}
console.log(actionCreator());

let store = createStore(reducer);
console.log('store after init: ', store.getState())

function reducer_1(state, action)
{
  console.log('reducer_1, was called with state', state, 'and action ', action)
  if (typeof state === 'undefined')
  {
    return {}
  }

  return state;
}

// let store_1 = createStore(reducer_1)
// console.log('store_1 after init: ', store_1.getState())

function reducer_2(state = {}, action)
{
  console.log('reducer_2 was called with state', state, 'and action', action)

  return state;
}

let store_2 = createStore(reducer_2)
console.log('store_2 after init: ', store_2.getState())

function reducer_3(state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

var store_3 = createStore(reducer_3)

console.log('store_3 state after initialization:', store_3.getState())





