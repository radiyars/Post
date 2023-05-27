import { Dispatch } from "react"
import { imageAPI } from "../api/app-api"

//	Actions CONST	---------------------------------------------------------------------------

const LOADER_DISPLAY_ON = 'POST/LOADER_DISPLAY_ON'
const LOADER_DISPLAY_OFF = 'POST/LOADER_DISPLAY_OFF'
const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON'
const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF'
const SET_IMAGE = 'SET_IMAGE'


//	Initial State & i'ts type	---------------------------------------------------------------

export type InitialStateType = {
	isLoading: boolean
	error: string | null
	imageSrc: string
}

const initialState: InitialStateType = {
	isLoading: false,
	error: null,
	imageSrc: './no-image.jpg',
}
const BaseUrl = 'http://localhost:5000/'

//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
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
		case SET_IMAGE:
			return {
				...state,
				imageSrc: BaseUrl + action.imageSrc.replace('\\', '/')
			}
		default:
			return state;
	}
}


//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = LoaderOnType | LoaderOffType | ErrorOnType | ErrorOffType | SetImageType


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


type SetImageType = {
	type: typeof SET_IMAGE
	imageSrc: string
}
export const setImage = (imageSrc: string): SetImageType => ({ type: SET_IMAGE, imageSrc })


//	Thunks	------------------------------------------------------------------------------------

export const error = (text: string) => {
	return (dispatch: Dispatch<AppActionsTypes>) => {
		dispatch(errorOn(text))
		setTimeout(() => {
			dispatch(errorOff())
		}, 2000)
	}
}

export function getImageSrc() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await imageAPI.getImage()
			dispatch(setImage(data[0].imageSrc))
		} catch (err) {
			alert(`Не удалось загрузить изображе! ${err}`)
		}
	}
}


export const appActions = { loaderOn, loaderOff, errorOn, errorOff, getImageSrc }