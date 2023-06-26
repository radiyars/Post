import { PostType } from '../types/types'
import { instance } from './api'


export const nameAPI = {

	getName() {
		return instance.get<Array<PostType>>(``)
			.then(response => response.data[0].name);
	},

	patchName(id: string, name: string) {
		return instance.patch<PostType>(`/name/${id}`, { name })
			.then(response => response.data);
	}

}

