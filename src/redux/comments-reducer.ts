import { Dispatch } from 'react'
import { commentsApi } from '../api/comments-api'
import { CommentsType } from '../types/types'
import { AppActionsTypes, errorOn } from './app-reducer'

//	Actions CONST	---------------------------------------------------------------------------

export const SET_COMMENTS = 'POST/SET_COMMENTS'

//	Initial State & i'ts type	---------------------------------------------------------------


const initialState: CommentsType = {
	comments: null
}

type InitialStateType = typeof initialState

//	Reducer	-------------------------------------------------------------------------------------
export const commentsReducer = (state = initialState, action: CommentActionsTypes): InitialStateType => {
	switch (action.type) {

		case SET_COMMENTS:
			return {
				...state,
				comments: [...action.comments]
			}

		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

// export type CommentActionsTypes = SetCommentsType | CommentUpdateType | CommentDeleteType | CommentsLoadType
export type CommentActionsTypes = SetCommentsType


type SetCommentsType = {
	type: typeof SET_COMMENTS
	comments: Array<string>
}
export const setComments = (comments: Array<string>): SetCommentsType => ({ type: SET_COMMENTS, comments: comments })


//	Thunks	------------------------------------------------------------------------------------


export function getCommentsApi() {
	return async (dispatch: Dispatch<CommentActionsTypes | AppActionsTypes>) => {
		try {
			let data = await commentsApi.getComments();
			dispatch(setComments(data));
		} catch (err) {
			dispatch(errorOn(`Не удалось получить комментарии! ${err}`))
		}
	}
}


export function patchCommentsApi(id: string, comments: Array<string>) {
	return async (dispatch: Dispatch<CommentActionsTypes | AppActionsTypes>) => {
		try {
			await commentsApi.patchComments(id, comments)
			dispatch(setComments(comments))
		} catch (err) {
			dispatch(errorOn(`Не удалось обновить кооментарии! ${err}`))
		}
	}
}


export const commentsActions = { getCommentsApi, patchCommentsApi }
