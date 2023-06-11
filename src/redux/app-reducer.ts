import { Dispatch } from "react"
import { appAPI } from "../api/app-api"
import { PostType } from "../types/types"

//	Actions CONST	---------------------------------------------------------------------------

const LOADER_DISPLAY_ON = 'POST/LOADER_DISPLAY_ON'
const LOADER_DISPLAY_OFF = 'POST/LOADER_DISPLAY_OFF'
const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON'
const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF'
const SET_POST = 'SET_POST'


//	Initial State & i'ts type	---------------------------------------------------------------

const initialState: PostType = {
	_id: '',
	name: '',
	isLoading: false,
	error: null,
	imageSrc: './no-image.jpg',
}

const BaseUrl = 'http://localhost:5000/'

//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state = initialState, action: AppActionsTypes): PostType => {
	switch (action.type) {
		case LOADER_DISPLAY_ON:
			return {
				...state,
				isLoading: true
			}

		case LOADER_DISPLAY_OFF:
			return {
				...state,
				isLoading: false
			}

		case ERROR_DISPLAY_ON:
			return {
				...state,
				error: action.text
			}

		case ERROR_DISPLAY_OFF:
			return {
				...state,
				error: null
			}

		case SET_POST:
			return {
				...state,
				_id: action.post._id,
				imageSrc: BaseUrl + action.post.imageSrc.replace('\\', '/'),
			}
		default:
			return state;
	}
}


//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = LoaderOnType | LoaderOffType | ErrorOnType | ErrorOffType | SetPostType


type LoaderOnType = {
	type: typeof LOADER_DISPLAY_ON
}
export const loaderOn = (): LoaderOnType => ({ type: LOADER_DISPLAY_ON })


type LoaderOffType = {
	type: typeof LOADER_DISPLAY_OFF
}
export const loaderOff = (): LoaderOffType => ({ type: LOADER_DISPLAY_OFF })


type ErrorOnType = {
	type: typeof ERROR_DISPLAY_ON
	text: string
}
export const errorOn = (text: string): ErrorOnType => ({ type: ERROR_DISPLAY_ON, text })


type ErrorOffType = {
	type: typeof ERROR_DISPLAY_OFF
}
export const errorOff = (): ErrorOffType => ({ type: ERROR_DISPLAY_OFF })


type SetPostType = {
	type: typeof SET_POST
	post: PostType
}
export const setPost = (post: PostType): SetPostType => ({ type: SET_POST, post })


//	Thunks	------------------------------------------------------------------------------------

export const error = (text: string) => {
	return (dispatch: Dispatch<AppActionsTypes>) => {
		dispatch(errorOn(text))
		setTimeout(() => {
			dispatch(errorOff())
		}, 2000)
	}
}


export function getPostApi() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await appAPI.getPost()
			console.log('data:', data[0]);
			dispatch(setPost(data[0]))
		} catch (err) {
			errorOn(`Не удалось загрузить изображе! ${err}`);
		}
	}
}

// export function getImageSrc() {
// 	return async (dispatch: Dispatch<AppActionsTypes>) => {
// 		try {
// 			let data = await imageAPI.()
// 			dispatch(setImage(data[0].imageSrc, data[0]._id))
// 		} catch (err) {
// 			errorOn(`Не удалось загрузить изображе! ${err}`);
// 		}
// 	}
// }


export const appActions = {
	loaderOn,
	loaderOff,
	errorOn,
	errorOff,
	getPostApi
}