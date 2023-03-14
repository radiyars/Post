import { COMMENT_CREATE } from './comment-reducer';
import { errorOn } from './app-reducer';
import { Middleware } from 'redux';

const badWords = ['козел', 'дурак']

export const spamFilter: Middleware = ({ dispatch }) => {
	return function (next) {
		return function (action) {
			if (action.type === COMMENT_CREATE) {
				const hasBadWords = badWords.some(i => action.data.name.includes(i))
				if (hasBadWords) {
					return dispatch(errorOn('Уважайте людей!'))
				}
			}
			return next(action)
		}
	}
}
