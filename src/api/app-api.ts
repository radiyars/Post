import { PostType } from '../types/types'
import { instance } from './api'


export const appApi = {

	getPost() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data);
	},

}

