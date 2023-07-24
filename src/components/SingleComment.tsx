import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

type PropsType = {
	comment: string
	index: number
}

export const SingleComment: React.FC<PropsType> = (props) => {

	const comments: Array<string> | null = useTypedSelector(state => state.comments.comments)
	const formRef = useRef<HTMLFormElement>(null);

	let newComments: Array<string> | null
	if (comments) {
		newComments = [...comments]
	}
	const id = useTypedSelector(state => state.app._id)


	const [commentText, setCommentText] = useState('')
	const { patchCommentsApi } = useActions()


	let isComment
	if (comments) {
		isComment = comments[props.index]
	}

	useEffect(() => {
		if (comments) {
			setCommentText(comments[props.index])
		}
	}, [isComment])

	// Сетаем текст нового комментария
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText(e.target.value)
	}


	// Обновляем комментарий
	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newComments) {
			newComments[props.index] = commentText
			patchCommentsApi(id, newComments)
		}
	}

	// Удаляем комментарий
	const handleDelete = () => {
		if (newComments) {
			newComments.splice(props.index, 1)
			patchCommentsApi(id, newComments)
		}
	}

	return (
		<form ref={formRef} onSubmit={handleUpdate} onBlur={handleUpdate} className="comment">
			<input type='text' value={commentText} onChange={handleInput}></input>
			<input type='submit' hidden />
			<img className='actionsvg' src='./close.svg' alt='подтвердить' onClick={handleDelete} />
		</form>
	)
}

