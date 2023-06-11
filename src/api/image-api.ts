import { PostType } from '../types/types';
import { instance } from './api';


export const imageAPI = {

	// getFile() {
	// 	return instance.get<Array<InitialStateType>>(``)
	// 		.then(response => response.data);
	// },


	patchImage(postId: string, formData: any) {
		return instance.patch<PostType>(`/image/${postId}`, formData)
			.then(response => response.data);
	},

}

