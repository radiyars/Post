import { PostType } from '../types/types'
import { instance } from './api'


export const likesApi = {

	getLikes() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data[0].likes);
	},

	patchLikes(id: string, likes: number) {
		return instance.patch<PostType>(`/likes/${id}`, { likes })
			.then(response => response.data);
	}

}

