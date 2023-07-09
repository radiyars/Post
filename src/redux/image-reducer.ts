import { Dispatch } from "react"
import { imageApi } from "../api/image-api"
import { AppActionsTypes, errorOn, loaderOff, loaderOn } from "./app-reducer"

//	Actions CONST	---------------------------------------------------------------------------

const SET_IMAGE = 'SET_IMAGE'


//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	imageSrc: './no-image.jpg',
}

type InitialStateType = typeof initialState

// const BaseUrl = 'http://localhost:5000/'
const BaseUrl = 'http://62.113.105.72:5000/'


//	Reducer	-------------------------------------------------------------------------------------
export const imageReducer = (state = initialState, action: ImageActionsTypes): InitialStateType => {
	switch (action.type) {
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

export type ImageActionsTypes = SetImageType


type SetImageType = {
	type: typeof SET_IMAGE
	imageSrc: string
}
export const setImage = (imageSrc: string,): SetImageType => ({ type: SET_IMAGE, imageSrc })



//	Thunks	------------------------------------------------------------------------------------

export function getImageApi() {
	return async (dispatch: Dispatch<ImageActionsTypes | AppActionsTypes>) => {
		try {
			dispatch(loaderOn());
			let data = await imageApi.getImage()
			dispatch(setImage(data.imageSrc))
			dispatch(loaderOff());
		} catch (err) {
			dispatch(errorOn(`Не удалось получить изображение! ${err}`))
			dispatch(loaderOff());
		}
	}
}

export function uploadImage(iamge: any, postId: string) {
	return async (dispatch: Dispatch<ImageActionsTypes | AppActionsTypes>) => {
		try {
			dispatch(loaderOn());
			const formData = new FormData()
			formData.append('image', iamge)
			let data = await imageApi.patchImage(postId, formData)
			dispatch(setImage(data.imageSrc))
			dispatch(loaderOff());
		} catch (err) {
			dispatch(errorOn(`Не удалось установить изображение! ${err}`))
			dispatch(loaderOff());
		}
	}
}

export const imageActions = { getImageApi, uploadImage }