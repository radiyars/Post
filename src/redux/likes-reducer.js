
const INCREMENT_LIKES = 'POST/INCREMENT_LIKES'
const DECREMENT_LIKES = 'POST/DECREMENT_LIKES'

const initialState = {
	likes: 0
}
export const likesReducer = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT_LIKES:
			return {
				...state,
				likes: state.likes + 1
			}
		case DECREMENT_LIKES:
			return {
				...state,
				likes: state.likes - 1
			}
		default:
			return state;
	}
}

export const incrementLikes = () => ({ type: INCREMENT_LIKES })
export const decrementLikes = () => ({ type: DECREMENT_LIKES })