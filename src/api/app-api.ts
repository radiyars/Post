import { PostType } from '../types/types';
import { instance } from './api';


export const appAPI = {

	getPost() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data);
	},

}

