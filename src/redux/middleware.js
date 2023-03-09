import { COMMENT_CREATE } from './comment-reducer';
import { errorOn } from './app-reducer';

const badWords = ['козел', 'дурак']

export function spamFilter({ dispatch }) {
	return function (next) {
		return function (action) {
			if (action.type === COMMENT_CREATE) {
				const hasBadWords = badWords.some(i => action.data.text.includes(i))
				if (hasBadWords) {
					return dispatch(errorOn('Уважайте людей!'))
				}
			}
			return next(action)
		}
	}
}

