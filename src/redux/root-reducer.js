import { combineReducers, legacy_createStore as createStore } from "redux";
import { likesReducer } from './likes-reducer';
import { titleReducer } from './title-reducer';
import { commentsReducer } from './comment-reducer';


export const rootReducer = combineReducers({
	likes: likesReducer,
	title: titleReducer,
	comments: commentsReducer,
})

export const store = createStore(rootReducer)