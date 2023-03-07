import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { likesReducer } from './likes-reducer';
import { titleReducer } from './title-reducer';
import { commentsReducer } from './comment-reducer';
import thunk from "redux-thunk";


export const rootReducer = combineReducers({
	likes: likesReducer,
	title: titleReducer,
	comments: commentsReducer,
})

// export const store = createStore(rootReducer)

// export const store = createStore(rootReducer, compose(
// 	applyMiddleware(
// 		thunk
// 	),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(thunk)
));