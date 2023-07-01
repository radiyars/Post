import axios from "axios"

export const instance = axios.create({
	baseURL: 'http://localhost:5000/api/post',
});


export type ResponseType<D = {}> = {
	data: D
}

