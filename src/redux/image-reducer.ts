import { Dispatch } from "react"
import { imageAPI } from "../api/image-api"
import { PostType } from "../types/types"
import { errorOn } from "./app-reducer"

//	Actions CONST	---------------------------------------------------------------------------

const SET_IMAGE = 'SET_IMAGE'


//	Initial State & i'ts type	---------------------------------------------------------------

const BaseUrl = 'http://localhost:5000/'

//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state: PostType, action: AppActionsTypes): PostType => {
	switch (action.type) {
		case SET_IMAGE:
			return {
				...state,
				_id: action._id,
				imageSrc: BaseUrl + action.imageSrc.replace('\\', '/')
			}
		default:
			return state;
	}
}


//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = SetImageType


type SetImageType = {
	type: typeof SET_IMAGE
	_id: string
	imageSrc: string
}
export const setImage = (imageSrc: string, _id: string): SetImageType => ({ type: SET_IMAGE, imageSrc, _id })



//	Thunks	------------------------------------------------------------------------------------


export function uploadImage(iamge: any, postId: string) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			const formData = new FormData()
			formData.append('image', iamge)
			let data = await imageAPI.patchImage(postId, formData)
			dispatch(setImage(data.imageSrc, data._id))
		} catch (err) {
			errorOn(`Не удалось загрузить изображе! ${err}`);
		}
	}
}

export const imageActions = { uploadImage }