import { AppReducerActionsTypes, errorOn, loaderOff, loaderOn } from "./app-reducer"
import { Dispatch } from 'react';

//	Actions CONST	---------------------------------------------------------------------------

export const COMMENT_CREATE = 'POST/COMMENT_CREATE'
const COMMENT_UPDATE = 'POST/COMMENT_UPDATE'
const COMMENT_DELETE = 'POST/COMMENT_DELETE'
const COMMENTS_LOAD = 'POST/COMMENT_LOAD'


//	Initial State & i'ts type	---------------------------------------------------------------

export type InitialStateType = {
	comments: Array<CommentType>
}

type CommentType = {
	name: string
	id: string
}

const initialState: InitialStateType = {
	comments: []
}

//	Reducer	-------------------------------------------------------------------------------------
export const commentsReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
	switch (action.type) {
		case COMMENT_CREATE:
			return {
				...state,
				comments: [...state.comments, action.data]
			}
		case COMMENT_UPDATE:
			const newComments = state.comments
			const itemIndex = newComments.findIndex(item => item.id === action.data.id)
			if (itemIndex >= 0) {
				newComments[itemIndex].name = action.data.name
			} else {
				return state
			}
			return {
				...state,
				comments: newComments
			}
		case COMMENT_DELETE:
			return (() => {
				const newComments = state.comments.filter(item => item.id !== action.id)
				return {
					...state,
					comments: newComments
				}
			})();

		case COMMENTS_LOAD: {
			const newComments = action.data.map(i => {

				return {
					name: i.name,
					id: i.id
				}
			})
			return {
				...state,
				comments: newComments
			}
		}

		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = CommentCreateType | CommentUpdateType | CommentDeleteType | CommentsLoadType


type CommentCreateType = {
	type: typeof COMMENT_CREATE
	data: CommentType
}
export const commentCreate = (name: string, id: string): CommentCreateType => ({ type: COMMENT_CREATE, data: { name, id } })


type CommentUpdateType = {
	type: typeof COMMENT_UPDATE
	data: CommentType
}
export const commentUpdate = (name: string, id: string): CommentUpdateType => ({ type: COMMENT_UPDATE, data: { name, id } })


type CommentDeleteType = {
	type: typeof COMMENT_DELETE
	id: string
}
export const commentDelete = (id: string): CommentDeleteType => ({ type: COMMENT_DELETE, id })


type CommentsLoadType = {
	type: typeof COMMENTS_LOAD
	data: Array<CommentType>
}
export const commentsLoad = (data: Array<CommentType>): CommentsLoadType => ({ type: COMMENTS_LOAD, data })



//	Thunks	------------------------------------------------------------------------------------

export function load() {
	return async (dispatch: Dispatch<AppActionsTypes | AppReducerActionsTypes>) => {
		try {
			dispatch(loaderOn());
			const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
			const jsonData = await response.json();
			setTimeout(() => {
				dispatch(commentsLoad(jsonData));
				dispatch(loaderOff());
			}, 1000);
		} catch (err) {
			dispatch(errorOn('Ошибка API'));
			dispatch(loaderOff());
		}
	}
}
export const commentsActions = { commentCreate, commentUpdate, commentDelete, load }
