import { Dispatch } from "react"
import { imageApi } from "../api/image-api"
import { errorOn } from "./app-reducer"

//	Actions CONST	---------------------------------------------------------------------------

const SET_IMAGE = 'SET_IMAGE'


//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	imageSrc: './no-image.jpg',
}

type InitialStateType = typeof initialState

const BaseUrl = 'http://localhost:5000/'

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
	return async (dispatch: Dispatch<ImageActionsTypes>) => {
		try {
			let data = await imageApi.getImage()
			dispatch(setImage(data.imageSrc))
		} catch (err) {
			errorOn(`Не удалось загрузить изображение! ${err}`);
		}
	}
}

export function uploadImage(iamge: any, postId: string) {
	return async (dispatch: Dispatch<ImageActionsTypes>) => {
		try {
			const formData = new FormData()
			formData.append('image', iamge)
			let data = await imageApi.patchImage(postId, formData)
			dispatch(setImage(data.imageSrc))
		} catch (err) {
			errorOn(`Не удалось установить изображение! ${err}`);
		}
	}
}

export const imageActions = { getImageApi, uploadImage }