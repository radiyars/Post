import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { appReducer } from './app-reducer'
import { commentsReducer } from "./comments-reducer"
import { imageReducer } from "./image-reducer"
import { likesReducer } from './likes-reducer'
import { spamFilter } from './middleware'
import { nameReducer } from './name-reducer'


export const rootReducer = combineReducers({
	likes: likesReducer,
	title: nameReducer,
	comments: commentsReducer,
	name: nameReducer,
	app: appReducer,
	image: imageReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk, spamFilter)
));

