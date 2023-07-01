
export type appType = {
	isLoading: boolean
	error: string | null
	_id: string

}


export type PostType = {
	_id: string
	isLoading: boolean
	error: string | null
	imageSrc: string
	name: string
	likes: number
	comments: Array<string>
}

export type CommentsType = {
	comments: Array<string> | null
}