import { combineReducers } from "redux";
import { likesReducer } from './likes-reducer';

export const rootReducer = combineReducers({
	likes: likesReducer
})