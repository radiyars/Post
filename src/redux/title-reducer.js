

const INPUT_TEXT = 'POST/INPUT_TEXT'

const initialState = {
	text: ''
}
export const titleReducer = (state = initialState, action) => {
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

export const inputText = (text) => ({ type: INPUT_TEXT, text })