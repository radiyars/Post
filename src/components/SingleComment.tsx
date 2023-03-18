import { useEffect, useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { commentDelete, commentUpdate } from '../redux/comment-reducer';

type PropsType = {
	data: {
		name: string
		id: string
	}
}

export const SingleComment: React.FC<PropsType> = ({ data }) => {

	const { name, id } = data
	const [commentText, setCommentText] = useState('')
	const dispatch = useDispatch();

	useEffect(() => {
		if (name) {
			setCommentText(name)
		}
	}, [name])


	// Сетаем текст нового комментария
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText(e.target.value)
	}


	// Обновляем комментарий
	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(commentUpdate(commentText, id))
	}

	// Удаляем комментарий
	const handleDelete = (e: MouseEvent<HTMLInputElement>) => {
		e.preventDefault()
		dispatch(commentDelete(id))
	}


	return (
		<form onSubmit={handleUpdate} className="comment-item">
			<div onClick={handleDelete} className="comment-item-delete">&times;</div>
			<div>
				<input type='text' value={commentText} onChange={handleInput} />
				<input type='submit' hidden />
			</div>
		</form>
	)
}

