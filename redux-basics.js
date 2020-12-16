const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}


// Reducer
// reducer function recevies to arguments the first one is the current state and the second one is the action & the state is the old state which it then may update so then the function has to return one thing and this is the updated state   
// after we return the current state we could use the reducer and pass it as argument to createStore 
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        } 
    }
    if(action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        } 
    }

};


// store
// create store doesn't do much though store needs to be initialized with a reducer because the reducer
// and always we have one reducer even if we combine multiple ones that will be merged into one the reducer is storngly connected to the store
// the reducer is the only thing may update the state in the end that's why we need to pass the reducer to this creation function here because it's so closely connected to the state
// so we need to create the reducer first before we create the store 
const store = createStore(rootReducer);
console.log(store.getState());


// subscription
// subscribe method takes an argument, a function which will be executed when ever the state is updated, so whenever an action reched the reducer the function we passed to subscribe doesn't get any arguments, In the function body we can execute any code we want on state updates 
// subscribtion triggered when ever an action is dispatched
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});


// dispatching action
// dispatch is a function takes an argument and that argument is an action, that should be a javascript object needs to have a [[[type]]] property 
store.dispatch({ type: 'INC_COUNTER' });
// You can add any other properties you want to this object 
// store.dispatch({ type: 'ADD_COUNTER', value, name, id });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log(store.getState());





