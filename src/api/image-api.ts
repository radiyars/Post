import { PostType } from '../types/types'
import { instance } from './api'


export const imageApi = {

	getImage() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data[0]);
	},

	patchImage(postId: string, formData: any) {
		return instance.patch<PostType>(`/image/${postId}`, formData)
			.then(response => response.data);
	},

}

