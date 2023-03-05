

const COMMENT_CREATE = 'POST/COMMENT_CREATE'
const COMMENT_UPDATE = 'POST/COMMENT_UPDATE'

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
			// const newComments = [...state.comments];
			// const itemIndex = newComments.findIndex(i => i.id === action.data.id)
			// if (itemIndex > 0) {
			// 	newComments[itemIndex].text = action.data.text
			// } else {
			// 	return state
			// }


			const { data } = action;
			const { comments } = state
			const itemIndex = comments.findIndex(res => res.id === data.id)
			const newComments = [
				...comments.slice(0, itemIndex),
				data,
				...comments.slice(itemIndex + 1)
			]

			return {
				...state,
				comments: newComments
			}
		default:
			return state;
	}
}

export const commentCreate = (text, id) => ({ type: COMMENT_CREATE, data: { text, id } })
export const commentUpdate = (text, id) => ({ type: COMMENT_UPDATE, data: { text, id } })