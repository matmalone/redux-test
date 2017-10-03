const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;
const applyMiddleware = require('redux').applyMiddleware;


function userReducer(state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
function itemsReducer(state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

function speakerReducer(state = {}, action) {
    console.log('speakerReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY':
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}

let reducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    speaker: speakerReducer
})

function setNameActionCreator(name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

var store_0 = createStore(reducer)

console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())

store_0.dispatch({
    type: 'AN_ACTION'
})

console.log('store_0 state after action AN_ACTION:', store_0.getState())

store_0.dispatch(setNameActionCreator('bob'))

console.log('store_0 state after action SET_NAME:', store_0.getState())

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }
}

var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)

store_0 = finalCreateStore(reducer)

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}


console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(asyncSayActionCreator_1('Hi'))
console.log('store_0 state after action SAY:', store_0.getState())

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())



