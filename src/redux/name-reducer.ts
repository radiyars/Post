import { nameAPI } from "../api/name-api"
import { Dispatch } from "react"
import { errorOn } from "./app-reducer"


//	Actions CONST	---------------------------------------------------------------------------
const SET_NAME = 'SET_NAME'

//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	name: ''
}

type InitialStateType = typeof initialState


//	Reducer	-------------------------------------------------------------------------------------
export const nameReducer = (state = initialState, action: NameActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_NAME:
			return {
				...state,
				name: action.name
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type NameActionsTypes = SetNameType

type SetNameType = {
	type: typeof SET_NAME
	name: string
}
export const setName = (text: string): SetNameType => ({ type: SET_NAME, name: text })


//	Thunks	------------------------------------------------------------------------------------

export function getNameApi() {
	return async (dispatch: Dispatch<NameActionsTypes>) => {
		try {
			let data = await nameAPI.getName()
			dispatch(setName(data))
		} catch (err) {
			errorOn(`Не удалось загрузить название изображения! ${err}`);
		}
	}
}

export function patchNameApi(id: string, name: string) {
	return async (dispatch: Dispatch<NameActionsTypes>) => {
		try {
			await nameAPI.patchName(id, name)
			dispatch(setName(name))
		} catch (err) {
			errorOn(`Не удалось установить название изображения! ${err}`);
		}
	}
}

export const nameActions = {
	getNameApi,
	patchNameApi
}