import { errorOn, loaderOff, loaderOn } from "./app-reducer"


export const COMMENT_CREATE = 'POST/COMMENT_CREATE'
const COMMENT_UPDATE = 'POST/COMMENT_UPDATE'
const COMMENT_DELETE = 'POST/COMMENT_DELETE'
const COMMENTS_LOAD = 'POST/COMMENT_LOAD'




const initialState = {
	comments: []
}

export const commentsReducer = (state = initialState, action) => {
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
				newComments[itemIndex].text = action.data.text
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
					text: i.name,
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

export const commentCreate = (text, id) => ({ type: COMMENT_CREATE, data: { text, id } })
export const commentUpdate = (text, id) => ({ type: COMMENT_UPDATE, data: { text, id } })
export const commentDelete = (id) => ({ type: COMMENT_DELETE, id })


export function commentsLoad() {
	return async dispatch => {
		try {
			dispatch(loaderOn());
			const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
			const jsonData = await response.json();

			setTimeout(() => {
				dispatch({
					type: COMMENTS_LOAD,
					data: jsonData
				});
				dispatch(loaderOff());
			}, 1000);
		} catch (err) {
			dispatch(errorOn('Ошибка API'));
			dispatch(loaderOff());
		}
	}
}