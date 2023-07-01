import { Dispatch } from "react"
import { likesApi } from "../api/likes-api"
import { AppActionsTypes, errorOn } from "./app-reducer"
import axios from "axios"


//	Actions CONST	---------------------------------------------------------------------------


const SET_LIKES = 'SET_LIKES'

//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	likes: 0
}

type InitialStateType = typeof initialState

//	Reducer	-------------------------------------------------------------------------------------
export const likesReducer = (state = initialState, action: LikesActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_LIKES:
			return {
				...state,
				likes: action.likes
			}

		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type LikesActionsTypes = SetLikesType

type SetLikesType = {
	type: typeof SET_LIKES
	likes: number

}
export const setLikes = (likes: number): SetLikesType => ({ type: SET_LIKES, likes })


//	Thunks	------------------------------------------------------------------------------------

export function getLikesApi() {
	return async (dispatch: Dispatch<LikesActionsTypes | AppActionsTypes>) => {
		try {
			let data = await likesApi.getLikes()
			dispatch(setLikes(data))
		} catch (err) {
			dispatch(errorOn(`Не удалось загрузить лайки! ${err}`))
		}
	}
}


export function patchLikesApi(id: string, likes: number) {
	return async (dispatch: Dispatch<LikesActionsTypes | AppActionsTypes>) => {
		try {
			await likesApi.patchLikes(id, likes)
			dispatch(setLikes(likes))
		} catch (err) {
			dispatch(errorOn(`Не удалось обновить лайки! ${err}`));
		}
	}
}

export const likesActions = {
	getLikesApi,
	patchLikesApi
}