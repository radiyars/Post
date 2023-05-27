import { InitialStateType } from '../redux/app-reducer';
import { instance } from './api'


export const imageAPI = {

	getImage() {
		return instance.get<Array<InitialStateType>>(`post`)
			.then(response => response.data);
	},

	// postList(name: string, color: ColorType) {
	// 	return instance.post<ListType>(`/lists`, { name, color })
	// 		.then(response => response.data);

	// },

	// deleteList(id: string) {
	// 	return instance.delete<ListType>(`/lists/${id}`)
	// },

	// renameList(id: string, name: string) {
	// 	return instance.patch<ListType>(`/lists/${id}`, { name })
	// },

	// patchListsTasks(listId: string, tasks: Array<TaskType>) {
	// 	return instance.patch<ListType>(`/lists/${listId}`, { tasks })
	// }

}

