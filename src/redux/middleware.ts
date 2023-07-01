import { SET_COMMENTS } from './comments-reducer';
import { errorOn } from './app-reducer';
import { Middleware } from 'redux';

const badWords = ['козел', 'дурак']

export const spamFilter: Middleware = ({ dispatch }) => {
	return function (next) {
		return function (action) {
			if (action.type === SET_COMMENTS) {
				const hasBadWords = badWords.some(i => action.comments.includes(i))
				if (hasBadWords) {
					return dispatch(errorOn('Уважайте людей!'))
				}
			}
			return next(action)
		}
	}
}
