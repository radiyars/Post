import { PostType } from '../types/types'
import { instance } from './api'


export const commentsApi = {

	getComments() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data[0].comments);
	},

	patchComments(id: string, comments: Array<string>) {
		return instance.patch<PostType>(`/comments/${id}`, { comments })
			.then(response => response.data);
	}

}

