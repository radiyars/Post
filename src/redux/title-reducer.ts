
//	Actions CONST	---------------------------------------------------------------------------

const INPUT_TEXT = 'POST/INPUT_TEXT'

//	Initial State & i'ts type	---------------------------------------------------------------

const initialState = {
	text: ''
}
type InitialStateType = typeof initialState


//	Reducer	-------------------------------------------------------------------------------------
export const titleReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case INPUT_TEXT:
			return {
				...state,
				text: action.text
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type ActionsTypes = InputTextType

type InputTextType = {
	type: typeof INPUT_TEXT
	text: string
}
export const inputText = (text: string): InputTextType => ({ type: INPUT_TEXT, text })