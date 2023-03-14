
//	Actions CONST	---------------------------------------------------------------------------

const INCREMENT_LIKES = 'POST/INCREMENT_LIKES'
const DECREMENT_LIKES = 'POST/DECREMENT_LIKES'

//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	likes: 0
}

type InitialStateType = typeof initialState

//	Reducer	-------------------------------------------------------------------------------------
export const likesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case INCREMENT_LIKES:
			return {
				...state,
				likes: state.likes + 1
			}
		case DECREMENT_LIKES:

			return {
				...state,
				likes: state.likes > 0 ? state.likes - 1 : state.likes
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type ActionsTypes = IncrementLikesType | DecrementLikesType

type IncrementLikesType = {
	type: typeof INCREMENT_LIKES
}
export const incrementLikes = (): IncrementLikesType => ({ type: INCREMENT_LIKES })

type DecrementLikesType = {
	type: typeof DECREMENT_LIKES
}
export const decrementLikes = (): DecrementLikesType => ({ type: DECREMENT_LIKES })