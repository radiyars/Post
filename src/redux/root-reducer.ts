import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from './app-reducer';
import { commentsReducer } from './comment-reducer';
import { likesReducer } from './likes-reducer';
import { spamFilter } from './middleware';
import { titleReducer } from './title-reducer';


export const rootReducer = combineReducers({
	likes: likesReducer,
	title: titleReducer,
	comments: commentsReducer,
	app: appReducer,
})

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk, spamFilter)
));

export type AppDispatch = typeof store.dispatch